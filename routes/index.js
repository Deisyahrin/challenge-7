var express = require('express');
var router = express.Router();
const auth = require('../controllers/authcontroller');
const page = require('../controllers/pagesController');
const restrict = require('../middlewares/restrict');


router.get('/', page.home);


router.get('/register', page.register);
router.post('/register', auth.register);

router.post("/register", async (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      user_game.create({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        isAdmin: req.body.isAdmin
      })
      // return res.status(200).json({ message : 'data bisa dimasukkan'})
      .then(result => {
        return res.status(201).json({code: 201, message: 'berhasil menambahkan data'})
      })
    })
  })

// Login Page
router.get('/login', page.login);
router.post('/login', auth.login);

//Profile Page
router.get('/profile', restrict, page.profile);

module.exports = router;
