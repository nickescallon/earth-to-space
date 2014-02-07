var fs = require('fs');

var getHandler = function(req, res){
  //add path handling!!!!
  console.log('GET');
  fs.readFile('../data/world.json', 'utf8', function(err, data){
    data = JSON.stringify(data);
    sendResponse(res, data);
  });
};

var postHandler = function(req, res){
  //add path handling!!!!
  getData(req, res, sendResponse);
};

var optionsHandler = function(req, res){
  sendResponse(res, null);
}

/*-------------HELPERS - PULL OUT TO ANOTHER FILE ------------------------*/

var sendResponse = function(res, data, status){
  status = status || 200;
  res.writeHead(status, defaultCorsHeaders);
  //data = JSON.parse(data);/////
  res.end(JSON.parse(data));
};


var getData = function(req, res, cb){
  var dataString = '';
  var status = 201;

  req.on('data', function(chunk){
    dataString += chunk;
  });

  req.on('end', function(data){
    storage.push(JSON.parse(dataString));
    cb(res, dataString, status);
  });
};

/*--------------------END OF HELPERS ----------------------------------*/

var methods = {
  'GET' : getHandler,
  'POST' : postHandler,
  'OPTIONS' : optionsHandler
};

exports.handleRequest = function(req, res){
  var method = methods[req.method];
  method ? method(req, res) : sendResponse(res, '404: not found', 404);
}



/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-type": "application/json"
};
