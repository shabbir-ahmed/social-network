const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route   POST /api/users
// @desc    User Registration
// @access  public
router.post(
	"/",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please use a validate email").isEmail(),
		check("password", "Password is required").isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// console.log(req.body);
		try {
			// If a user exists
			const { name, email, password } = req.body;
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({
					errors: [{ msg: "User already exists with this email" }],
				});
			}
			// Get users gravatar
			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});

			user = new User({
				name,
				email,
				password,
				avatar,
			});
			// Encrypt password with bcryptjs
			const salt = await bcrypt.genSaltSync(10);
			user.password = await bcrypt.hash(password, salt);
			// Save the record into database
			await user.save();
			// Return jsonwebtoken

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("secretToken"),
				{ expiresIn: 36000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Internal server error");
		}
	}
);

module.exports = router;
