const fs = require('fs');
const buffer = fs.readFileSync('./credentials.txt');
const temp_str = buffer.toString().split('\n');
const serviceKey = temp_str[0];
const sgis_key = temp_str[1];
const sgis_secretKey = temp_str[2];
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
// var path = require('path');
// var router = express.Router();
// axios 사용해서 훨씬 보기좋게 다시만들기.
app.use(cors());
app.options('*', cors());

app.get('/:lat/:long', async (req, res) => {
    let result = {};
    try {
        result = await get_n_store(req.params.lat, req.params.long);
        console.log(result);
        res.send(result);
    } catch {
        result['signguNm'] = 'error';
        result['n_store'] = 0;
        result['sgg_nm'] = 'error';
        result['population'] = 0;
        result['processing_time'] = 99999;
        res.send(result);
    }
});

// function : get code of address with latitude, longitude
// param : float -> lat, float -> long
// 반경 100미터 이내에 아무 상점을 가져오고, 거기서 정보를 추출함.
// 지역명(좌표기준) signguNm
// 치킨집 개수     n_store
// 지역명(인구기준) sgg_nm
// population   population
async function get_n_store(lat, long) {
    const start = new Date();
    console.log('start sending...');
    const result = {};
    function encode(params) {
        let result = '';
        let first = true;
        for (const [key, value] of Object.entries(params)) {
            if (first) {
                result += '?';
                first = false;
            } else result += '&';
            result += encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }
        return result;
    }

    // get token from kostat to connect
    const token_url =
        'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json';
    let token_params =
        '?' + encodeURIComponent('consumer_key') + '=' + sgis_key;
    token_params +=
        '&' + encodeURIComponent('consumer_secret') + '=' + sgis_secretKey;
    const token_result = await axios.get(token_url + token_params);
    const access_token = token_result.data['result']['accessToken'];

    // get translated posX posY
    const translate_url =
        'https://sgisapi.kostat.go.kr/OpenAPI3/transformation/transcoord.json';
    const translate_param = encode({
        accessToken: decodeURIComponent(access_token),
        src: '4326',
        dst: '5179',
        posX: long.toString(),
        posY: lat.toString(),
    });
    const translate_result = await axios.get(translate_url + translate_param);
    const posX = translate_result.data['result']['posX'];
    const posY = translate_result.data['result']['posY'];

    // using translated pos get address code
    const addr_url =
        'https://sgisapi.kostat.go.kr/OpenAPI3/personal/findcodeinsmallarea.json';
    let addr_param =
        '?' + encodeURIComponent('accessToken') + '=' + access_token;
    addr_param +=
        '&' + encodeURIComponent('x_coor') + '=' + encodeURIComponent(posX);
    addr_param +=
        '&' + encodeURIComponent('y_coor') + '=' + encodeURIComponent(posY);
    const addr_result = await axios.get(addr_url + addr_param);
    const sgg_nm = addr_result.data['result']['sgg_nm'];
    const sgg_cd = addr_result.data['result']['sgg_cd'];
    const sido_nm = addr_result.data['result']['sido_nm'];
    const sido_cd = addr_result.data['result']['sido_cd'];

    // using address code get population
    const pop_url =
        'https://sgisapi.kostat.go.kr/OpenAPI3/stats/population.json';
    const pop_param = encode({
        accessToken: access_token,
        year: '2020',
        adm_cd: sido_cd + sgg_cd,
        low_search: '0',
    });
    const pop_result = await axios.get(pop_url + pop_param);
    const population = pop_result.data['result'][0]['tot_ppltn'];
    // conver lat, long to address
    const url =
        'http://apis.data.go.kr/B553077/api/open/sdsc2/storeZoneInRadius';
    const queryParams = encode({
        serviceKey: decodeURIComponent(serviceKey),
        radius: '2000',
        cx: long.toString(),
        cy: lat.toString(),
        type: 'json',
    });
    const store = await axios.get(url + queryParams);
    let signguCd = store.data['body']['items'][0]['signguCd'];
    let signguNm = store.data['body']['items'][0]['signguNm'];

    for (const temp in store.data['body']['items']) {
        if (store.data['body']['items'][temp]['signguNm'] == sgg_nm) {
            signguNm = sgg_nm;
            signguCd = store.data['body']['items'][temp]['signguCd'];
            console.log('profit');
            break;
        }
    }
    console.log(signguCd, signguNm);
    // with store_class_code and address
    // get number of store_class_code store
    // this api is really slow... TODO : making database for improve speed of this step
    const class_code = 'Q05A08';
    const url2 =
        'http://apis.data.go.kr/B553077/api/open/sdsc2/storeListInDong';
    const queryParams2 = encode({
        serviceKey: decodeURIComponent(serviceKey),
        pageNo: '1',
        numOfRows: '1',
        divId: 'signguCd',
        key: signguCd,
        indsLclsCd: class_code.slice(0, 1),
        indsMclsCd: class_code.slice(0, 3),
        indsSclsCd: class_code,
        type: 'json',
    });
    const n_store_result = await axios.get(url2 + queryParams2);
    const n_store = n_store_result.data['body']['totalCount'];
    console.log(n_store);
    result['signguNm'] = signguNm;
    result['n_store'] = n_store;
    result['sgg_nm'] = sgg_nm;
    result['population'] = population;
    const end = new Date();

    result['processing_time'] = end - start;
    return result;
}

app.listen(3000, () => {
    console.log('Server listening on : htp://localost:3000');
});

// router.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/frontend/public', 'index.html'));
// });
