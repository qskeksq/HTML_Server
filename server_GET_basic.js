var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');

var server = http.createServer((request, response)=>{
    console.log(request);    
    if(request.method == 'GET'){
        /**
         * 1. path : 전체 경로
         * 2. pathName : 쿼리스트링 제외 path
         * 3. query : ? 부분
         */
        // 1. request의 url을 객체로 만들어준다
        var parsedUrl = url.parse(request.url);
        console.log(parsedUrl);
        // 2. url객체에서 쿼리 부분을 꺼낸 후 다시 객체로 만들어준다.
        var querystring = qs.parse(parsedUrl.query); 
        console.log(querystring);
        // 모두 객체로 넘어오기 때문에 값을 .로 꺼낼 수 있다.
        console.log('aaa = '+querystring.aaa);
        response.end();
    } else if(request.method == 'POST'){
        
    }
    
});

server.listen(8090, ()=>{
    console.log('server is running');
});






/**
 * 1. 자바스크립트 클래스
 * 2. 자바스크립트 오브젝트
 * 3. 자바스크립트 함수/메소드
 */
// javaScript object : 비슷하게 속성과 메소드드로 나뉜다.
var request = {
    // 속성
    one : 157,
    two : 'hello',
    three : 5,
    // 메소드
    sum : function(a, b){
        return a+b;
    }
}

console.log(request.one);
console.log(request.two);
console.log(request.sum);
console.log(request.sum(1,2));

