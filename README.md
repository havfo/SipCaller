# SipCaller

A SIP user agent implemented in React/Redux/Material-ui, using [sip.js](https://sipjs.com/).

Try it online at https://ringmeg.uninett.no.

## Build & run locally

Build app.

    cd app/

Web `app` has own detailed README for development.

    npm install
    
    npm run build
    
 Copy `build` folder content to ../server/public/   
 
 Now build server.
 
     cd ../server
     
     npm install
     
     
     
 Generate certificate in `certs` folder
 
     openssl req -x509 -newkey rsa:4096 -keyout localhost.key.pem -out localhost.cert.pem -days 365
 
 (or check other options at https://letsencrypt.org/docs/certificates-for-localhost/ 
 or https://stackoverflow.com/questions/9519707/can-nodejs-generate-ssl-certificates )
 
 Configure: copy `config.example.js` into `config.js`,  
 adjust file name for certificate and key.
 
 Run server. (You may need add `sudo` on Ubuntu 18.04, that has by default lower ports as privileged )
 
     sudo node server
 
 
