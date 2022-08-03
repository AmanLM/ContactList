const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const passport = require('passport');

const ContactController = require('../controllers/contacts_controller');
router.post('/create-contact',ContactController.create);
router.get('/delete-contact', passport.checkAuthentication,ContactController.destroy);

module.exports = router;