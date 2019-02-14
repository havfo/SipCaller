module.exports =
{
	domain : 'localhost',
	tls    :
	{
		cert : `${__dirname}/certs/localhost.cert.pem`,
		key  : `${__dirname}/certs/localhost.key.pem`
	},
	// Listening port for https server.
	listeningPort : 443,
	// Any http request is redirected to https.
	// Listening port for http server. 
	listeningRedirectPort : 80
};
