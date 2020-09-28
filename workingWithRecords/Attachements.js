const connect = require('../AuthJSForce.js');
var jsforce = require('jsforce');
const fs = require('fs');


connect.getCredentials().then(res => {
    // We use the credentials obtained from our first authenfication to continue our connection with Salesforce
    const conn = new jsforce.Connection({
        instanceUrl : res.instanceUrl,
        accessToken : res.accessToken
    });

    let base64data = fs.readFileSync('./test.png').toString("base64");
    //console.log('Image converted to base 64 is:\n\n' + base64data);

    //Insertion d'une pièce jointe attachée à un record (Demande par ex)
    let newContentVersion = {
        Title: "Test image file", // Titre @String - Required
        PathOnClient: "Cloud-pyramid.png", // Specify a complete path including the path EXTENSION (Extensions Exe: .jpg, .png, .pdf) @String - Required
        ContentLocation: "S", // Required
        OwnerId: "0051q000003cvNDAAY", // A User Salesforce Id (the user who will own this attachment) - Optional
        FirstPublishLocationId: '5001q000000i3yyAAA', // The Salesforce record Id to whom this attachment will be related to (Exe: Sf Id d'une demande) - Required
        VersionData: base64data // the body of the attachment (MUST be encoded to Base64 Strings) - Required
    }

    conn.sobject("ContentVersion").create(newContentVersion, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log("Created ContentVersion id : " + ret.id);
    });
});