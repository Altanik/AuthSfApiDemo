var sf = require('node-salesforce');
const e = require('express');

const connAuth = new sf.Connection({
  oauth2 : {
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : 'https://teksialcrm2020--devpro.my.salesforce.com',
    clientId : '3MVG9GXbtnGKjXe5bCymXVlNpoT7emvGz5wOp2U8TTZsfCFxH0NoYoFVdxkxHxzpSTuBdF0NSun64KSCWMSEw',
    clientSecret : '1FAF9F5328F38B67CEFD6BA5887E4968DEC50FA5C18529128C7E4458C54C98D4',
  }
});
var getCredentials = function() {
  return new Promise(function (resolve, reject) {
        connAuth.login('elmehdi.touimi-benjelloun@lineup7.fr', 'HelloWorld0', function(err, userInfo){
        if (err) { 
          reject(err);
          return console.error(err); 
        }

        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        console.log('Access Token: ' + connAuth.accessToken);
        console.log('Instance Url: ' + connAuth.instanceUrl);

        var instanceUrl = connAuth.instanceUrl;
        var accessToken = connAuth.accessToken.toString().substring().split('!')[1];

        resolve({accessToken, instanceUrl});
        return {accessToken, instanceUrl};
      })
  })
}

exports.getCredentials = getCredentials;