exports.createResponse = (statusCode, data) => { 
    let res = {};
    res.statusCode = statusCode;
    switch (statusCode) {
        case 200:
            res.message = 'Success'
            break;
        case 400:
            res.message = 'Not Found'
            break;
        default:
            res.statusCode = 400;
            res.message = 'Not Found'
            break;
    }
    res.data = data;
    return res;
};

exports.isNullOrEmpty = (value) => {
    if (value == null || value == undefined || value == '') {
        return true;
    }
    return false;
}