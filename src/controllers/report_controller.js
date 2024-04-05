const Cost = require(`../models/cost`);
const User = require(`../models/user`);
const CustomException = require(`../utils/CustomException`);

//Controller to handle the report get request
exports.getReport = async (req, res) => {
    try{
        //Recieved params
        const { user_id, year, month } = req.query;

        //Validate no missing params
        if (!user_id || !year || !month) {
            throw new CustomException(`Missing required parameters`, 400);
        }

        //Function to check if the value is an integer in string format
        const isValidIntegerString = (value) => {
            //Regular expression for matching integer numbers
            const regex = /^-?\d+$/;
            return regex.test(value);
        };

        //Check if user_id, year, and month are valid integer strings
        if (!isValidIntegerString(user_id) || !isValidIntegerString(year) || !isValidIntegerString(month)) {
            throw new CustomException(`Invalid parameter types`, 400);
        }

        //Parse to integers for further operations
        const parsed_year = Number.parseInt(year, 10);
        const parsed_month = Number.parseInt(month, 10);

        //Validate year and month range
        if (parsed_month < 1 || parsed_month > 12) {
            throw new CustomException(`Input is out of range: month must be between 1 and 12`, 400);
        }
        if (parsed_year < 0 || parsed_year > 2024) {
            throw new CustomException(`Input is out of range: year must be between 0 and 2024`, 400);
        }

        //Check if the user exists
        const user = await User.findOne({ id: user_id });
        if (!user) {
            throw new CustomException(`User not found`, 404);
        }

        //Query the db for the report
        const report = await Cost.find({ user_id, year, month }).select(`-_id day description sum category`);

        //Create the report structure
        const allCategories = [`food`, `health`, `housing`, `sport`, `education`, `transportation`, `other`];
        const groupedReport = allCategories.reduce((acc, category) => {
            acc[category] = [];
            return acc;
        }, {});

        //Put the relevant cost items in the report
        report.forEach(item => {
            groupedReport[item.category].push({
                day: item.day,
                description: item.description,
                sum: item.sum
            });
        });

        //Resolve with the report
        res.status(200).json(groupedReport);

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