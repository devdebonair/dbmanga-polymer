var path = require('path');
module.exports = function(router)
{
	router.route('/')

		.get(function(req, res){
			res.status(200).sendFile(path.join(__dirname, '/../../public/index.html'));
		});
};