// credentials.txt 파일안에 encode 되기전 서비스키를 넣으면됨.
const fs = require('fs')
const buffer = fs.readFileSync("./credentials.txt")
const serviceKey = buffer.toString();

var request = require('request');


var url = 'http://apis.data.go.kr/B553077/api/open/sdsc2/storeZoneOne';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + encodeURIComponent(serviceKey); /* Service Key*/
queryParams += '&' + encodeURIComponent('key') + '=' + encodeURIComponent('9174'); /* */
queryParams += '&' + encodeURIComponent('servicekey') + '=' + encodeURIComponent(serviceKey); /* */
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('xml'); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});