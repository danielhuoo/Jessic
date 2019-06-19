<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    components: {},
    data() {
        return {};
    },
    mounted() {
        this.$router.push("/login");
    }
};
</script>

<style>
html,
body,
#app {
    height: 100%;
}
body {
    margin: 0;
    padding: 0;
}
.loadingBg {
    background-color: rgba(0, 0, 0, 0.8);
}
</style>