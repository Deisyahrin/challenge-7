var express = require('express');
const {user_game, user_game_biodata, user_game_history,master_room} = require('./../models');
var router = express.Router();

router.post("/game/create-room", async( req, res) =>{
    let random_room = Math.floor (Math.random () * 100);
    let uniqueCode = random_room + req.body.nama_room[0] + req.body.nama_room[1] + req.body.nama_room[2];
    console.log(random_room);
    console.log(req.body.nama_room[0])
    const room = await master_room.create({
        nama_room: req.body.nama_room,
        kode_unik: uniqueCode
    })
    
    .then(result => {
        return res.status(201).json({code: 201,kode_room:uniqueCode, message: 'berhasil menambahkan data'})
      })
      .catch(error => {
          return res.status(400).json({code:400, message: 'gagal'})
      })
})
module.exports = router;