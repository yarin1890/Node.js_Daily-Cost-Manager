# Daily Cost Manager

## Description

Daily Cost Manager is a RESTful web service developed using Node.js and Express.js, designed to manage daily expenses. It allows users to add cost items, generate detailed reports by categories and time periods, and uses MongoDB for data storage.

## Features

- Add cost items with descriptions, categories, and amounts.
- Generate categorized expense reports for specific months and years.
- MongoDB integration for data storage.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account

### Installation

1. Clone the repository:
   `git clone https://github.com/yourusername/Daily-Cost-Manager.git`
2. Navigate to the project directory:
   `cd Daily-Cost-Manager`
3. Install dependencies:
   `npm install`
4. Create an `.env` file for MongoDB URI:
   `DB_URI=mongodb+srv://<your_mongodb_atlas_uri>`
5. Start the server:
   `npm start`

## Usage

### Adding a Cost Item

Send a POST request to `/addcost/` with the cost item details.

### Generating Reports

Send a GET request to `/report/` with `user_id`, `year`, and `month` parameters.

## Authors

- **Shai Shillo**
- **Yarin Ben-Moshe**
- **Roman Agbyev**

See also the list of contributors.

