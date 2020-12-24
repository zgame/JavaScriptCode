var express = require('express');
var router = express.Router();

let tb_game_manager = require("../action/tb_game_manager");
let routes = require('./routesUtils')
//--------------公告------------------
routes.GetR(router,'/get_notice',tb_game_manager.getNotice)
// router.get('/get_notice', function(req, res, next) {
//     tb_game_manager.getNotice(req, res, next);
// });
routes.GetR(router,'/set_notice',tb_game_manager.setNotice)
// router.get('/set_notice', function(req, res, next) {
//     tb_game_manager.setNotice(req, res, next);
// });

//--------------封号------------------
routes.GetR(router,'/get_confine_list',tb_game_manager.getConfineList)
// router.get('/get_confine_list', function(req, res, next) {
//     tb_game_manager.getConfineList(req, res, next);
// });
routes.GetR(router,'/get_confine',tb_game_manager.getConfine)
// router.get('/get_confine', function(req, res, next) {
//     tb_game_manager.getConfine(req, res, next);
// });
routes.GetR(router,'/set_confine',tb_game_manager.setConfine)
// router.get('/set_confine', function(req, res, next) {
//     tb_game_manager.setConfine(req, res, next);
// });
routes.GetR(router,'/del_confine',tb_game_manager.delConfine)
// router.get('/del_confine', function(req, res, next) {
//     tb_game_manager.delConfine(req, res, next);
// });

//--------------跑马灯------------------
routes.GetR(router,'/get_tip',tb_game_manager.getTip)
// router.get('/get_tip', function(req, res, next) {
//     tb_game_manager.getTip(req, res, next);
// });
routes.GetR(router,'/set_tip',tb_game_manager.setTip)
// router.get('/set_tip', function(req, res, next) {
//     tb_game_manager.setTip(req, res, next);
// });
routes.GetR(router,'/add_tip',tb_game_manager.addTip)
// router.get('/add_tip', function(req, res, next) {
//     tb_game_manager.addTip(req, res, next);
// });
routes.GetR(router,'/del_tip',tb_game_manager.delTip)
// router.get('/del_tip', function(req, res, next) {
//     tb_game_manager.delTip(req, res, next);
// });


//--------------邮件------------------
routes.GetR(router,'/get_mail',tb_game_manager.getMail)
// router.get('/get_mail', function(req, res, next) {
//     tb_game_manager.getMail(req, res, next);
// });
routes.GetR(router,'/set_mail',tb_game_manager.setMail)
// router.get('/set_mail', function(req, res, next) {
//     tb_game_manager.setMail(req, res, next);
// });
routes.GetR(router,'/add_mail',tb_game_manager.addMail)
// router.get('/add_mail', function(req, res, next) {
//     tb_game_manager.addMail(req, res, next);
// });
routes.GetR(router,'/del_mail',tb_game_manager.delMail)
// router.get('/del_mail', function(req, res, next) {
//     tb_game_manager.delMail(req, res, next);
// });

//--------------IP白名单------------------
routes.GetR(router,'/get_ip',tb_game_manager.getIp)
// router.get('/get_ip', function(req, res, next) {
//     tb_game_manager.getIp(req, res, next);
// });
// router.get('/set_mail', function(req, res, next) {
//     tb_game_manager.setMail(req, res, next);
// });
routes.GetR(router,'/add_ip',tb_game_manager.addIp)
// router.get('/add_ip', function(req, res, next) {
//     tb_game_manager.addIp(req, res, next);
// });
routes.GetR(router,'/del_ip',tb_game_manager.delIp)
// router.get('/del_ip', function(req, res, next) {
//     tb_game_manager.delIp(req, res, next);
// });




module.exports = router;
