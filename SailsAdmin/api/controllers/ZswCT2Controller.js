/**
 * ZswCT2Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  /**
   * `ZswCT2Controller.hello1()`
   */
  hello1: async function (req, res) {
    return res.json({
      todo: 'hello1() is not implemented yet!'
    });
  },

  /**
   * `ZswCT2Controller.hello2()`
   */
  hello2: async function (req, res) {
    return res.json({
      todo: 'hello2() is not implemented yet!'
    });
  },

  /**
   * `ZswCT2Controller.hello3()`
   */
  hello3: async function (req, res) {
    return res.json({
      todo: 'hello3() is not implemented yet!'
    });
  },



  hi: function (req, res) {
    return res.send("Hi there!");
  },
  bye: function (req, res) {
    return res.redirect("http://www.sayonara.com");
  }

};

