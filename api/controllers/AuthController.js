/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var Linkedin = require('node-linkedin')(sails.config.client_id, sails.config.clientSecret);

passport.use('linkedin', new LinkedInStrategy({
  clientID: sails.config.client_id,
  clientSecret: sails.config.clientSecret,
  callbackURL: sails.config.callbackURL,
  scope: ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'],
  passReqToCallback: true
}, function(accessToken, refreshToken, profile, done,next) {
 
  
    
    
    return next(null, refreshToken);
  
}));

module.exports = {

    login: function (req, res) {
                
        passport.authenticate('linkedin', { state: sails.config.state  },function(err, user) {
            
        })(req, res,function(err,user){
        
        });
        
    },
    
    callback: function (req, res) {
    
        passport.authenticate('linkedin',function(err, user, info) {
           
            res.redirect(307, 'http://192.155.246.146:5510/callback?name='+user);
            
        })(req, res);
    },
    
    
    companyData: function (req, res) {
        
        console.log(req.body)
        
        var linkedin = Linkedin.init(req.body.token);
        
        if (typeof req.body.value==undefined) {
            req.body.value='apple';
        }
        
        linkedin.companies_search.name(req.body.value,100, function(err, company) {
              
              if (typeof company.companies.values!==undefined) {
                  
                  res.json({status : 200,data : company.companies.values})
              }else{
                  res.json({status : 400,data : []})
              }
              
              
              
          });
        
        
        
    },
    
    
}
