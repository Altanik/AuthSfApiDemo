var sf = require('node-salesforce');
var read = require('../auth.js');

read.getCredentials().then(res => {
    // We use the credentials obtained from our first authenfication to continue our connection with Salesforce
    var conn = new sf.Connection({
        instanceUrl : res.instanceUrl,
        accessToken : res.accessToken
    });

    // Insertion d'un nouveau compte de type : 'Compte Partenaire'
    let newComptePartenaire = {
        RecordTypeId: '0121q000000CloYAAS', // pour définir le type du compte (REQUIRED)
        AccountNumber__c: 123456, // Votre ID - External Id (REQUIRED)
        Name: 'ComptePartenaire RestApi Insert',
        AccountStatus__c: 'FROID', // Field of Type PickList : les différents valeurs sont disponible dans le dictionnaire de donnée (DDD)
        OrganisationType__c: 'SIEGE', // PickList : values in DDD
        PaymentMethod__c: 'VIR', // PickList : values in DDD
        Siret__c: '12345600',
        //Address
        BillingStreet: '24 rue de Caumartin',
        BillingPostalCode: '75009',
        BillingCity: 'Paris',
        BillingCountry: 'France'
        // ...
    }
    conn.sobject("Account").create(newComptePartenaire, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log("Created record id : " + ret.id);

        // Updates for an existing Account record using UPSERT
        let updatesComptePartenaire = {
            AccountNumber__c: 123456, // External Id du record à MAJ (Required)
            // fields to update
            website: 'helloworld.com',
        }
        conn.sobject("Account").upsert(updatesComptePartenaire, 'AccountNumber__c', function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log('Upserted Successfully');
        });

    });
    
})