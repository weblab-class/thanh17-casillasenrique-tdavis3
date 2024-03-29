/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

const Bookmark = require("./models/bookmark");
const Group = require("./models/group");
const Settings = require("./models/settings");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

const defaultBackground = require("./defaultBackground.js");

//initialize socket
const socketManager = require("./server-socket");
const {convertFileToBinary} = require("./utilities");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/bookmark", (req, res) => {
  Bookmark.find({ _id: req.query._id }).then((result) => {
    //console.log("boomkmark result: ", result);
    res.send(result);
  });
});

router.get("/bookmarks", auth.ensureLoggedIn, (req, res) => {
  // console.log("user: ", req.user);
  let updatedResult = undefined;
  Bookmark.find({ userId: req.user._id })
    .lean()
    .then((result) => {
      updatedResult = decodeIcons(result);
      //console.log("result here: ", updatedResult);
      res.send(updatedResult);
    });
});

const decodeIcons = (bookmarks) => {
  return bookmarks.map((bookmark) => {
    const decodedIcon = bookmark.customIcon ? bookmark.customIcon.toString() : null;
    bookmark.customIcon = decodedIcon;
    return bookmark;
  });
};

router.get("/groups", auth.ensureLoggedIn, (req, res) => {
  Group.find({ userId: req.user._id })
    .lean()
    .then((result) => {
      updatedResult = result.map((group) => {
        return { ...group, bookmarks: decodeIcons(group.bookmarks) };
      });
      res.send(updatedResult);
    });
});

router.get("/settings", auth.ensureLoggedIn, (req, res) => {
  Settings.findOne({ userId: req.user._id }).then((result) => {
    //console.log("settings result: ", result);
    if (!result) {
      const newSettings = Settings({
        userId: req.user._id,
        backgroundImage: defaultBackground.default,
        isDarkMode: true,
        firstLogin: true,
      });

      newSettings
        .save()
        .then((settings) => {
          console.log("successfully created settings in database");
          res.send(settings);
        })
        .catch((err) => console.log("An error occurred while saving"));
    } else {
      res.send(result);
    }
  });
});

router.post("/edit/settings", (req, res) => {
  const updatedSettings = {
    userId: req.user._id,
    isDarkMode: req.body.isDarkMode,
    backgroundImage: req.body.backgroundImage,
    firstLogin: false,
  };

  Settings.updateOne({ userId: req.user._id }, updatedSettings)
    .then((result) => {
      console.log(
        "Updated settings for " +
          req.user._id +
          " " +
          req.user.name +
          " to \n isDarkMode: " +
          req.body.isDarkMode +
          " " +
          result.isDarkMode
      );
      res.send(result);
    })
    .catch((err) => console.log("An error occurred while saving"));
});

router.post("/edit/add_group", (req, res) => {
  console.log(req.body);
  const newGroup = Group({
    userId: req.user._id,
    name: req.body.name,
    index: req.body.index,
    bookmarks: [],
    pageIndex: req.body.pageIndex,
  });

  newGroup
    .save()
    .then((group) => {
      console.log("successfully added group to database");
      res.send(group);
    })
    .catch((err) => console.log("An error occurred while saving"));
});

router.post("/edit/edit_group", (req, res) => {
  // console.log("REQUEST", req);
  console.log("in edit group: " + req.body);
  const updatedGroup = {
    userId: req.user._id,
    name: req.body.name,
    bookmarks: req.body.bookmarks,
    index: req.body.index,
    pageIndex: req.body.pageIndex,
  };

  Group.updateOne({ _id: req.body._id }, updatedGroup)
    .then((result) => {
      console.log("Successfully updated group: " + updatedGroup);
      res.send(result);
    })
    .catch((err) => console.log("An error occurred while editing"));
});

router.post("/edit/add_multiple_groups", (req, res) => {
  for (let group of req.body.groups) {
    group.userId = req.user._id;
  }
  Group.insertMany(req.body.groups).then((result) => {
    console.log("Added multiple groups.");
    res.json(result);
  });
});

router.delete("/edit/delete_group", (req, res) => {
  Group.deleteOne({ _id: req.body._id }).catch((err) =>
    console.log("An error occurred while deleting")
  );
});

router.post("/edit/add_bookmark", (req, res) => {
  const newBookmark = Bookmark({
    userId: req.user._id,
    name: req.body.name,
    url: req.body.url,
    icon: req.body.icon,
    customIcon: Buffer.from(req.body.customIcon, "utf-8"),
    index: req.body.index,
    pageIndex: req.body.pageIndex,
  });
  newBookmark
    .save()
    .then((bookmark) => res.send(bookmark))
    .catch((err) => console.log("An error occurred while saving"));
});

router.post("/edit/edit_bookmark", (req, res) => {
  // const updatedBookmark = Bookmark({
  //     // userId: req.user._id,
  //     name: req.body.name,
  //     url: req.body.url,
  //     icon: req.body.icon,
  //     group: req.body.group,
  // });
  Bookmark.updateOne(
    { _id: req.body._id },
    {
      $set: {
        index: req.body.index,
        pageIndex: req.body.pageIndex,
      },
    }
  ).catch((err) => console.log("An error occurred while editing"));
});

router.delete("/edit/delete_bookmark", (req, res) => {
  Bookmark.deleteOne({ _id: req.body._id })
    .then((result) => {
      console.log("successfully deleted bookmark");
      res.send(result);
    })
    .catch((err) => console.log("An error occurred while deleting"));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
