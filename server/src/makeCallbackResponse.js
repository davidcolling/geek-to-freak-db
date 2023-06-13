// read function name as "make callback (imperative): response (declarative)"
const makeCallbackResponse = response => {
    return function (err, data) {
        if (err) {
            console.log("workout server: ", err);
        } else {
            response.send(data);
        }
    };
}

module.exports = makeCallbackResponse;

