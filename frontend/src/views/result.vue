<template>
    <v-app
        ><v-row align="center" justify="center"
            ><v-spacer></v-spacer>
            <v-col align="center" cols="auto"
                ><br /><br /><br /><br />
                <h1 style="color: white">
                    이 주변엔 ___개의 치킨집이 영업중이고
                </h1>
                <br /><br />
                <v-divider></v-divider>
                <h2 style="color: white">치킨지수는 ___점 입니다!</h2>
                <br />
                <span style="color: white">
                    (치킨지수=유동인구/치킨집수)
                </span></v-col
            ><v-spacer></v-spacer></v-row
        ><v-row justify="center"
            ><v-btn to="/search">다시하기</v-btn></v-row
        ></v-app
    >
</template>
<script>
export default {
    name: 'result',
};
</script>
<style scoped>
#app {
    background-color: black;
}
</style>
