var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    mongoose = require("mongoose"),
    Item = require("../models/item"),
    middleware = require("../middleware/index"),
    Party = require("../models/party"),
    User = require("../models/user")

//function for checking if a user has an Item
function userHasItem(user, item){
    for(var i=0;i<user.inventory.length;i++){
        if(user.inventory[i].equals(item._id)){
            return true
        }
    }
    return false;
}

//Shop Index Route
router.get("/shop", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id).populate("inventory").exec(function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            Item.find({}, function(err, allItems){
                if(err){
                    console.log(err);
                    req.flash("error", err.message);
                } else {
                    res.render("shop/index", {items:allItems, currentUser:foundUser});
                }
            })
        }
    })
});

//Shop Buy Coins Route
router.post("/shop", middleware.isLoggedIn, function(req, res){
    req.user.coins += parseInt(req.body.coinNumber);
    req.user.save();
    res.redirect("/shop");
})

//Shop Buy Item Route
router.post("/shop/buy", middleware.isLoggedIn, function(req, res){
    //Logic goes here
    Item.findById(req.body.item, function(err, foundItem){
        if (err){
            console.log(err)
            req.flash("error", err.message);
        } else {
            //checks to see if User has item already
            if(userHasItem(req.user, foundItem)){
                req.flash("error", "You already have that item")
            } else {
                if(req.user.coins<Number(foundItem.cost)){
                    req.flash("error", "Sorry, you don't have enough coins!")
                } else {
                    req.user.coins-=Number(foundItem.cost);
                    req.user.inventory.push(foundItem._id);
                    req.user.save();
                }
            }
        }
    })
    res.redirect("/shop");
})

//Settings Index Route
router.get("/settings", function(req, res){
    res.render("settings/index");
});

//Main Menu Index Route
router.get("/mainmenu", function(req, res){
    res.render("mainmenu/index");
});

//Party Index Route
router.get("/party", function(req, res){
    //Get all parties from DB
    Party.find({}, function(err, allParties){
        if(err){
            console.log(err);
            req.flash("error", err.message);
        } else {
            res.render("party", {parties:allParties});
        }
    });
});

//Party Show Route
router.get("/party/:id", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id).populate("party").exec(function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            Party.findById(req.params.id).exec(function(err, foundParty){
                if(err){
                    console.log(err);
                    req.flash("error", err.message);
                } else {
                    res.render("party/show", {party:foundParty, currentUser:foundUser});
                }
            });
        }
    })
});

//Party Join Route
router.post("/party", middleware.isLoggedIn, function(req, res){
    //Logic goes here
    Party.findById(req.body.party, function(err, foundParty){
        if (err){
            console.log(err)
            req.flash("error", err.message);
        } else {
            //checks to see if User has a party and it's this party
            if(req.user.party&&req.user.party.equals(foundParty._id)){
                req.flash("error", "You're already a member of this party")
                res.redirect("party/" + foundParty._id)
            } else {
                //if the user's party isn't this party
                req.user.party = foundParty; 
                req.user.save();
                req.flash("success", "You've joined this party!")
                res.redirect("party/" + foundParty._id)
            }
        }
    })

})

//Update Profile Get Route
router.get("/profile/update", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id).populate("inventory").populate("party").exec(function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            res.render("profile/update", {currentUser:foundUser});        
        }
    })
})

//Profile Index Route
router.get("/profile", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id).populate("inventory").populate("party").exec(function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            res.render("profile/index", {currentUser:foundUser});        
        }
    })
})


//Update Profile Post Route
router.post("/profile/update", middleware.isLoggedIn, function(req, res){
    //update User Logic
    var updateParams = {};
    if(req.body.age){
        updateParams.age = +req.body.age;
    }
    if(req.body.race){
        updateParams.race = req.body.race;
    }
    if(req.body.income){
        updateParams.income = +req.body.income;
    }
    if(req.body.gender){
        updateParams.gender = req.body.gender;
    }
    if(req.body.education){
        updateParams.education = req.body.education;
    }
    if(req.body.location){
        updateParams.location = req.body.location;
    }
    if(req.body.familySize){
        updateParams.familySize = +req.body.familySize;
    }
    User.findByIdAndUpdate(req.user._id, updateParams).exec(function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            res.redirect("/profile");
        }
    })
})

//About Index Route
router.get("/about", function(req, res){
    res.render("about/index");
})

    
module.exports = router;