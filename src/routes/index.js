import { Router } from 'express';
import hotels from './hotels';

const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index.html');
  // res.send('respond with a resource');
});

router.use('/hotels', hotels);


export default router;