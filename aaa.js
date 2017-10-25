1. 변수의 선언 : var 변수명
2. 콘솔에 로그 출력
3. 반복문
4. 조건문
5. 문자열 기본연산
6. 함수 사용하기
    - 함수에 리턴 타입이 없다. 
    - 문장 내부에 리턴 값이 있으면 return 해주면 됨
    - 사용1 : function sum(param1, param2){};
    - 사용2 : var sum = function(param1, param2){};
7. class 사용하기
function Num(param1, param2) {
    var a = 0; // private
    this.b = 10; // public 

    // 외부에서 내부의 함수에 접근할 경우
    this.c = function(param1, param2){

    }
}

var num = new Num("hello", 100);
num.b = 100;
num.c(100, 200);