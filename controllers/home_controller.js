const Contact = require('../models/contacts');

module.exports.home = function(req,res){
    Contact.find({})
    .populate('user')
    .exec(function(err,contacts){
        if(err){
            console.log(err);
        }
        return res.render('home',{
            title:"HomePage",
            contact_list : contacts
        });
    })
}