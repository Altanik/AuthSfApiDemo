var sf = require('node-salesforce');
var read = require('../auth.js');

read.getCredentials().then(res => {
    // We use the credentials obtained from our first authenfication to continue our connection with Salesforce
    var conn = new sf.Connection({
        instanceUrl : res.instanceUrl,
        accessToken : res.accessToken
    });

    // Insertion d'un nouveau compte de type : 'Compte B2C'
    let newCompteB2C = {
        AccountNumber__c: 9213456, // Votre ID - External Id (REQUIRED)
        FirstName: 'New E.g',
        LastName: 'Compte B2C RestApi Insert',
        PersonEmail: 'hello@world.com',
        Phone: '+33 601-100770',
        //Address
        PersonMailingStreet: '24 rue de Caumartin',
        PersonMailingPostalCode: '75009',
        PersonMailingCity: 'Paris',
        PersonMailingCountry: 'France'
        // ...
    }
    conn.sobject("Account").create(newCompteB2C, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log("Created record id : " + ret.id);

        // Updates for an existing Account record using UPSERT
        let updatesCompteB2C = {
            AccountNumber__c: 9213456, // External Id du record à MAJ (Required)
            // fields to update
            LastLoginDate__pc: Date.now() // This field's type is 'Date/Time' it should be in the format 'YYYY-MM-DD hh:mm:ss'
                                        // Format of fields of type 'Date' is 'YYYY-MM-DD'
                                        // For more info : https://help.salesforce.com/articleView?id=000325035
        }
        conn.sobject("Account").upsert(updatesCompteB2C, 'AccountNumber__c', function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log('Upserted Successfully');
        });
        
    });

})
