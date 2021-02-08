const axios = require( 'axios' );
const cheerio = require ( 'cheerio' );

// shoprite
const shopriteURL = 'https://vaccines.shoprite.com/';
const matchString = "Vaccine appointment schedule is FULL";
const matchType = 1; // 0 = vaccine available on match, 1 = vaccine not available on match

axios.get(shopriteURL)
  .then(response => {
    //console.log(response.data);
    if ( response.data.includes( matchString ) && matchType ) {
        console.log("Shoprite No Vaccinnes");
    }
  })
  .catch(error => {
    console.log(error);
  });

