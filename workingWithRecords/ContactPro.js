var sf = require('node-salesforce');
var read = require('../auth.js');

read.getCredentials().then(res => {
    // We use the credentials obtained from our first authenfication to continue our connection with Salesforce
    var conn = new sf.Connection({
        instanceUrl : res.instanceUrl,
        accessToken : res.accessToken
    });

    // Insertion d'un nouveau Contact de type : 'Contact pro B2B2C'
    let newContactPro = {
        RecordTypeId: '0121q000000ClqFAAS', // pour définir le type du contact (REQUIRED)
        ContactNumber__c: 97432721, // Votre ID - External Id (REQUIRED)
        AccountId: '0011q00000aKEsYAAW', // Salesforce Id du Compte auquel ce contact appartient (REQUIRED) 
        FirstName: 'New',
        LastName: 'Contact Pro',
        Email: 'helloPro@world.com',
        Phone: '+33 601-100770',
        // Address
        MailingStreet: '24 rue de Caumartin',
        MailingPostalCode: '75009',
        MailingCity: 'Paris',
        MailingCountry: 'France'
        // ...
    }
    conn.sobject("Contact").create(newContactPro, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log("Created record id : " + ret.id);
    });
})