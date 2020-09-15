var sf = require('node-salesforce');
var read = require('../auth.js');

read.getCredentials().then(res => {
    // We use the credentials obtained from our first authenfication to continue our connection with Salesforce
    var conn = new sf.Connection({
        instanceUrl : res.instanceUrl,
        accessToken : res.accessToken
    });
    
    // Insertion d'un nouveau Contact de type : 'Contact particulier B2B2C'
    let newContactParticulier = {
        RecordTypeId: '0121q000000ClqKAAS', // pour définir le type du contact (REQUIRED)
        ContactNumber__c: 97437771, // Votre ID - External Id (REQUIRED)
        AccountId: '0011q00000aKEsYAAW', // Salesforce Id du Compte auquel ce contact appartient (REQUIRED) 
        FirstName: 'New',
        LastName: 'Contact Particulier',
        Email: 'helloParticulier@world.com',
        Phone: '+33 601-100770',
        // Address
        MailingStreet: '24 rue de Caumartin',
        MailingPostalCode: '75009',
        MailingCity: 'Paris',
        MailingCountry: 'France'
        // ...
    }
    conn.sobject("Contact").create(newContactParticulier, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log("Created record id : " + ret.id);


        // Updates for an existing contact record using UPSERT
        let updatesContactPro = {
            ContactNumber__c: 97437771, // External Id du record à MAJ (Required)
            // fields to update
            Salutation: 'M.',
        }
        // SObject#upsert(record, extIdField) will upsert a record or records given in first
        // External ID field name must be specified (for this NodeJS demo it will be specified in second argument)
        // For more info https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_upsert.htm
        conn.sobject("Contact").upsert(updatesContactPro, 'ContactNumber__c', function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log('Upserted Successfully');
        });
    });
    
})