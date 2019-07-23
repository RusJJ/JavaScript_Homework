exports.processLogin = processLogin;
exports.processPOSTMethod = processPOSTMethod;

function processLogin(username, password) {
    console.log(username + ' | ' + password);
}

function processPOSTMethod(data) {
    var parsed_data;
    try {
        parsed_data = JSON.parse(data);
    }
    catch (json_err) {
        console.error('Failed to parse login data: ' + json_err);
        return;
    }
    console.log('I`ll make an attemp to login a \'' + parsed_data.usrnm + '\' with his password (' + parsed_data.pswrd + ')');
}