var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    access_level: { 
      type: Number,  /*-1 = guest, 0 = logged_in , 1 = admin , 2 = super admin */
        default: -1
    }
}, {
    timestamps: true
});

User.plugin(passportLocalMongoose);



module.exports = mongoose.model('User', User);