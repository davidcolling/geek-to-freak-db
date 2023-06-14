const query = (con, query, successMessage, cb) => {
    if (typeof cb === 'undefined') {
        cb = (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(successMessage);
                return result;
            }
        }
    }
    return con.query(
        query,
        cb
    )
}
 
module.exports = query;

