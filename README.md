Features

- Users (with one-to-one settings)
- Posts (each post belongs to a user, can belong to many categories)
- Categories (each can belong to many posts)
- Settings (one setting per user)

Technologies Used

- Express.js
- Sequelize ORM
- MySQL
- Dotenv for environment config

Clone the Repository
git clone https://github.com/mza43/user_post_category.git

Run migrations:
npx sequelize-cli db:migrate

Start Production
npm start

For Database
npm run install:sequelize
npm run sequelize:init   
Ignore
ERROR: The file already exists. Run command with --force to overwrite it.
Do not use the --force command — it will delete the migrations folder.
Add DB credentials in config/config.json

npm run migrate


.env.example
DB_NAME=userpc
DB_USER=root
DB_PASS=
DB_HOST=localhost
DB_DIALECT=mysql
PORT=3000
