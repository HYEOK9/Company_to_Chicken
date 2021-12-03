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

**frontend/src/views/search.vue의 get_store() 아래와 같이 변경**

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
& node main.js
```

-   Compiles and hot-reloads for development

```console
$ cd frontend && npm run serve
```

## **Used APIs**

---

-   KAKAOMAP(https://developers.kakao.com/product/map)
-   상권정보(https://www.data.go.kr/data/15012005/openapi.do)

## **Customize configuration**

---

-   See [Configuration Reference](https://cli.vuejs.org/config/).

## **contact**

---

-   노현욱 rohsik2@gmail.com
-   이재혁 leejaehyuck9@gmail.com
