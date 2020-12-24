var express = require('express');
var router = express.Router();

let tb_game_state = require("../action/tb_game_state");
let tb_game_state_sys = require("../action/tb_game_state_sys");
let routes = require('./routesUtils')

routes.GetR('/list',tb_game_state.list)
// router.get('/list', function(req, res, next) {
//     tb_game_state.list(req, res, next);
// });

routes.GetR('/record',tb_game_state.recordList)
// router.get('/record', function(req, res, next) {
//     tb_game_state.recordList(req, res, next);
// });
routes.GetR('/points',tb_game_state.pointsList)
// router.get('/points', function(req, res, next) {
//     tb_game_state.pointsList(req, res, next);
// });
routes.GetR('/jackpot',tb_game_state.jackpotList)
// router.get('/jackpot', function(req, res, next) {
//     tb_game_state.jackpotList(req, res, next);
// });
routes.GetR('/tiger',tb_game_state.tigerList)
// router.get('/tiger', function(req, res, next) {
//     tb_game_state.tigerList(req, res, next);
// });
routes.GetR('/card',tb_game_state.cardList)
// router.get('/card', function(req, res, next) {
//     tb_game_state.cardList(req, res, next);
// });
routes.GetR('/blood',tb_game_state.bloodList)
// router.get('/blood', function(req, res, next) {
//     tb_game_state.bloodList(req, res, next);
// });
routes.GetR('/wheel',tb_game_state.wheelList)
// router.get('/wheel', function(req, res, next) {
//     tb_game_state.wheelList(req, res, next);
// });

routes.GetR('/mail',tb_game_state_sys.mail)
// router.get('/mail', function(req, res, next) {
//     tb_game_state_sys.mail(req, res, next);
// });
routes.GetR('/sign_in',tb_game_state_sys.signIn)
// router.get('/sign_in', function(req, res, next) {
//     tb_game_state_sys.signIn(req, res, next);
// });
routes.GetR('/clock_gold',tb_game_state_sys.clockGold)
// router.get('/clock_gold', function(req, res, next) {
//     tb_game_state_sys.clockGold(req, res, next);
// });
routes.GetR('/vip_dole',tb_game_state_sys.vipDole)
// router.get('/vip_dole', function(req, res, next) {
//     tb_game_state_sys.vipDole(req, res, next);
// });
routes.GetR('/lucky_wheel',tb_game_state_sys.luckyWheel)
// router.get('/lucky_wheel', function(req, res, next) {
//     tb_game_state_sys.luckyWheel(req, res, next);
// });

module.exports = router;