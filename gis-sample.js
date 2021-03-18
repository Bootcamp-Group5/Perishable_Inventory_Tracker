var gis = require('g-i-s');


var opts = {
    searchTerm: 'food strawberry yogurt',
    queryStringAddition: '&tbs=ic:trans',
    filterOutDomains: [
      'pinterest.com',
      'deviantart.com'
    ]
  };
  gis(opts, logResults);



  function logResults(error, results) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(JSON.stringify(results, null, '  '));
        
    }
  }

  