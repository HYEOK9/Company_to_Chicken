const fs = require('fs')
const axios = require('axios')
const request = require('request');
buffer = fs.readFileSync("./credentials.txt")
var temp_str = buffer.toString().split('\n')
const serviceKey = temp_str[0]
const sgis_serviceKey = temp_str[1]
const sgis_secretKey = temp_str[2]
console.log(encodeURIComponent(sgis_secretKey), encodeURIComponent(sgis_serviceKey))

var url = 'http://apis.data.go.kr/B553077/api/open/sdsc2/smallUpjongList';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey; /* Service Key*/
queryParams += '&' + encodeURIComponent('indsLclsCd') + '=' + encodeURIComponent('Q'); /* */
queryParams += '&' + encodeURIComponent('indsMclsCd') + '=' + encodeURIComponent('Q05'); /* */
queryParams += '&' + encodeURIComponent('servicekey') + '=' + serviceKey; /* */

function encode(params){
    var result = ""
    var first = true
    for(const [key, value] of Object.entries(params)){
        if(first) {
            result += '?'
            first = false
        }
        else result += '&'
        result += encodeURIComponent(key) + '=' + encodeURIComponent(value)
    }
    return result
}
var long = 127.0341520931991
var lat = 37.50734709009723

var queryParams = encode({
    'serviceKey':decodeURIComponent(serviceKey),
    'pageNo':'1',
    'radius':'100',
    'cx':long.toString(),
    'cy':lat.toString(),
    'type':'json'
})
//get()

async function get(){
    var url = 'http://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRadius';
    var queryParams = encode({
        'serviceKey':decodeURIComponent(serviceKey),
        'pageNo':'1',
        'radius':'100',
        'cx':long.toString(),
        'cy':lat.toString(),
        'type':'json'
    })
    var store = await axios.get(url + queryParams)
    store = store.data['body']['items'][0]
    var sgnguCd = store['signguCd']
    var sgnguNm = store['signguNm']
    console.log(sgnguCd, sgnguNm)
}
get()