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
                                    @keydown.enter.prevent="searchANDget_store"
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
                                        <v-btn
                                            :disabled="dialog"
                                            :loading="dialog"
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="
                                                [get_store(), (dialog = true)]
                                            "
                                            >결과확인</v-btn
                                        ><v-dialog
                                            v-model="dialog"
                                            hide-overlay
                                            persistent
                                            width="300"
                                        >
                                            <v-card color="black" dark>
                                                <v-card-text
                                                    class="text-center"
                                                >
                                                    치킨집 차리는 중...
                                                    <v-progress-linear
                                                        indeterminate
                                                        color="white"
                                                        class="mb-0"
                                                    ></v-progress-linear>
                                                </v-card-text>
                                            </v-card>
                                        </v-dialog>
                                    </template>
                                    <template
                                        v-if="show"
                                        v-slot:default="dialog"
                                    >
                                        <v-card>
                                            <v-toolbar dark
                                                >이곳에 치킨집을
                                                차리면...</v-toolbar
                                            >
                                            <v-card-text class="text-center">
                                                <div
                                                    style="font-size: 1.2rem"
                                                    class="pa-12"
                                                >
                                                    <br /><br />
                                                    <span
                                                        >위치 :{{
                                                            guname
                                                        }}</span
                                                    ><br /><br />
                                                    <span
                                                        >근처 치킨집 개수 :
                                                        {{ n_store }}개</span
                                                    ><br /><br />
                                                    <span
                                                        >유동인구 :
                                                        {{ population }}명</span
                                                    >
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
import axios from 'axios';
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
            result: {},
            guname: '',
            n_store: 0,
            population: 0,
            dialog: false,
            show: false,
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
        async get_store() {
            axios
                .get('/' + this.lat + '/' + this.lng)
                .then((response) => {
                    this.result = response;
                    this.guname = this.result['data'].sgg_nm;
                    this.n_store = this.result['data'].n_store;
                    this.population = this.result['data'].population;
                    console.log(response);
                })
                .catch((error) => console.log(error));
        },
        searchANDget_store() {
            this.searchPlace();
            this.get_store();
        },
    },
    watch: {
        dialog(val) {
            if (!val) return;
            setTimeout(() => {
                this.dialog = false;
                this.show = true;
            }, 3000);
            this.show = false;
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
