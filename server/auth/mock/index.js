/**
 * Allows deletion of users and getting test users for the purpose of
 * testing.
 */

var User = require("../../api/user");

function deleteUsers(){
    User.remove({});
}
