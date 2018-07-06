const express = require('express');
const path = require('path');

const igdb = require('igdb-api-node').default;

const client = igdb('356fd165776f7158f97ab77117d2e442');

const app = express();
const port = process.env.PORT || 3001;

// API calls

app.get('/api/igdb/games/filter', (req, res) => {
	console.log('serching', req.query);
	console.log('serching', req.query.name);
	
	client.games({
		filters: {
			'release_dates.date-gt' : req.query.year1+'-12-01',
			'release_dates.date-lt' : req.query.year2+'-01-01'},
		fields: '*', // Return all fields
		limit: 5, // Limit to 5 results
		offset: 0, // Index offset for results
		order: 'release_dates.date:desc',
		search: req.query.name
	}).then(response => {
		res.send(response);
	}).catch(error => {
		throw error;
	});
});
app.get('/api/igdb/games', (req, res) => {
	console.log('serching', req.query);
	console.log('serching', req.query.name);
	
	client.games({
		fields: '*', // Return all fields
		limit: 5, // Limit to 5 results
		offset: 15, // Index offset for results
		search: req.query.name
	}).then(response => {
		res.send(response);
	}).catch(error => {
		throw error;
	});
});

app.get('/api/igdb/platforms', (req, res) => {
	console.log('serching', req.query);
	console.log('serching', req.query.id);
	
	client.platforms({
		fields: '*', // Return all fields
		limit: 5, // Limit to 5 results
		//offset: 15, // Index offset for results
		search: req.query.name
	}).then(response => {
		res.send(response);
	}).catch(error => {
		throw error;
	});
});


app.use(express.static(path.join(__dirname, 'client')));

app.use('/lib', express.static(path.join(__dirname, 'node_modules')));

app.listen(port, () => console.log(`Listening on port ${port}`));

//TODO Cleanup
