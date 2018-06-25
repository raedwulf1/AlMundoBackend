import { Router } from 'express';
import mongojs from 'mongojs';
import { INSPECT_MAX_BYTES } from 'buffer';
const router = Router();

const db = mongojs('almundo-db', ['hotels']);

var hotels = require('../database-mock/data.json');


/* GET hotels listing. */
router.get('/', (req, res) => {
 
/* Using MongoDB */
   /* db.hotels.find((err, hotels) =>{
       if (err)return err;
       res.json(hotels);
     });*/

   res.send(JSON.stringify(hotels, null, 2));
});

/* GET filter hotels. */
router.get('/search', (req, res) => { 
/* Using MongoDB */
   /* db.hotels.find((err, hotels) =>{
       if (err)return err;
       var hotelsFinds
     });*/


  var hotelsFinds = hotels; 
  if( typeof req.query.name != 'undefined' ){
    hotelsFinds = hotels.filter(function(hotel){
      if(hotel.name.toLowerCase().includes(req.query.name.toLowerCase())) {
        return hotel;
      }
    });
  }

  if(req.query.star1 || req.query.star2 || req.query.star3 || req.query.star4 || req.query.star5){

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

/* GET hotels by id. */
router.get('/:id', (req, res) => {
 /* Using MongoDB */
   /* db.hotels.findOne({_id: req.params.id}(err, hotels) =>{
       if (err)return err;
       res.json(hotels);
     });*/

     /* Just for testing Purpose*/
  var index = parseInt(req.params.id);
  if (index === 0 || index && hotels[index]){
    res.send(JSON.stringify(hotels[index], null, 2));
  }else{
    res.status(404);
    res.send('not found');
  }
  
});

/* POST new hotel. */
router.post('/hotels', (req, res, next) => {
  const newHotel = req.body;
  if(!newHotel.name || !newHotel.stars || !newHotel.price){
    res.status(400).json({
      error: 'Bad data'
    });
  }else{
    db.hotels.save(newHotel, (err, hotel) => {
      if (err) return err;
      res.json(hotel);
    });
  }
});

/* DELETE a hotel. */
router.delete('/hotels/:id', (req, res, next) => {
    db.hotels.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
      if (err) return err;
      res.json(result);
    });
});

/* DELETE a hotel. */
router.put('/hotels/:id', (req, res, next) => {
  const hotel = req.body;
  const updateHotel = {};
  if(!updateHotel.name || !updateHotel.stars || !updateHotel.price){
    res.status(400).json({
      error: 'Bad data'
    });
  }else{

    db.hotels.update({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
      if (err) return err;
      res.json(result);
    });
  }
});

export default router;