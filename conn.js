const mongoose = require('mongoose');
// const retry = require('retry')
require('dotenv').config()

const connectDB = async () => {
    const connectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000, // Set to a higher value if needed
        socketTimeoutMS: 30000,  // Set to a higher value if needed
    };

    try {
        await mongoose.connect(process.env.MONGO_URL, connectOptions);

        console.log(`Mongoose Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);

        // Implement retry logic if needed
        // Example using the retry library:
        // retry.connect(connectOptions);

        process.exit(1);
    }
};

module.exports = connectDB;
