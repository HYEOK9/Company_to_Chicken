# **Description**

## 오늘 회사 때려칩니다 \^o^

프로그래머의 끝은 치킨집 사장입니다.  
어디에 차릴지 모르시겠다구요?  
당신의 위치를 기반으로 그 지역의 상권을 알려드립니다.  
http://comtochi.site/

## **Built with**

---

-   FrontEnd
    -   [Vue.js](https://vuejs.org/)
    -   [Vuetify](https://vuetifyjs.com/en/)
    -   JS
-   BackEnd
    -   [Node.js](https://nodejs.org/en/)

## **Test in local**

---

**credentials.txt 파일을 다음과 같이 작성(main.js 와 같은 경로)**

```
1번라인 : <https://www.data.go.kr/iim/api/selectApiKeyList.do>에서 받은 키를 작성
2번라인 : <https://sgis.kostat.go.kr/developer/html/openApi/app/myApp.html>에서 받은 서비스 ID 작성
3번라인 : <https://sgis.kostat.go.kr/developer/html/openApi/app/myApp.html>에서 받은 보안Key 작성
```

**kakaokey.txt 파일 생성 후 다음과 같이 작성(main.js 와 같은 경로)**  
([kakao developer](https://developers.kakao.com/console/app)에서 키 발급받은 후)

```
발급받은 JavaScript키
```

**frontend/src/views/search.vue의 mounted()내 요청 url을 아래와 같이 변경**

```javascript
mounted() {
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            axios.get('http://127.0.0.1:3000/load').then((res) => {
                this.appkey = res.data;
                            .
                            .
                            .
```

**frontend/src/views/search.vue의 get_store()내 요청 url을 아래와 같이 변경**

```javascript
 async get_store() {
            this.dialog = true;
            axios
                .get('http://127.0.0.1:3000/' + this.lat + '/' + this.lng)
                .then((response) => {
                            .
                            .
                            .
```

**Project setup**

```console
$ npm install
```

```console
$ cd frontend && npm install
```

```console
$ cd ..
```

**open main.js**

```console
$ node main.js
```

**Run in local**

```console
$ cd frontend && npm run serve
```

## **Used APIs**

---

-   KAKAOMAP(https://developers.kakao.com/product/map)
-   상권정보(https://www.data.go.kr/data/15012005/openapi.do)
-   인구정보(https://sgis.kostat.go.kr/developer/html/openApi/api/intro.html)

## **Customize configuration**

---

-   See [Configuration Reference](https://cli.vuejs.org/config/).

## **contact**

---

-   노현욱 rohsik2@gmail.com
-   이재혁 leejaehyuck9@gmail.com
