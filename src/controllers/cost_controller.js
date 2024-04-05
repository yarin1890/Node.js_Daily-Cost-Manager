const Cost = require(`../models/cost`);
const User = require(`../models/user`);
const CustomException = require(`../utils/CustomException`);

//Controller to handle the addcost post request
exports.addCost = async (req, res) => {
  try {
      //Recieved params
      const { user_id, description, category, sum, year, month, day } = req.body;

      //Validate no missing params
      if (!user_id || !description || !category || !sum || (!year && !month && !day)) {
          throw new CustomException(`Missing required parameters`, 400);
      }

      //Function to check if the value is an integer in string format
      const isValidIntegerString = (value) => {
          //Regular expression for matching integer numbers
          const regex = /^-?\d+$/;
          return regex.test(value);
      };

      //Check if user_id, year, and month are valid integer strings
      if (!isValidIntegerString(user_id) || !isValidIntegerString(year) || !isValidIntegerString(month) ||
          !isValidIntegerString(day) || !isValidIntegerString(sum)) {
          throw new CustomException(`Invalid parameter types`, 400);
      }

      //Parse to integers for further operations
      const parsed_year = Number.parseInt(year, 10);
      const parsed_month = Number.parseInt(month, 10);
      const parsed_day = Number.parseInt(day, 10);
      const parsed_sum = Number.parseInt(sum, 10);

      //Validate year and month range
      if (parsed_month < 1 || parsed_month > 12) {
          throw new CustomException(`Input is out of range: month must be between 1 and 12`, 400);
      }
      if (parsed_year < 0 || parsed_year > 2024) {
          throw new CustomException(`Input is out of range: year must be between 0 and 2024`, 400);
      }
      if (parsed_day < 1 || parsed_day > 31) {
          throw new CustomException(`Input is out of range: day must be between 1 and 31`, 400);
      }
      if (sum < 0) {
          throw new CustomException(`Input is out of range: cost must not be negative`, 400);
      }

      //Validate params type and 'legal' values for category and description (assumed not empty)
      if (typeof description !== `string` || typeof category !== `string` || description.trim() === `` ||
          ![`food`, `health`, `housing`, `sport`, `education`, `transportation`, `other`].includes(category)){
          throw new CustomException(`Invalid parameter types or values`, 400);
      }

      //Check if the user exists
      const user = await User.findOne({ id: user_id });
      if (!user) {
          throw new CustomException(`User not found`, 404);
      }

      //Set values for year, month, and day if not provided
      const currentDate = new Date();
      const currentYear = year || currentDate.getFullYear();
      const currentMonth = month || currentDate.getMonth() + 1; // Month is 0-indexed
      const currentDay = day || currentDate.getDate();

      //Create a cost item
      const newCost = new Cost({
          user_id,
          description,
          category,
          sum,
          year: currentYear,
          month: currentMonth,
          day: currentDay
      });

      //Save to the db
      await newCost.save();

      //Resolve with success
      res.status(201).json({ message : `Cost item added successfully`});

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