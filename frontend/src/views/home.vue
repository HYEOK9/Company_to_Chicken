<template>
    <v-app
        ><v-container fluid
            ><v-row style="height: 50vh" class="text-center"
                ><v-spacer></v-spacer
                ><v-col cols="5"
                    ><h1 style="color: white; font-size: 3rem">
                        <br v-for="n in 3" :key="n" />오늘 회사.. 때려칩니다..
                    </h1>
                    <br v-for="n in 4" :key="n" />
                    <h2 style="color: white">치킨집 차리시려구요?</h2>
                    <h2 style="color: white">
                        어느장소가 좋을지 먼저 알아봅시다!
                    </h2>
                    <br />
                    <v-btn to="/search">지금 알아보기</v-btn></v-col
                ></v-row
            ></v-container
        >
    </v-app>
</template>
<script>
export default {
    name: 'home',
};
</script>
<style scoped>
#app {
    height: 100vh;
    background: url('../assets/backimage.jpg') no-repeat center center fixed;
    background-size: cover;
}
</style>
