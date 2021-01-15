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

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

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
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/title/link", (req, res) => {
  Bookmark.find({_id: req.query._id}).then((result) => {
    res.send(result);
  });
});

router.get("/title/links", (req, res) => {
  Bookmark.find({}).then((result) => {
    res.send(result);
  });
});

router.post("/title/edit/add_bookmark", (req, res) => {
  const newBookmark = Bookmark({
    userId: req.body.userId,  // TODO: Make google Id
    name: req.body.name,
    url: req.body.url,
    image: req.body.image,
    group: req.body.group
  });

  newBookmark.save()
    .then((bookmark) => res.send(bookmark))
    .catch((err) => console.log("An error occured while saving"))
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
