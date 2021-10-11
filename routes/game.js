var express = require('express');
var router = express.Router();

// Controllers
const game = require('../controllers/gameController');
const page = require('../controllers/pagesController');
// router.js
// Tambahkan kode middleware ini setelah bagian controller
const restrict = require('../middlewares/restrict');

/* GET Game Lobby page. */
router.get('/', restrict, page.gameLobby);

/* Create Room page */
router.get('/create-room', restrict, page.createRoom);
router.post('/create-room', restrict, game.createRoom);

/* Game Room page */
router.get('/game-room', restrict, page.gameRoom);

/* Game Fight Validation page */
router.get('/game-fight', restrict, page.roomFight);
router.post('/game-fight', restrict, game.roomFight);
router.get('/game-fight/:id', restrict, page.roomFight);

router.get('/fight-player-1', page.fightPlayer1);
router.post('/fight-player-1', game.pilihanUser1);

router.get('/fight-player-2', page.fightPlayer2);
router.post('/fight-player-2', game.pilihanUser2);

module.exports = router;
