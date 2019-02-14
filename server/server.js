#!/usr/bin/env node

'use strict';

process.title = 'sipcaller-server';

const config = require('./config');
const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
const compression = require('compression');
const Logger = require('./lib/Logger');

/* eslint-disable no-console */
console.log('- process.env.DEBUG:', process.env.DEBUG);
/* eslint-enable no-console */

const logger = new Logger();

// TLS server configuration.
const tls =
{
	cert : fs.readFileSync(config.tls.cert),
	key  : fs.readFileSync(config.tls.key)
};

const app = express();

app.use(compression());

app.all('*', (req, res, next) =>
{
	if(req.secure)
	{
		return next();
	}

	res.redirect('https://' + req.hostname + req.url);
});

// Serve all files in the public folder as static files.
app.use(express.static('public'));

app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

const httpsServer = https.createServer(tls, app);

httpsServer.listen(config.listeningPort, '0.0.0.0', () =>
{
	logger.info('Server running on port: ', config.listeningPort);
});

const httpServer = http.createServer(app);

httpServer.listen(config.listeningRedirectPort, '0.0.0.0', () =>
{
	logger.info('Server redirecting port: ', config.listeningRedirectPort);
});
