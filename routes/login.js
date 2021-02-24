var express = require('express');
var router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var keys = require('../private/key.js');

// passport.use(new GoogleStrategy());

module.exports = router;