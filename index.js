const axios = require( 'axios' );
const nodemailer = require( 'nodemailer' );

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abhayshah287@gmail.com',
    pass: 'XXXX'
  }
});


const INCLUDE_MATCH = 0;
const EXCLUDE_MATCH = 1;

// shoprite
const shopriteURL = 'https://vaccines.shoprite.com/';
const matchString = "Vaccine appointment schedule is FULL";
const matchType = INCLUDE_MATCH; // 0 = vaccine available on match, 1 = vaccine not available on match

var vaccineURL = shopriteURL;

axios.get( vaccineURL )
  .then(response => {
    if ( ( response.data.includes( matchString ) && matchType===INCLUDE_MATCH ) || 
        ( !response.data.includes( matchString ) && matchType===EXCLUDE_MATCH ) ){
          console.log( "Vaccine Found: " + vaccineURL );
          var mailOptions = {
            from: 'abhayshah287@gmail.com',
            to: 'net_abhay@yahoo.com',
            subject: 'Vaccine Availability Alert',
            text: 'Vaccine Found' + vaccineURL
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
      console.log( "Vaccine Not Found: " + vaccineURL );
    }
  })
  .catch(error => {
    console.log(error);
  });

