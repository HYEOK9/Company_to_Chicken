<template>
    <div id="app">
        <v-app> ></v-app>
    </div>
</template>
<script>
export default {
    name: 'search',
    data() {
        return {
            regions: [
                { name: '강남구', value: 1 },
                { name: '강동구', value: 2 },
                { name: '강북구', value: 3 },
                { name: '강서구', value: 4 },
                { name: '관악구', value: 5 },
                { name: '광진구', value: 6 },
                { name: '구로구', value: 7 },
                { name: '금천구', value: 8 },
                { name: '노원구', value: 9 },
                { name: '도봉구', value: 10 },
                { name: '동대문구', value: 11 },
                { name: '동작구', value: 12 },
                { name: '마포구', value: 13 },
                { name: '서대문구', value: 14 },
                { name: '서초구', value: 15 },
                { name: '성동구', value: 16 },
                { name: '성북구', value: 17 },
                { name: '송파구', value: 18 },
                { name: '양천구', value: 19 },
                { name: '영등포구', value: 20 },
                { name: '용산구', value: 21 },
                { name: '은평구', value: 22 },
                { name: '종로구', value: 23 },
                { name: '중구구', value: 24 },
                { name: '중랑구', value: 25 },
            ],
        };
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
    width: 50vw;
    height: 70vh;
}
</style>
