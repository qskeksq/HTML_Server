// Rest Api 설계
// /서비스/값
// /피보나치/100

// 1. 모듈 import
var http = require('http');
var fibonacci = require('./fibonacci');

// 2. 서버 정의
var server = http.createServer((request, response)=>{
    // 2.1 요청이 들어온 주소체계가 내가 제공하는 api 구조와 일치하는지 확인
    // decodeURIComponent(주소) %20 등의 주소문자를 원래 문자로 변환
    // encodeURIComponent(주소) 주소로 사용할 수 있는 문자열로 변환
    var query = request.url.split('/');
    // 2.2 주소 체계가 잘못 되었다면 알려준다
    if(query.length < 2){
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end('<h1>you are wrong</h1>');
    } else {
        if(query[1] == 'fibonacci'){
            fibonacci.run(()=>{
                response.end('피보나치 완료');
            });
        } else if(query[1] == 'anagram'){

        } else {
            response.writeHead(200, {'Content-Type':'text/html'});
            response.end('<h1>you are wrong</h1>');
        }
    }
});

// 3. 등록
server.listen(8089, ()=>{
    console.log('server is running');
});