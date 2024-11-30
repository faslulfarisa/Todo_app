const express = require("express");
const router = express.Router();
// import controller
const {
    createAccount,
    createLogin,
    getUser,
    createNote,
    updateNote,
    getAllNotes,
    deleteNote,
    updateNotePinned,
    searchNote
}=require("../controllers/notes");
// token
const {authenticationToken} = require("../utilities");

// create - account
router.route("/create-account").post(createAccount);
router.route("/login").post(createLogin);
// Get User
router.route("/get-user").get(authenticationToken,getUser);
// Add Note
router.route("/add-note").post(authenticationToken,createNote);
// Edit Note
router.route("/edit-note/:noteId").put(authenticationToken,updateNote);
// Get All Notes
router.route("/get-all-notes").get(authenticationToken,getAllNotes);
// Delete Note
router.route("/delete-note/:noteId").delete(authenticationToken,deleteNote)
// Update isPinned Value
router.route("/update-note-pinned/:noteId").put(authenticationToken,updateNotePinned)
// Search notes
router.route("/search-notes/").get(authenticationToken,searchNote)

module.exports=router;