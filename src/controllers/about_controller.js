const CustomException = require(`../utils/CustomException`);

//Controller to handle the about get request
exports.getDevelopers = (req, res) => {
    try {
        //Our details
        const developers = [
            { firstname: process.env.DEVELOPER1_FIRST_NAME, lastname: process.env.DEVELOPER1_LAST_NAME, id: process.env.DEVELOPER1_ID, email: process.env.DEVELOPER1_EMAIL },
            { firstname: process.env.DEVELOPER2_FIRST_NAME, lastname: process.env.DEVELOPER2_LAST_NAME, id: process.env.DEVELOPER2_ID, email: process.env.DEVELOPER2_EMAIL }
        ];

        //Resolve with our details
        res.status(200).json(developers);

    } catch (err) {
        //Handle possible exceptions
        if (err instanceof CustomException) {
            res.status(err.status).json({ error: err.message });
        } else {
            console.error(`Unhandled error:`, err);
            res.status(500).json({ error: `Internal Server Error` });
        }
    }
};