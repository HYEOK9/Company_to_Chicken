<template>
    <div id="app">
        <v-app>
            <v-row align="center" justify="center">
                <v-col cols="4" align="center" align-self="center">
                    <v-form>
                        <v-row align="center"
                            ><v-col>
                                <v-text-field
                                    v-model="keyword"
                                    rounded
                                    height="10vh"
                                    background-color="white"
                                    label="지역 검색"
                                    dense
                                ></v-text-field></v-col
                        ></v-row>
                        <v-row align="center"
                            ><v-col
                                ><v-btn to="/search/result"
                                    >결과확인</v-btn
                                ></v-col
                            ></v-row
                        ></v-form
                    ></v-col
                ><v-col cols="1" align-self="center"
                    ><v-btn elevation="2" @click="searchPlace"
                        >검색</v-btn
                    ></v-col
                >
                <v-col cols="5">
                    <div id="map" @click="clickMap"></div>
                </v-col> </v-row
        ></v-app>
    </div>
</template>
<script>
export default {
    name: 'search',
    data() {
        return {
            map: null,
            appkey: 'be47c3ecdef469dbffe0caa036397774',
            lat: 0,
            lng: 0,
            keyword: '',
        };
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement('script');
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src =
                'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=' +
                this.appkey +
                '&libaries=services';
            document.head.appendChild(script);
        }
    },
    methods: {
        initMap() {
            var container = document.getElementById('map');
            var options = {
                center: new kakao.maps.LatLng(37.5666805, 126.9784147),
                level: 5,
            };
            var map = new kakao.maps.Map(container, options);
            this.map = map;

            var marker = new kakao.maps.Marker({
                // 지도 중심좌표에 마커를 생성합니다
                position: map.getCenter(),
            });
            // 지도에 마커를 표시합니다
            marker.setMap(map);

            // 지도에 클릭 이벤트를 등록합니다
            // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
            let base = this;
            kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                // 클릭한 위도, 경도 정보를 가져옵니다
                var latlng = mouseEvent.latLng;

                // 마커 위치를 클릭한 위치로 옮깁니다
                marker.setPosition(latlng);

                base.lat = latlng.getLat();
                base.lng = latlng.getLng();
            });
        },
    },
};
</script>
<style scoped>
#app {
    height: 100vh;
    background: url('../assets/backimage.jpg') no-repeat center center fixed;
    background-size: cover;
}
#map {
    width: 40vw;
    height: 80vh;
    border-radius: 3rem;
}
</style>
