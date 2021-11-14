//credentials.txt 파일안에 encode 되기전 서비스키를 넣으면됨. 해당 파일을 올리지 않았음
const fs = require('fs');
const buffer = fs.readFileSync('./credentials.txt');
var temp_str = buffer.toString().split('\n');
const serviceKey = temp_str[0];
const sgis_key = temp_str[1];
const sgis_secretKey = temp_str[2];
const express = require('express');
const app = express();
const axios = require('axios');

//axios 사용해서 훨씬 보기좋게 다시만들기.

app.get('/:lat/:long', async (req, res) => {
    var result = await get_n_store(req.params.lat, req.params.long);
    console.log(result);
    res.send(result);
});

function encode(params) {
    var result = '';
    var first = true;
    for (const [key, value] of Object.entries(params)) {
        if (first) {
            result += '?';
            first = false;
        } else result += '&';
        result += encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }
    return result;
}

// function : get code of address with lat, long
// param : float -> lat, float -> long
// 반경 100미터 이내에 아무 상점을 가져오고, 거기서 정보를 추출함.
// 지역명(좌표기준) signguNm
// 치킨집 개수     n_store
// 지역명(인구기준) sgg_nm
// population   population
async function get_n_store(lat, long) {
    var result = {};

    // conver lat, long to address
    var url = 'http://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRadius';
    var queryParams = encode({
        serviceKey: decodeURIComponent(serviceKey),
        pageNo: '1',
        radius: '100',
        cx: long.toString(),
        cy: lat.toString(),
        type: 'json',
    });

    var store = await axios.get(url + queryParams);
    store = store.data['body']['items'][0];
    var signguCd = store['signguCd'];
    var signguNm = store['signguNm'];
    //console.log(signguCd, signguNm)
    //with store_class_code and address
    // get number of store_class_code store
    var class_code = 'Q05A08';
    var url2 = 'http://apis.data.go.kr/B553077/api/open/sdsc2/storeListInDong';
    var queryParams2 = encode({
        serviceKey: decodeURIComponent(serviceKey),
        pageNo: '1',
        numOfRows: '10',
        divId: 'signguCd',
        key: signguCd,
        indsLclsCd: class_code.slice(0, 1),
        indsMclsCd: class_code.slice(0, 3),
        indsSclsCd: class_code,
        type: 'json',
    });
    var n_store_result = await axios.get(url2 + queryParams2);
    var n_store = n_store_result.data['body']['totalCount'];
    //console.log(n_store)

    //get token from kostat to connect
    var token_url =
        'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json';
    var token_params =
        '?' + encodeURIComponent('consumer_key') + '=' + sgis_key;
    token_params +=
        '&' + encodeURIComponent('consumer_secret') + '=' + sgis_secretKey;
    var token_result = await axios.get(token_url + token_params);
    var access_token = token_result.data['result']['accessToken'];

    //get translated posX posY
    var translate_url =
        'https://sgisapi.kostat.go.kr/OpenAPI3/transformation/transcoord.json';
    var translate_param = encode({
        accessToken: decodeURIComponent(access_token),
        src: '4326',
        dst: '5179',
        posX: long.toString(),
        posY: lat.toString(),
    });
    var translate_result = await axios.get(translate_url + translate_param);
    var posX = translate_result.data['result']['posX'];
    var posY = translate_result.data['result']['posY'];

    //using translated pos get address code
    var addr_url =
        'https://sgisapi.kostat.go.kr/OpenAPI3/personal/findcodeinsmallarea.json';
    var addr_param =
        '?' + encodeURIComponent('accessToken') + '=' + access_token;
    addr_param +=
        '&' + encodeURIComponent('x_coor') + '=' + encodeURIComponent(posX);
    addr_param +=
        '&' + encodeURIComponent('y_coor') + '=' + encodeURIComponent(posY);
    var addr_result = await axios.get(addr_url + addr_param);
    var sgg_nm = addr_result.data['result']['sgg_nm'];
    var sgg_cd = addr_result.data['result']['sgg_cd'];
    var sido_nm = addr_result.data['result']['sido_nm'];
    var sido_cd = addr_result.data['result']['sido_cd'];

    //using address code get population
    var pop_url = 'https://sgisapi.kostat.go.kr/OpenAPI3/stats/population.json';
    var pop_param = encode({
        accessToken: access_token,
        year: '2020',
        adm_cd: sido_cd + sgg_cd,
        low_search: '0',
    });
    var pop_result = await axios.get(pop_url + pop_param);
    var population = pop_result.data['result'][0]['tot_ppltn'];
    // console.log('지역명(좌표기준)', signguNm)
    // console.log('치킨집 개수', n_store)
    // console.log('지역명(인구기준)', sgg_nm)
    // console.log('population', population)
    result['signguNm'] = signguNm;
    result['n_store'] = n_store;
    result['sgg_nm'] = sgg_nm;
    result['population'] = population;
    return result;
}

async function get() {
    var result = await get_n_store(37.5559412279911, 126.924263894094);
    console.log(result);
}
get();
