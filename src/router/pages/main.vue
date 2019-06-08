<template>
    <div>
        <el-carousel
            :height="containerHeight"
            direction="vertical"
            :autoplay="false"
            ref="carousel"
            indicator-position="none"
        >
            <el-carousel-item name="normalPage">
                <el-container>
                    <el-header v-bind:class="bgc" v-if="false">
                        <headbar></headbar>
                    </el-header>
                    <el-container>
                        <el-aside
                            v-bind:style="{width:'250px',height: containerHeight}"
                            v-bind:class="bgc"
                        >
                            <sidebar></sidebar>
                        </el-aside>

                        <el-main v-bind:class="bgc">
                            <keep-alive>
                                <component v-bind:is="currentPage"></component>
                            </keep-alive>
                        </el-main>
                    </el-container>
                </el-container>
            </el-carousel-item>
            <el-carousel-item name="livePage">
                <live></live>
            </el-carousel-item>
        </el-carousel>

        <player v-bind:class="bgc"></player>
    </div>
</template>
<script>
import sidebar from "../../components/sidebar";
import player from "../../components/player";
import songList from "../../components/songList";
import live from "../../components/live";
import headbar from "../../components/headbar";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
    components: {
        songList,
        sidebar,
        player,
        live,
        headbar
    },
    data() {
        return {
            timer: false,
            playerHeight: 80,
            windowHeight: document.documentElement.clientHeight,
            windowWidth: document.documentElement.clientWidth,
            currentPage: "songList"
        };
    },
    computed: {
        containerHeight: function() {
            return this.windowHeight - this.playerHeight + "px";
        },
        ...mapState("sidebar", {
            selectedSideBar: state => state.selectedSideBar
        }),

        ...mapState("player", {
            isShowLivePage: state => state.isShowLivePage
        }),

        ...mapState("color", {
            bgc: state => state.bgc
        })
    },

    watch: {
        isShowLivePage: function() {
            if (this.isShowLivePage) {
                this.$refs.carousel.setActiveItem("livePage");
            } else {
                this.$refs.carousel.setActiveItem("normalPage");
            }
        }
    },

    methods: {
        ...mapMutations("sidebar", ["updateSelectedSideBar"]),
        initWindowResizeEvt() {
            const that = this;
            window.onresize = function() {
                setTimeout(function() {
                    that.windowHeight = document.documentElement.clientHeight;
                }, 400);
            };
        }
    },

    mounted() {
        this.initWindowResizeEvt();
    }
};
</script>

<style lang="scss">
* {
    user-select: none;
}
.bgc-night {
    color: #ffffff;
    background-color: #282828 !important;
}

.bgc-day {
    background-color: #ffffff;
}

.el-aside {
    background-color: #e6e6e6;
}

.el-main {
    background-color: #ffffff;
    padding: 0;
}

.player {
    // height: 80px;
    // border: 1px solid red
}
</style>