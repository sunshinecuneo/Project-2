// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err){return next(err);}
      if (!user) {return res.json(info);}
      req.logIn (user, function(err){
        if (err) { return res.json(err);}
        return res.json('/members');
      });
    }) (req, res, next);

    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    // console.log("api routes post");
    // console.log(req.message);
    
    // console.log(res);
    
    
    // res.json("/members");
  });
  

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }).then(function() {
      console.log("first then");
      
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log("in catch");
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
     db.User.findAll({
      include: [db.Match]
     }).then(function(result) {
      res.json({
        email: req.user.email,
        id: req.user.id,
        firstName: req.user.firstName,
        Matches: result[0].Matches

      });
     })
    }
  });

  app.get("/api/matches", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Match.findAll({
      include: [db.Points]
    }).then(function(result) {
      // We have access to the todos as an argument inside of the callback function
      res.json(result);
    });
  });



  // POST route for saving a new todo
  app.post("/api/matches", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Match.create({
      date: req.body.date,
      opponent: req.body.opponent,
      UserId: req.user.id
    }).then(function(result) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(result);
    });
  });

  app.get("/api/points", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Points.findAll({}).then(function(result) {
      // We have access to the todos as an argument inside of the callback function
      res.json(result);
    });
  });

  // POST route for saving a new todo
  app.post("/api/points", function(req, res) {
    
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    
    //wl column
    var pointResult = req.body.wl;
    var resultUpper = pointResult.toUpperCase();




    //elim total
    var pointTOTE = parseInt(req.body.e1) + parseInt(req.body.e2) + parseInt(req.body.e3) + parseInt(req.body.e4) + parseInt(req.body.e5);
    

    //hit total
    var pointTOTH = parseInt(req.body.h1) + parseInt(req.body.h2) + parseInt(req.body.h3) + parseInt(req.body.h4) + parseInt(req.body.h5);

    var netFinal = parseInt(pointTOTE) - parseInt(pointTOTH);

    

    db.Points.create({
      wl: resultUpper,
      match_id: req.body.match_id,
      netrtg: netFinal,
      epp: pointTOTE,
      opp: pointTOTH,
      tote: pointTOTE,
      e1: parseInt(req.body.e1),
      e2: parseInt(req.body.e2),
      e3: parseInt(req.body.e3),
      e4: parseInt(req.body.e4),
      e5: parseInt(req.body.e5),
      eob: parseInt(req.body.eob),
      eib: parseInt(req.body.eib),
      eom: parseInt(req.body.eom),
      ebkr: parseInt(req.body.ebkr),
      toth: parseInt(pointTOTH),
      h1: parseInt(req.body.h1),
      h2: parseInt(req.body.h2),
      h3: parseInt(req.body.h3),
      h4: parseInt(req.body.h4),
      h5: parseInt(req.body.h5),
      hob: parseInt(req.body.hob),
      hib: parseInt(req.body.hib),
      hom: parseInt(req.body.hom),
      hbkr: parseInt(req.body.hbkr),
      MatchId: req.body.match_id
    }).then(function(result) {
      // We have access to the new todo as an argument inside of the callback function
      db.Match.findOne({ 
        where: {
          id: req.body.match_id
        },
        include: [db.Points]
      }).then(function(data) {

       var numPoints =  data.Points.length;
        console.log("pointTOTE: ", pointTOTE);
       //score
        // var homeScore = 0;
        // var awayScore = 0;

        // if(result.wl == "W"){
        //   homeScore++;

        // }else{
        //   awayScore++;
        // }

 
 


        
        //static values

      
       data.tote = data.tote + pointTOTE;
       data.e1 = data.e1 + parseInt(req.body.e1);
       data.e2 = data.e2 + parseInt(req.body.e2);
       data.e3 = data.e3 + parseInt(req.body.e3);
       data.e4 = data.e4 + parseInt(req.body.e4);
       data.e5 = data.e5 + parseInt(req.body.e5);
       data.eob = data.eob + parseInt(req.body.eob);
       data.eib = data.eib + parseInt(req.body.eib);
       data.eom = data.eom + parseInt(req.body.eom);
       data.ebkr = data.ebkr + parseInt(req.body.ebkr);
       data.toth = data.toth + parseInt(pointTOTH);
       data.h1 = data.h1 + parseInt(req.body.h1);
       data.h2 = data.h2 + parseInt(req.body.h2);
       data.h3 = data.h3 + parseInt(req.body.h3);
       data.h4 = data.h4 + parseInt(req.body.h4);
       data.h5 = data.h5 + parseInt(req.body.h5);
       data.hob = data.hob + parseInt(req.body.hob);
       data.hib = data.hib + parseInt(req.body.hib);
       data.hom = data.hom + parseInt(req.body.hom);
       data.hbkr = data.hbkr + parseInt(req.body.hbkr);


       //dynamic values

       var epp = data.tote / numPoints;
       var eppFinal = epp;

       //opp
       var opp = data.toth / numPoints;
       var oppFinal = opp;
       
       //netrtg 
       var netrtg = eppFinal - oppFinal;


       data.opp = oppFinal;
       data.epp = eppFinal;
       data.netrtg = netrtg;




        return data;
      }).then(function(updatedData){
        db.Match.update(updatedData.dataValues, {
          where: {
            id: req.body.match_id
          }
        }
        )
      })
      res.json(result);

            
    });
  });

};
