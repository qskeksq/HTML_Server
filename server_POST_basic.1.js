var http = require('http');
var u = require('url');
var qs = require('querystring');
var fs = require('fs');
var mime = require('mime');

// Rest Api 요청
// http://localhost:8090/post?filepath=/dir1/xxx.png;

/**
 * 1. URL 분석 : method -> pathname -> query
 * 2. 페이지 라우팅 : html 페이지 readFile로 읽어오기
 * 3. 웹페이지가 html의 src를 자동으로 서버에 요청
 * 4. URL 분석
 * 5. path 분석해서 src 스트림으로 가져오기
 * 6. response에 넣어서 웹페이지에 응답
 */
var server = http.createServer((request, response)=>{
    // 1. URL 분석 : method -> pathname -> query
    // 주소에서 명령어를 먼저 꺼낸다
    var url = u.parse(request.url);
	var path = url.pathname;
    var cmds = path.split('/');

    // 2. 페이지 라우팅 : html 페이지 readFile로 읽어오기
    if(cmds[1] == 'html') { 
        filepath = path.substring(1);
        fs.readFile(filepath, 'utf-8', (err, data)=>{
            if(err){
                response.writeHead(500, {'Content-Type':'text/html'});
                response.end(err);
            } else {
                response.writeHead(200, {'Content-Type':mtype+"; charest=utf8"});
                response.end(data);
            }
        });
    // 3. 웹페이지가 html의 src를 자동으로 서버에 요청
    // 4. URL 분석
    } else if(cmds[1] == 'file'){
        if(request.method == 'POST'){
            // ..body에 넘어온 filepath
        } else if(request.method == 'GET'){
            // 5. path 분석해서 src 자원을 스트림으로 가져오기
            var filepath = path.substring(1);
            var mtype = mime.getType(filepath); // 파일의 mimetype을 알려준다
            // mime type이 동영상이면 straem 처리
            if(mtype == 'video/mp4'){
                // 5.1 stream 생성
                var stream = fs.createReadStream(filepath);
                // 5.2. stream 전송 이벤트 등록 - 데이터 전송을 위한 최소 단위의 데이터가 넘어옴
                var count = 0;
                stream.on('data', (data)=>{
                    console.log('count : '+count++);
                    // 6. response에 넣어서 웹페이지에 응답
                    response.write(data);
                });
                // 5.3. stream 완료 이벤트 등록
                stream.on('end', ()=>{
                    response.end();;
                });
                // 5.4 stream 에러 이벤트 등록
                stream.on('error', (err)=>{
                    console.log(err);
                    response.end(err+"");
                });
            } else {
                fs.readFile(filepath, (err, data)=>{
                    if(err){
                        response.writeHead(500, {'Content-Type':'text/html'});
                        response.end("<h1>404 file not found</h1>");
                    } else {
                        response.writeHead(200, {'Content-Type':mtype})
                        response.end(data);
                    }
                });
            }
        }
    // GET : URL에서 꺼내씀
    // POST : resquest에서 스트림으로 꺼내씀
    } else if(cmds[1] == 'signin'){
        console.log('signin');
        var id = 'root';
        var pw = '12345678';
        // var query = url.query
        // var sign = qs.parse(query);
        var sign = "";
        var postData = "";
        request.on('data', (data)=>{
            postData += data;
        });
        request.on('end', ()=>{
            sign = qs.parse(postData);
            if(sign.id == id && sign.pw == pw){
                console.log("ok");
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end("ok");
            } else {
                console.log("fail");                
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end("fail");
            }
        });
    } else {
        response.writeHead(404, {'Content-Type':'text/html'});
        response.end("<h1> not found</h1>");
    }
});

server.listen(8090, ()=>{
    console.log('server is running');
});

function htmlText(str){
    return "<html><meta charset='utf-8'/><body>서버오류 : "+str+"</body></html>"
}

var sendHttpResult = function(){

}