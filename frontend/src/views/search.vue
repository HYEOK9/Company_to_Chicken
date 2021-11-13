<template>
    <div id="app">
        <v-app>
            <v-row align="center" justify="center">
                <v-col cols="1"></v-col>
                <v-col cols="4" align="center">
                    <v-row align="center" justify="center"
                        ><span
                            style="
                                color: white;
                                font-weight: bold;
                                font-size: 1.3rem;
                            "
                            >차리실 곳에 핀을 위치시켜주세요!</span
                        ><br /><br
                    /></v-row>
                    <v-form>
                        <v-row align="center"
                            ><v-col>
                                <v-text-field
                                    @keydown.enter.prevent="searchPlace"
                                    v-model="keyword"
                                    rounded
                                    height="10vh"
                                    background-color="white"
                                    label="지역 검색"
                                    dense
                                ></v-text-field></v-col
                        ></v-row>
                        <v-row align="center"
                            ><v-col>
                                <v-dialog
                                    transition="dialog-top-transition"
                                    max-width="600"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on"
                                            >결과확인</v-btn
                                        >
                                    </template>
                                    <template v-slot:default="dialog">
                                        <v-card>
                                            <v-toolbar dark
                                                >이곳에 치킨집을
                                                차리면...</v-toolbar
                                            >
                                            <v-card-text>
                                                <div class="pa-12">
                                                    <span>위도:{{ lat }}</span
                                                    ><br />
                                                    <span>경도:{{ lng }}</span>
                                                </div>
                                            </v-card-text>
                                            <v-card-actions class="justify-end">
                                                <v-btn
                                                    text
                                                    @click="
                                                        dialog.value = false
                                                    "
                                                    >Close</v-btn
                                                >
                                            </v-card-actions>
                                        </v-card>
                                    </template>
                                </v-dialog></v-col
                            ></v-row
                        ></v-form
                    ></v-col
                >
                <v-col cols="6" align="center">
                    <div id="map" @click="clickMap"></div>
                </v-col> </v-row
        ></v-app>
    </div>
</template>
<script>
export default {
    name: 'search',
    components: {},
    data() {
        return {
            map: null,
            appkey: 'b538a1ec39e03ceb8d52b0d35bc01656',
            lat: 37.5666805,
            lng: 126.9784147,
            keyword: '',
            marker: [],
        };
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement('script');
            script.onload = () => kakao.maps.load(this.initMap);
            script.src =
                'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=' +
                this.appkey +
                '&libraries=services';
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
                position: map.getCenter(),
            });
            marker.setMap(map);
            this.marker = marker;
        },
        clickMap() {
            let map = this.map;
            let marker = this.marker;
            let base = this;

            kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                var latlng = mouseEvent.latLng;

                marker.setPosition(latlng);

                base.lat = latlng.getLat();
                base.lng = latlng.getLng();
            });
        },
        searchPlace() {
            let map = this.map;
            let ps = new kakao.maps.services.Places();

            ps.keywordSearch(this.keyword, placesSearchCB);
            let base = this;
            function placesSearchCB(data, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var bounds = new kakao.maps.LatLngBounds();
                    base.lat = data[0].y;
                    base.lng = data[0].x;
                    for (var i = 0; i < data.length; i++) {
                        displayMarker(data[0]);
                        bounds.extend(
                            new kakao.maps.LatLng(data[0].y, data[0].x)
                        );
                    }

                    map.setBounds(bounds);
                } else {
                    alert('Invalid input');
                }
            }
            function displayMarker(place) {
                base.marker.setMap(null);

                let marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(place.y, place.x),
                });
                base.marker = marker;
            }
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
