const apiVersion = '1.0.0';

var Router = require('restify-router').Router; 
var resultFormatter = require("../../result-formatter");
var passport = require('../../passports/local-passport');

module.exports = function() {
    var router = new Router();
    
    router.post('/', passport, (request, response, next) => {
        var account = request.user;

        var jwt = require("jsonwebtoken");
        var token = jwt.sign({
            username: account.username,
            profile: account.profile,
            roles: account.roles.map(role => role.code)
        }, process.env.AUTH_SECRET);

        var result = resultFormatter.ok(apiVersion, 200, token);
        response.send(200, result);
    });
    return router;
};
