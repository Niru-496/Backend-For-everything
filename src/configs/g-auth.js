require("dotenv").config();
const passport = require("passport");
const { user } = require("../models/user.module");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:8000/auth/google/callback",
			passReqToCallback: true,
		},
		async function (request, accessToken, refreshToken, profile, done) {
			let data = await user
				.findOne({ email: profile?.email })
				.lean()
				.exec();

			if (!data) {
				data = await user.create({
					email: profile?.email,
					password: Date.now(),
				});
			}

			return done(null, data);
		}
	)
);

module.exports = { passport };
