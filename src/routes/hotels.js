import { Router } from 'express';
const router = Router();


var hotels = require('../database-mock/data.json');


/* GET hotels listing. */
router.get('/', (req, res) => {
  res.send(JSON.stringify(hotels, null, 2));
});

router.get('/search', (req, res) => { 
  var hotelsFinds = hotels; 
  // http://localhost:8000/hotels/search?name=hotelName
  if( typeof req.query.name != 'undefined' ){
    hotelsFinds = hotels.filter(function(hotel){
      if(hotel.name.toLowerCase().includes(req.query.name.toLowerCase())) {
        return hotel;
      }
    });
  }

  if(req.query.star1 || req.query.star2 || req.query.star3 || req.query.star4 || req.query.star5){
    console.log(req.query.star1);
    console.log(hotelsFinds);
    hotelsFinds = hotelsFinds.filter(function(hotel){
      if(req.query.star1 && hotel.stars == 1) {
        return hotel;
      }
      if(req.query.star2 && hotel.stars == 2) {
        return hotel;
      }
      if(req.query.star3 && hotel.stars == 3) {
        return hotel;
      }
      if(req.query.star4 && hotel.stars == 4) {
        return hotel;
      }
      if(req.query.star5 && hotel.stars == 5) {
        return hotel;
      }
    });
  }


  res.send(JSON.stringify(hotelsFinds, null, 2));
});

router.get('/:hotelIndex', (req, res) => {
  var index = parseInt(req.params.hotelIndex);
  if (index === 0 || index && hotels[index]){
    res.send(JSON.stringify(hotels[index], null, 2));
  }else{
    res.status(404);
    res.send('not found');
  }
  
});

router.get('/:stars', (req, res) => {
  var index = parseInt(req.params.hotelIndex);
  if (index === 0 || index && hotels[index]){
    res.send(JSON.stringify(hotels[index], null, 2));
  }else{
    res.status(404);
    res.send('not found');
  }
  
});


export default router;