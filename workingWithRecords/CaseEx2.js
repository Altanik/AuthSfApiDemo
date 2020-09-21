var sf = require('node-salesforce');
var read = require('../auth.js');

read.getCredentials().then(res => {
    // We use the credentials obtained from our first authenfication to continue our connection with Salesforce
    var conn = new sf.Connection({
        instanceUrl : res.instanceUrl,
        accessToken : res.accessToken
    });

    // Insertion d'une demande BLOQUANTE lié à Contact Pro B2B2C
    let newCaseBlocked = {
        ContactId: '0031q00000UeocSAAR', // ID Salesforce du contact pro auquelle la demande elle est lié (REQUIRED)
        Priority: 'High', // Picklist: Values in DD
        Origin: 'Email', // Picklist: Values in DD (REQUIRED)

        Status: 'À traiter', // Picklist: Values in DD (REQUIRED)

        BlockedStatus__c: true, // Boolean: default false
        ReasonBlocked__c : 'Attente d\'information hiérarchie', // Picklist: Values in DD (REQUIRED If case <<BlockedStatus__c>> equals TRUE)

        Reason: 'Problème site',

        ID_OS__c: '1984634284', // String (15 chars MAX)
        Subject: 'you can insert String value here', // String (255 chars MAX)
        Description: 'you can insert a long String value here' // String (32000 chars MAX)
        // ...
    }
    conn.sobject("Case").create(newCaseBlocked, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log("Created record id : " + ret.id);
        
        let updatesCaseBlocked = {
            Id: ret.id, // ID Salesforce du case à MAJ
            Status: 'Closed', // Picklist: Values in DD (REQUIRED)
            ReasonForClosure__c: 'Demande traitée' // Picklist: Values in DD (REQUIRED If case <<Status>> equals {'Closed'})
        }
        conn.sobject("Case").upsert(updatesCaseBlocked, 'Id', function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log('Case Upserted Successfully');
        });
    });

})
