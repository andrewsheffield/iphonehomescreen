var express = require('express');
var router = express.Router();
var https = require('https');

//Takes and object or array and searches for the key 'item'
function emailSearch(obj) {
	if (obj.email) return obj.email;
	for (var key in obj) {
		if (typeof obj[key] == 'object' && obj[key] != null) {
			var result = emailSearch(obj[key]);
			if (result) return result;
		}
	}
	return null;
}

function gitHubConnect(user, cb) {
	var options = {
		method: 'GET',
		host: 'api.github.com',
		path: '/users/' + user + '/events/public',
		headers: {
	    'Content-Type': 'application/x-www-form-urlencoded',
	    'User-Agent': 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0'
	  }
	}
	var gitReq = https.get(options, function(response) {
		var body = '';
		response.on('data', function(d) {
			body += d;
		});
		response.on('end', function() {
			var email, result, parsed;
			result = {
				user: user
			}
			parsed = JSON.parse(body);
			if (typeof parsed == 'object') {
				email = emailSearch(parsed);
				result.email = email;
			} else {
				result.email = null;
			}
			cb(result);
		});
	});
	gitReq.end();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get email for user */
router.get('/email/:user', function(req, res, next) {
	var user = req.params.user;
	gitHubConnect(user, function(result) {
		res.json(result);
	});
});

module.exports = router;