var restify = require('restify');
restify.CORS.ALLOW_HEADERS.push('authorization');


var passport = require('passport');
var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(passport.initialize()); 


var authRouter = require('./src/routers/v1/authenticate-router');
authRouter().applyRoutes(server, "/v1/authenticate");

var accountRouter = require('./src/routers/v1/account-router');
accountRouter().applyRoutes(server, "/v1/accounts");

var roleRouter = require('./src/routers/v1/role-router');
roleRouter().applyRoutes(server, "/v1/roles");

var meRouter = require('./src/routers/v1/me-router');
meRouter().applyRoutes(server, "/v1/me");


server.listen(process.env.PORT, process.env.IP);
console.log(`auth server created at ${process.env.IP}:${process.env.PORT}`)