exports.createResponse = (statusCode, message, data) => { return {statusCode, message, data}};

exports.isNullOrEmpty = (value) => {
    if (value == null || value == undefined || value == '') {
        return true;
    }
    return false;
}