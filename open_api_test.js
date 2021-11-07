//credentials.txt 파일안에 encode 되기전 서비스키를 넣으면됨. 해당 파일을 올리지 않았음.
const fs = require('fs')
const buffer = fs.readFileSync("./credentials.txt")
const serviceKey = buffer.toString();

function test(){
    //
    var request = require('request');
    var url = 'http://apis.data.go.kr/B553077/api/open/sdsc2/storeZoneOne';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + encodeURIComponent(serviceKey); /* Service Key*/
    queryParams += '&' + encodeURIComponent('key') + '=' + encodeURIComponent('9174'); /* */
    queryParams += '&' + encodeURIComponent('servicekey') + '=' + encodeURIComponent(serviceKey); /* */
    queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /* */

    request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        console.log('Status', response.statusCode);
        console.log('Headers', JSON.stringify(response.headers));
        console.log('Reponse received', body);
    });
    var received ={
        "header" : {
                "description" : "소상공인시장진흥공단 주요상권"
                ,"columns" : ["상권번호","상권명","시도코드","시도명","시군구코드","시군구명","상권면적","좌표개수","좌표값","데이터기준일자"]
                ,"resultCode" : "00"
                ,"resultMsg" : "NORMAL SERVICE"
        },
        "body" : {
                        "items" : [
                                {
                                "trarNo" : 9174
                                ,"mainTrarNm" : "인사동"
                                ,"ctprvnCd" : "11"
                                ,"ctprvnNm" : "서울특별시"
                                ,"signguCd" : "11110"
                                ,"signguNm" : "종로구"
                                ,"trarArea" : 226875
                                ,"coordNum" : 21
                                ,"coords" : "MULTIPOLYGON (((126.986059148338 37.5765234907315, 126.985943099285 37.5765933022497, 126.985003595935 37.5761584486461, 126.984321612825 37.5758475109755, 126.983682074805 37.5755861301059, 126.983073659879 37.5753743049793, 126.983019911215 37.5752819452711, 126.982977487921 37.5751693150508, 126.983105316596 37.573220945966, 126.983179233794 37.5718334337701, 126.983151246104 37.5705540242774, 126.983270142803 37.5703828545296, 126.983428633426 37.5703107995486, 126.985822713216 37.5702976242875, 126.98744706053 37.5703113418908, 126.987429831033 37.571653814357, 126.987588062984 37.5729782873447, 126.987372867362 37.5736044495484, 126.986789692656 37.5745999719345, 126.986195066917 37.5761631127724, 126.986059148338 37.5765234907315)))"
                                ,"stdrDt" : "2021-06-30"
                                }
                        ]
        }
    }
    console.log(received['body']['items'])
    // request 시간이 꽤 오래 걸리기는 함 이유가 뭘까요....
}

function test2(){
    var request = require('request');

    var url = 'http://apis.data.go.kr/B553077/api/open/sdsc2/largeUpjongList';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey; /* Service Key*/
    queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('xml'); /* */

    request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        console.log('Status', response.statusCode);
        console.log('Headers', JSON.stringify(response.headers));
        console.log('Reponse received', body);
    });
}

function test3(){
    var request = require('request');
    var url = 'http://apis.data.go.kr/B553077/api/open/sdsc2/middleUpjongList';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey; /* Service Key*/
    queryParams += '&' + encodeURIComponent('servicekey') + '=' + serviceKey; /* */
    queryParams += '&' + encodeURIComponent('indsLclsCd') + '=' + encodeURIComponent('Q'); /* */

    request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        console.log('Status', response.statusCode);
        console.log('Headers', JSON.stringify(response.headers));
        console.log('Reponse received', body);
    });
}

function test4(){
    var request = require('request');

    var url = 'http://apis.data.go.kr/B553077/api/open/sdsc2/smallUpjongList';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey; /* Service Key*/
    queryParams += '&' + encodeURIComponent('indsLclsCd') + '=' + encodeURIComponent('Q'); /* */
    queryParams += '&' + encodeURIComponent('indsMclsCd') + '=' + encodeURIComponent('Q05'); /* */
    queryParams += '&' + encodeURIComponent('servicekey') + '=' + serviceKey; /* */

    request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        console.log('Status', response.statusCode);
        console.log('Headers', JSON.stringify(response.headers));
        console.log('Reponse received', body);
    });
}
//Q05A08
test4()