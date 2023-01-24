MariaDB
Thanks for the boilerplate
https://github.com/ccsalazar/react-mysql-boilerplate.git

To install, run "yarn" in root and client directories.

To run, from root,
yarn run dev

To develop, make a file named server/config/dev.js
module.exports = {
    DB_HOST: "localhost",
    DB_USER: "workout_dev",
    DB_PASSWORD: "",
    DB_DATABASE: "test"
}

