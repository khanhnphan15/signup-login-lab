const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

// require these for file uploads!
const multer = require('multer');
const upload = multer()
/*---------- Public Routes ----------*/

// Http request
// POST /api/users/signup

// we get 'photo' in upload single from the key name
// on the formdata that contains the file
// in this case, this line of code in signupPage
//	formData.append('photo', selectedFile);
router.post("/signup", upload.single('photo'), usersCtrl.signup);
router.post("/login", usersCtrl.login);

/*---------- Protected Routes ----------*/

module.exports = router;



/*---------- Protected Routes ----------*/



