const Contact = require('../models/contacts');

module.exports.create = function(req,res){
    Contact.create({
        name : req.body.name,
        number : req.body.phone,
        user : req.user._id
    },function(err,list){
        if(err){
            console.log("Error while Creating Contact" + err);
            return;
        }
        console.log("Contact created!")
        return res.redirect('back');
    })
}

module.exports.destroy = function(req,res){

    let id = req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error while deleting");
        }
    });
    return res.redirect('back');
}