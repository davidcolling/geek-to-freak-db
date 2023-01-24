A bare tracker for Geek-To-Freak workouts using MariaDB-ERN.

Geek-To-Freak workouts are those conformant to techniques fom "The Colorado Experiment" (1973) and Tim Ferriss's "Geek To Freak."

Thanks for the boilerplate
https://github.com/ccsalazar/react-mysql-boilerplate.git

To install, run "yarn" in root and client directories.

To run, from root,
yarn run dev

To develop, make a file named server/config/dev.js with contents something like:

module.exports = {
    DB_HOST: "localhost",
    DB_USER: "workout_dev",
    DB_PASSWORD: "",
    DB_DATABASE: "test"
}

