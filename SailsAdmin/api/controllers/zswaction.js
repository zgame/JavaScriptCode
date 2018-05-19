module.exports = {


  friendlyName: 'Zswaction',


  description: 'Zswaction something.',


  inputs: {

  },


  exits: {
    success: {      viewTemplatePath: 'pages/zsw1',    },
  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
