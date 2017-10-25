var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer((request, response)=>{
   var parsedurl = url.parse(request.url);
   var pathname = parsedurl.path;
   console.log(pathname);
   
   //           파일 경로               인코딩     콜백함수
   fs.readFile(pathname.substring(1), 'utf-8', (err, data)=>{
       response.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
       var text = "";
        if(err) {
            text = htmlText(err);
        } else {
            text = data;
        }
        response.end(text);
   });

});

server.listen(8090, ()=>{
    console.log('server is running');
});

function htmlText(str){
    return "<html><meta charset='utf-8'/><body>서버오류 : "+str+"</body></html>"
}