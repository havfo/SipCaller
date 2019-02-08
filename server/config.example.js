module.exports =
{
	// Listening hostname for `gulp live|open`.
	domain : 'localhost',
	tls    :
	{
		cert : `${__dirname}/certs/mediasoup-demo.localhost.cert.pem`,
		key  : `${__dirname}/certs/mediasoup-demo.localhost.key.pem`
	},
	// Listening port for https server.
	listeningPort : 443,
	// Any http request is redirected to https.
	// Listening port for http server. 
	listeningRedirectPort : 80
};
