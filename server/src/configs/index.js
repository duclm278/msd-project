const dotenv = require("dotenv");
dotenv.config();

const config = {
    server: {
        port: process.env.PORT,
    },
    db: {
        host_server: process.env.DB_HOST_SERVER,
        database: process.env.DATABASE,
        db_port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    email: {
        email_host: process.env.EMAIL_HOST,
        email_host_pass: process.env.EMAIL_HOST_PASS,
    },
    cloudinary: {
        name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        project: process.env.CLOUD_PROJECT,
    },
};

module.exports = config;
