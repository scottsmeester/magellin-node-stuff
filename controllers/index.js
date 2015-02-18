var indexController = {
	index: function(req, res) {
		res.render('index');
	}
};

var locationController = {
  location: function(req, res) {
    res.render('location');
  }
};

module.exports = indexController;