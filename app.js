var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');

// var currentLoc = 0;

var locations = [
  {
    locationName: 'Seville',
    description: 'Seville is the capital and largest city of the autonomous community of Andalusia and the province of Seville, Spain. ',
    image: 'http://upload.wikimedia.org/wikipedia/commons/4/4a/Paisaje_de_Espa%C3%B1a.JPG',
    nextLocation: 'Canary Islands'
  },
  {
    locationName: 'Canary Islands',
    description: 'The Canary Islands are the place with the best climate for enjoying an amazing holiday at any time of the year. ',
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTFmzIMRD5GZeGt3HuIlh9RMEh3tnM3XCaC1uIXcgp250Oq_NUZJA',
    nextLocation: 'Cape Verde'
  },
  {
    locationName: 'Cape Verde',
    description: 'Before the arrival of Europeans, the Cape Verde Islands were uninhabited. The islands of the Cape Verde archipelago were discovered by Genoese and Portuguese navigators around 1456.',
    image: 'http://www.xmltravel.com/content/resort/myt/capeverde10',
    nextLocation: 'Strait of Magellan'
  },
  {
    locationName: 'Strait of Magellan',
    description: 'The Strait of Magellan (Spanish: Estrecho de Magallanes), also called the Straits of Magellan, is a navigable sea route separating mainland South America to the north and Tierra del Fuego to the south. ',
    image: 'http://global-mariner.com/Magellan2-5-Web.jpg',
    nextLocation: 'Guam'
  },
  {
    locationName: 'Guam',
    description: 'Guam is an organized, unincorporated territory of the United States in the western Pacific Ocean. ',
    image: 'http://www.tourist-destinations.net/wp-content/uploads/2013/11/Guam-cristal-clear-water.jpg',
    nextLocation: 'Phillipines'
  },
  {
    locationName: 'Philippines',
    description: 'The Philippines, officially known as the Republic of the Philippines (Filipino: Republika ng Pilipinas), is a sovereign island country in Southeast Asia situated in the western Pacific Ocean. It consists of 7,107 islands that are categorized broadly under three main geographical divisions: Luzon, Visayas, and Mindanao. Its capital city is Manila while its most populous city is Quezon City; both are part of Metro Manila.',
    image: 'http://demo1.globescope.com//fpss/slideshows/myslideshow1/images/photo4.jpg',
    nextLocation: undefined
  },
];

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.render('location', {
    name: locations[0].locationName,
    desc: locations[0].description,
    img: locations[0].image
  });
});

app.get('/next', function(req, res) {
  var currentLocation = req.query.location;
  var nextLocation, isLastOne = false;
  
  for(var i=0; i < locations.length; i++){
    if (locations[i].locationName === currentLocation){
      nextLocation = locations[i].nextLocation;
      if (nextLocation === undefined){
        isLastOne = true;
      }
      break;
    }
  }

  var nextLocationObj = locations.filter(function(location){
    return location.locationName === nextLocation;
  })[0];

  res.render('location', {
    name: nextLocationObj.locationName,
    desc: nextLocationObj.description,
    img: nextLocationObj.image,
    lastTF: isLastOne
  });
});


// app.get('/next', function(req, res) {
//   if (currentLoc === (locations.length - 1)) {
//     currentLoc = 0;
//   }
//   else {
//     currentLoc++;
//   }
//   res.setHeader('Content-Type', 'application/json');
//   res.send('{location:' + req.query.location + ', nextLocation:' + locations[currentLoc].locationName + '}');
// });


// app.post('/next', function(req, res) {
//   var isLastOne = false;
//   if (currentLoc === (locations.length - 2)) {
//     isLastOne = true;
//   }
//   currentLoc++;
//   res.render('location', {
//     name: locations[currentLoc].locationName,
//     desc: locations[currentLoc].description,
//     img: locations[currentLoc].image,
//     lastTF: isLastOne
//   });
// });

app.get('/:locReq', function(req, res){
  var checkLoc = req.params.locReq;

  for (var i = 0; i < locations.length; i++) {
    if (checkLoc === locations[i].locationName) {
      res.render('location', {
        name: locations[i].locationName,
        desc: locations[i].description,
        img: locations[i].image
      });
      return;
    }
  }
  res.render('error', {
    name: checkLoc
  });
});

// app.get('/location', function(req, res) {
//     res.render('location', {
//     username: myCurrentUsername,
//     description: myCurrentDescription
//   });

//   });

var server = app.listen(3368, function() {
	console.log('Express server listening on port ' + server.address().port);
});
