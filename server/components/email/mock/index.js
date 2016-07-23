module.exports.send = (message, callback) => {
    console.log(`Sending ${message.email}`);
    console.log(`${message.html}`);
    callback();
};
