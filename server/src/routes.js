const express = require('express');
const unhandledExceptionsHandler = require('./unhandled-exception-handler');
const dal = require('./dal');

const productsRouter = express.Router();
productsRouter
	.get('/comments', unhandledExceptionsHandler(async (req, res) => {
		const records = await dal.getComments();
		res.json(records);
	}))
	.post('/comments', unhandledExceptionsHandler(async (req, res) => {
		const validateEmail = email =>
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email.toLowerCase()
			);
		const {email, message} = req.body;
		if (!message || !email) {
			res.status(400).send('All fields are required');
		} else if (!validateEmail(email)) {
			res.status(400).send('Invalid email');
		} else {
			const {insertedId} = await dal.insertComment(req.body);
			res.send(insertedId);
		}
	}));

module.exports = productsRouter;
