const axios = require( 'axios' );
const nodemailer = require( 'nodemailer' );

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abhayshah287@gmail.com',
    pass: 'kmkgkkxsagumvfrs'
  }
});


const INCLUDE_MATCH = 0;
const EXCLUDE_MATCH = 1;

var vaccineLocationsJSON = { "locations": [
  {"url":"https://vaccines.shoprite.com", "matchString":"Vaccine appointment schedule is FULL", "matchType":EXCLUDE_MATCH},
  {"url":"https://www.hunterdonhealthcare.org/when-can-i-get-the-covid-19-vaccine/", "matchString": "New Vaccination Clinic", "matchType":INCLUDE_MATCH},
  {"url":"https://www.riteaid.com/services/ext/v2/vaccine/checkSlots?storeNumber=599","matchString":"{\"slots\":{\"1\":false,\"2\":false}","matchType":EXCLUDE_MATCH}
]};

vaccineLocationsJSON.locations.forEach(vaccineLocation => {

  axios.get( vaccineLocation.url )
  .then(response => {
    var urlResponse = response.data;
    if ( typeof urlResponse !== "string" ) {
      urlResponse = JSON.stringify(urlResponse);
    }
    if ( ( urlResponse.includes( vaccineLocation.matchString ) && vaccineLocation.matchType===INCLUDE_MATCH ) || 
        ( !urlResponse.includes( vaccineLocation.matchString ) && vaccineLocation.matchType===EXCLUDE_MATCH ) ){
          document.body.getElementsByClassName("VaccineResult")[0].innerHTML("Vaccine Found");
          console.log( "Vaccine Found: " + vaccineLocation.url );
          var mailOptions = {
            from: 'abhayshah287@gmail.com',
            to: 'net_abhay@yahoo.com',
            subject: 'Vaccine Availability Alert',
            text: 'Vaccine Found ' + vaccineLocation.url
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    else {
      console.log( "Vaccine Not Found: " + vaccineLocation.url );
    }
  })
  .catch(error => {
    console.log(error);
  });

});



