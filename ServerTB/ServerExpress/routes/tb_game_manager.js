var express = require('express');
var router = express.Router();

let tb_game_manager = require("../action/tb_game_manager");

//--------------公告------------------
router.get('/get_notice', function(req, res, next) {
    tb_game_manager.getNotice(req, res, next);
});

router.get('/set_notice', function(req, res, next) {
    tb_game_manager.setNotice(req, res, next);
});

//--------------封号------------------
router.get('/get_confine_list', function(req, res, next) {
    tb_game_manager.getConfineList(req, res, next);
});
router.get('/get_confine', function(req, res, next) {
    tb_game_manager.getConfine(req, res, next);
});
router.get('/set_confine', function(req, res, next) {
    tb_game_manager.setConfine(req, res, next);
});
router.get('/del_confine', function(req, res, next) {
    tb_game_manager.delConfine(req, res, next);
});

//--------------跑马灯------------------
router.get('/get_tip', function(req, res, next) {
    tb_game_manager.getTip(req, res, next);
});
router.get('/set_tip', function(req, res, next) {
    tb_game_manager.setTip(req, res, next);
});
router.get('/add_tip', function(req, res, next) {
    tb_game_manager.addTip(req, res, next);
});
router.get('/del_tip', function(req, res, next) {
    tb_game_manager.delTip(req, res, next);
});


//--------------邮件------------------
router.get('/get_mail', function(req, res, next) {
    tb_game_manager.getMail(req, res, next);
});
router.get('/set_mail', function(req, res, next) {
    tb_game_manager.setMail(req, res, next);
});
router.get('/add_mail', function(req, res, next) {
    tb_game_manager.addMail(req, res, next);
});
router.get('/del_mail', function(req, res, next) {
    tb_game_manager.delMail(req, res, next);
});

//--------------IP白名单------------------
router.get('/get_ip', function(req, res, next) {
    tb_game_manager.getIp(req, res, next);
});
// router.get('/set_mail', function(req, res, next) {
//     tb_game_manager.setMail(req, res, next);
// });
router.get('/add_ip', function(req, res, next) {
    tb_game_manager.addIp(req, res, next);
});
router.get('/del_ip', function(req, res, next) {
    tb_game_manager.delIp(req, res, next);
});




module.exports = router;
