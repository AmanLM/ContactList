const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/profile',passport.checkAuthentication, userController.Profile);
router.get('/signin',userController.signin);
router.get('/signup',userController.signup);

router.post('/create',userController.create);
router.post('/createsession', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
), userController.createsession);
router.get('/signout',userController.destroysession);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signin'}), userController.createsession);

module.exports = router;