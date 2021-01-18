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

router.get("/title/bookmark", (req, res) => {
    Bookmark.find({_id: req.query._id}).then((result) => {
        res.send(result);
    });
});

router.get("/title/bookmarks", (req, res) => {
    Bookmark.find({userId: req.user._id}).then((result) => {
        res.send(result);
    });
});

router.post("/title/edit/add_group", (req, res) => {
    console.log(req.body);
    const newGroup = Group({
        userId: req.user._id, 
        name: req.body.name,
        customRow: req.body.customRow,
        customCol: req.body.customCol,
        index: req.body.index,
        bookmarks: [],
    });

    console.log("wtf");
    console.log( {newGroup});
    newGroup.save()
        .then((group) => { 
            console.log(group.name)
            res.send(group);  
        })
        .catch((err) => console.log("An error occurred while saving"))
});

router.post("/title/edit/edit_group", (req, res) => {
    const updatedGroup = Group({
        // userId: req.user._id,  // TODO: Make google Id
        name: req.body.name,
        bookmarks: [String],
        customRow: req.body.customRow,
        customCol: req.body.customCol,
        index: req.body.index
    });
    Group.updateOne({_id: req.body._id}, updatedGroup)
        .catch((err) => console.log("An error occurred while editing"));
});

router.delete("/title/edit/delete_group", (req, res) => {
    Group.deleteOne({_id: req.body._id})
        .catch((err) => console.log("An error occurred while deleting"));
});

router.post("/title/edit/add_bookmark", (req, res) => {
    const newBookmark = Bookmark({
        userId: req.user._id,
        name: req.body.name,
        url: req.body.url,
        image: req.body.image,
        group: req.body.group,
        customRow: req.body.customRow,
        customCol: req.body.customCol,
        index: req.body.index
    });

    newBookmark.save()
        .then((bookmark) => res.send(bookmark))
        .catch((err) => console.log("An error occurred while saving"))
});

router.post("/title/edit/edit_bookmark", (req, res) => {
    const updatedBookmark = Bookmark({
        // userId: req.user._id,
        name: req.body.name,
        url: req.body.url,
        image: req.body.image,
        group: req.body.group
    });
    Bookmark.updateOne({_id: req.body._id}, updatedBookmark)
        .catch((err) => console.log("An error occurred while editing"));
});

router.delete("/title/edit/delete_bookmark", (req, res) => {
    Bookmark.deleteOne({_id: req.body._id})
        .catch((err) => console.log("An error occurred while deleting"));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({msg: "API route not found"});
});

module.exports = router;
