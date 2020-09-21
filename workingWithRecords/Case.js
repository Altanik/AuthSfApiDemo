var sf = require('node-salesforce');
var read = require('../auth.js');

read.getCredentials().then(res => {
    // We use the credentials obtained from our first authenfication to continue our connection with Salesforce
    var conn = new sf.Connection({
        instanceUrl : res.instanceUrl,
        accessToken : res.accessToken
    });

    // Insertion d'une demande lié à Compte particulier
    let newCase = {
        AccountId: '0011q00000aJ21yAAC', // ID Salesforce du compte auquelle la demande elle est lié (REQUIRED)
        Priority: 'High', // Picklist: Values in DD
        Origin: 'Email', // Picklist: Values in DD (REQUIRED)
        
        Status: 'À traiter', // Picklist: Values in DD (REQUIRED)

        Reason: 'Contact client', // Picklist: Values in DD (REQUIRED)
        SubCategory__c: 'Suivi dossier', // Picklist: Values in DD (REQUIRED If case <<Reason>> equals {'Contact client' OR'Abandon dossier'})

        ID_OS__c: '1984634284', // String (15 chars MAX)
        Subject: 'you can insert String value here', // String (255 chars MAX)
        Description: 'you can insert a long String value here' // String (32000 chars MAX)
        // ...
    }
    conn.sobject("Case").create(newCase, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log("Created record id : " + ret.id);
    });

})
