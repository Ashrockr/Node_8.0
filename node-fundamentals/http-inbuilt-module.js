const http = require('http');

//request : HTTP Request readable stream
//response : HTTP Response writable stream

var cws = http.createServer((request,response)=>{
    //console.log(response.socket.remoteAddress); //To get the remote address
    if(request.url == '/home'){
        response.write("<h1>Welcome to Home Page</h1>");
        response.end();//Closing the stream
    }
    else{
        response.write("<h1>Welcome to CWS</h1>");
        response.end();//Closing the stream
    }
});

cws.listen(3000,()=>{
    console.log('Web server listening on port 3000 at localhost. Press CTRL + C to stop the server');
});