function index(req, res) {
	res.json({
		message: 'Welcome to tunesly!',
		documentation_url: 'https://github.com/SherifIsmail01/tunesly',
		base_url: 'localhost:3000',
		endpoints: [
			{
				method: 'GET', path: '/api', description: 'Describes available endpoints'
			}
		]
	});
}

module.exports = {
	index: index
}
