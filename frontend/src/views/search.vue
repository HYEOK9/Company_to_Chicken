<template>
    <div id="app">
        <div v-if="!isMobile()">
            <v-app>
                <v-row align="center" justify="center" dense>
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
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-btn
                                                :disabled="dialog"
                                                :loading="dialog"
                                                v-bind="attrs"
                                                v-on="on"
                                                @click="get_store"
                                                >결과확인</v-btn
                                            ><v-dialog
                                                v-model="dialog"
                                                hide-overlay
                                                persistent
                                                width="300"
                                            >
                                                <v-card color="white" dark>
                                                    <v-card-text
                                                        class="text-center"
                                                        ><span
                                                            style="color: black"
                                                        >
                                                            치킨집 차리는 중...
                                                        </span>
                                                        <v-progress-linear
                                                            indeterminate
                                                            color="black"
                                                            class="mb-0"
                                                            height="10"
                                                        ></v-progress-linear>
                                                    </v-card-text>
                                                </v-card>
                                            </v-dialog>
                                        </template>
                                        <template v-slot:default="dialog">
                                            <v-card v-if="show">
                                                <v-toolbar dark
                                                    >이곳에 치킨집을
                                                    차리면...</v-toolbar
                                                >
                                                <v-card-text
                                                    class="text-center"
                                                >
                                                    <div
                                                        style="
                                                            font-size: 1.2rem;
                                                        "
                                                        class="pa-12"
                                                    >
                                                        <br /><br />
                                                        <span
                                                            >위 치 :{{
                                                                result['guname']
                                                            }}</span
                                                        ><br /><br />
                                                        <span
                                                            >근처 치킨집 개수 :
                                                            {{
                                                                result[
                                                                    'n_store'
                                                                ]
                                                            }}개</span
                                                        ><br /><br />
                                                        <span
                                                            >유 동 인 구 :
                                                            {{
                                                                result[
                                                                    'population'
                                                                ]
                                                            }}명</span
                                                        ><br /><br />
                                                        <span
                                                            >점 수 :{{
                                                                (
                                                                    (result[
                                                                        'population'
                                                                    ] /
                                                                        result[
                                                                            'n_store'
                                                                        ] /
                                                                        100) *
                                                                    3.5
                                                                ).toFixed(2)
                                                            }}</span
                                                        >
                                                    </div>
                                                </v-card-text>
                                                <v-card-actions
                                                    class="justify-end"
                                                >
                                                    <v-btn
                                                        text
                                                        @click="
                                                            [
                                                                (dialog.value = false),
                                                                (show = false),
                                                            ]
                                                        "
                                                        >Close</v-btn
                                                    >
                                                </v-card-actions> </v-card
                                            ><v-card v-if="showerr">
                                                <v-toolbar dark
                                                    >이곳에 치킨집을
                                                    차리면...</v-toolbar
                                                >
                                                <v-card-text
                                                    class="text-center"
                                                >
                                                    <div
                                                        style="
                                                            font-size: 1.2rem;
                                                        "
                                                        class="pa-12"
                                                    >
                                                        <br /><br />
                                                        <span
                                                            >여기에 차리면
                                                            안됩니다ㅠㅠ</span
                                                        >
                                                    </div>
                                                </v-card-text>
                                                <v-card-actions
                                                    class="justify-end"
                                                >
                                                    <v-btn
                                                        text
                                                        @click="
                                                            [
                                                                (dialog.value = false),
                                                                (showerr = false),
                                                            ]
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
        <div v-else>
            <v-app>
                <v-row align="center" justify="center" dense
                    ><v-col cols="10" align="center">
                        <div id="mobileMap" @click="clickMap"></div>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center" dense>
                    <v-col cols="8" align="center">
                        <v-row align="center" justify="center"
                            ><span
                                style="
                                    color: white;
                                    font-weight: bold;
                                    font-size: 4vw;
                                "
                                >차리실 곳에 핀을 위치시켜주세요!</span
                            ><br /><br
                        /></v-row>
                        <v-form>
                            <v-row align="center" dense
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
                            <v-row align="center" dense
                                ><v-col>
                                    <v-dialog
                                        transition="dialog-top-transition"
                                        max-width="600"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-btn
                                                :disabled="dialog"
                                                :loading="dialog"
                                                v-bind="attrs"
                                                v-on="on"
                                                @click="get_store"
                                                >결과확인</v-btn
                                            ><v-dialog
                                                v-model="dialog"
                                                hide-overlay
                                                persistent
                                                width="300"
                                            >
                                                <v-card color="white" dark>
                                                    <v-card-text
                                                        class="text-center"
                                                        ><span
                                                            style="color: black"
                                                        >
                                                            치킨집 차리는 중...
                                                        </span>
                                                        <v-progress-linear
                                                            indeterminate
                                                            color="black"
                                                            class="mb-0"
                                                            height="10"
                                                        ></v-progress-linear>
                                                    </v-card-text>
                                                </v-card>
                                            </v-dialog>
                                        </template>
                                        <template v-slot:default="dialog">
                                            <v-card v-if="show">
                                                <v-toolbar dark
                                                    >이곳에 치킨집을
                                                    차리면...</v-toolbar
                                                >
                                                <v-card-text
                                                    class="text-center"
                                                >
                                                    <div
                                                        style="
                                                            font-size: 1.2rem;
                                                        "
                                                        class="pa-12"
                                                    >
                                                        <br /><br />
                                                        <span
                                                            >위 치 :{{
                                                                result['guname']
                                                            }}</span
                                                        ><br /><br />
                                                        <span
                                                            >근처 치킨집 개수 :
                                                            {{
                                                                result[
                                                                    'n_store'
                                                                ]
                                                            }}개</span
                                                        ><br /><br />
                                                        <span
                                                            >유 동 인 구 :
                                                            {{
                                                                result[
                                                                    'population'
                                                                ]
                                                            }}명</span
                                                        ><br /><br />
                                                        <span
                                                            >점 수 :{{
                                                                (
                                                                    (result[
                                                                        'population'
                                                                    ] /
                                                                        result[
                                                                            'n_store'
                                                                        ] /
                                                                        100) *
                                                                    3.5
                                                                ).toFixed(2)
                                                            }}</span
                                                        >
                                                    </div>
                                                </v-card-text>
                                                <v-card-actions
                                                    class="justify-end"
                                                >
                                                    <v-btn
                                                        text
                                                        @click="
                                                            [
                                                                (dialog.value = false),
                                                                (show = false),
                                                            ]
                                                        "
                                                        >Close</v-btn
                                                    >
                                                </v-card-actions> </v-card
                                            ><v-card v-if="showerr">
                                                <v-toolbar dark
                                                    >이곳에 치킨집을
                                                    차리면...</v-toolbar
                                                >
                                                <v-card-text
                                                    class="text-center"
                                                >
                                                    <div
                                                        style="
                                                            font-size: 1.2rem;
                                                        "
                                                        class="pa-12"
                                                    >
                                                        <br /><br />
                                                        <span
                                                            >여기에 차리면
                                                            안됩니다<br />ㅠㅠ</span
                                                        >
                                                    </div>
                                                </v-card-text>
                                                <v-card-actions
                                                    class="justify-end"
                                                >
                                                    <v-btn
                                                        text
                                                        @click="
                                                            [
                                                                (dialog.value = false),
                                                                (showerr = false),
                                                            ]
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
                </v-row></v-app
            >
        </div>
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
            appkey: '',
            lat: 37.5666805,
            lng: 126.9784147,
            keyword: '',
            marker: [],
            result: { guname: '', n_store: 0, population: 0 },
            dialog: false,
            show: false,
            showerr: false,
        };
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            axios.get('http://3.36.188.57:3000/load').then((res) => {
                this.appkey = res.data;
                const script = document.createElement('script');
                script.onload = () => kakao.maps.load(this.initMap);
                script.src =
                    'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=' +
                    this.appkey +
                    '&libraries=services';
                document.head.appendChild(script);
            });
        }
    },
    methods: {
        isMobile() {
            if (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                )
            ) {
                return true;
            } else {
                return false;
            }
        },
        initMap() {
            var container;
            if (this.isMobile()) {
                container = document.getElementById('mobileMap');
            } else {
                container = document.getElementById('map');
            }

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
            this.dialog = true;
            axios
                .get('http://3.36.188.57:3000/' + this.lat + '/' + this.lng)
                .then((response) => {
                    let res = response;
                    this.result['guname'] = res['data'].sgg_nm;
                    this.result['n_store'] = res['data'].n_store;
                    this.result['population'] = res['data'].population;
                    console.log(response);
                    if (this.result['n_store'] != 0) {
                        this.dialog = false;
                        this.show = true;
                    } else {
                        this.dialog = false;
                        this.showerr = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert('Invalid request');
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
#mobileMap {
    width: 80vw;
    height: 50vh;
    border-radius: 3rem;
}
</style>
