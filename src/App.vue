<template>
    <div id="app">
        <el-container v-bind:style="containerHeight">
            <el-aside width="200px">
                <sidebar></sidebar>
            </el-aside>

            <el-main>
                <keep-alive>
                    <component v-bind:is="selectedSideBar"></component>
                </keep-alive>
            </el-main>
        </el-container>

        <player></player>
    </div>
</template>

<script>
import sidebar from "./components/sidebar.vue";
import player from "./components/player.vue";
import likeList from "./components/likeList";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
    name: "app",
    components: {
        likeList,
        sidebar,
        player
    },
    data() {
        return {
            timer: false,
            playerHeight: 80,
            windowHeight: document.documentElement.clientHeight
        };
    },
    computed: {
        containerHeight: function() {
            return {
                height: this.windowHeight - this.playerHeight + "px"
            };
        },
        ...mapState("sidebar", {
            selectedSideBar: state => state.selectedSideBar
        }),

        ...mapState("userInfo", {
            isSucceed: state => state.isSucceed
        })
    },

    watch: {
        isSucceed: function() {
            if (this.isSucceed) {
                this.updateSelectedSideBar({
                    selectedSideBar: "likeList"
                });
            }
        }
    },

    mounted() {
        this.login();
        this.initWindowResizeEvt();
    },

    methods: {
        ...mapActions("userInfo", ["login"]),

        ...mapMutations("sidebar", ["updateSelectedSideBar"]),

        initWindowResizeEvt() {
            let that = this;
            window.onresize = function() {
                setTimeout(function() {
                    that.windowHeight = document.documentElement.clientHeight;
                }, 400);
            };
        }
    }
};
</script>

<style lang="scss">
html,
body {
    height: 100%;
}
body {
    margin: 0;
    padding: 0;
}

.el-aside {
    background-color: rgb(230, 230, 230);
}

.el-main {
    padding: 10px !important;
}

.player {
    height: 80px;
}
</style>