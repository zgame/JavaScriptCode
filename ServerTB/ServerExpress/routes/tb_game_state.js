var express = require('express');
var router = express.Router();

let tb_game_state = require("../action/tb_game_state");
let tb_game_state_sys = require("../action/tb_game_state_sys");

router.get('/list', function(req, res, next) {
    tb_game_state.list(req, res, next);
});

router.get('/record', function(req, res, next) {
    tb_game_state.recordList(req, res, next);
});
router.get('/points', function(req, res, next) {
    tb_game_state.pointsList(req, res, next);
});
router.get('/jackpot', function(req, res, next) {
    tb_game_state.jackpotList(req, res, next);
});
router.get('/tiger', function(req, res, next) {
    tb_game_state.tigerList(req, res, next);
});
router.get('/card', function(req, res, next) {
    tb_game_state.cardList(req, res, next);
});
router.get('/blood', function(req, res, next) {
    tb_game_state.bloodList(req, res, next);
});
router.get('/wheel', function(req, res, next) {
    tb_game_state.wheelList(req, res, next);
});


router.get('/mail', function(req, res, next) {
    tb_game_state_sys.mail(req, res, next);
});
router.get('/sign_in', function(req, res, next) {
    tb_game_state_sys.signIn(req, res, next);
});
router.get('/clock_gold', function(req, res, next) {
    tb_game_state_sys.clockGold(req, res, next);
});
router.get('/vip_dole', function(req, res, next) {
    tb_game_state_sys.vipDole(req, res, next);
});
router.get('/lucky_wheel', function(req, res, next) {
    tb_game_state_sys.luckyWheel(req, res, next);
});

module.exports = router;