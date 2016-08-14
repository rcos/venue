module.exports.send = (message, callback) => {
    console.log(`Sending ${message.email}`);
    callback();
};
