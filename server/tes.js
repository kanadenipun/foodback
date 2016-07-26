var getUserAndPostOrder = function(internalNumber) {

    var bKey = new Buffer('abcd1234', 'utf-8');

    var bInput = new Buffer('admin:123abc123', 'utf-8');

    var cipher = crypto.createCipher('AES-128-ECB',bKey);

    var crypted = cipher.update(bInput,null,'base64');

    crypted+=cipher.final('base64');

    console.log("getUserAndPostOrder", internalNumber);

    var url =  server_url + '/api/users/internalNumber/' + internalNumber;
    var postOrderUrl = server_url + '/api/orders';
    var getOptions = { uri: url, headers: {'User-Agent': 'Request-Promise', 'Authorization': crypted}};
    rp(getOptions)
        .then(function (response) {
            console.log("res", response);
            var user = JSON.parse(response)
            var requestBody = {drinks: [{name: "CTL", quantity: 1}],
                isSwipe: 'true',
                employeeId: user.empId,
                employeeName: user.employeeName};

            var postOptions = {
                method: 'POST',
                uri: postOrderUrl,
                body: requestBody,
                json: true,
                headers: {'Authorization': crypted}
            };

            rp(postOptions).then(function(response) {
                serialPort.write(SUCCESS, function(err, results) {
                    console.log('results ' + results);
                });
            })
        })

        .catch(function (err) {

        });
}