const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// mongoose.connect(db);

const connectDB = async () => {
	try {
		await mongoose.connect(db);

		// console.log("Database connected....");
	} catch (error) {
		console.error(error.message);

		// exit when failure
		process.exit(1);
	}
};

module.exports = connectDB;
