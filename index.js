var sf = require('node-salesforce');
var read = require('./auth.js');

read.getCredentials().then(res => {
    // We use the credentials obtained from our first authenfication to continue our connection with Salesforce
    var conn = new sf.Connection({
        instanceUrl : res.instanceUrl,
        accessToken : res.accessToken
    });

    // We test again our establiched connection by achieving a very basic SOQL query to fetch Salesforce records.
    conn.query("SELECT Id, Name FROM Account", function(err, result) {
        if (err) { return console.error(err); }
        console.log("total : " + result.totalSize);
        console.log("fetched : " + result.records.length);
    });
    
})