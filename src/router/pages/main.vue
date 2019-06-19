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
                            <sidebarComp></sidebarComp>
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
                <!-- <live></live> -->
            </el-carousel-item>
        </el-carousel>

        <playerComp v-bind:class="bgc"></playerComp>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import sidebarComp from "../../components/sidebar.vue";
import playerComp from "../../components/player.vue";
import songListComp from "../../components/songList.vue";
// import live from "../../components/live";
// import headbar from "../../components/headbar";
// import { mapActions, mapState, mapMutations } from "vuex";
@Component({
    components: {
        songListComp,
        sidebarComp,
        playerComp
        // live,
        // headbar
    }
})
export default class mainPage extends Vue {
    timer: boolean = false;
    playerHeight: number = 80;
    windowHeight: number = document.documentElement.clientHeight;
    windowWidth: number = document.documentElement.clientWidth;
    currentPage: string = "songListComp";

    get bgc(): string {
        return "bgc-day";
    }

    get containerHeight(): string {
        return this.windowHeight - this.playerHeight + "px";
    }

    // computed: {
    //     // ...mapState("sidebar", {
    //     //     selectedSideBar: state => state.selectedSideBar
    //     // }),

    //     // ...mapState("player", {
    //     //     isShowLivePage: state => state.isShowLivePage
    //     // }),

    //     // ...mapState("color", {
    //     //     bgc: state => state.bgc
    //     // })
    // },

    // watch: {
    //     isShowLivePage: function() {
    //         if (this.isShowLivePage) {
    //             this.$refs.carousel.setActiveItem("livePage");
    //         } else {
    //             this.$refs.carousel.setActiveItem("normalPage");
    //         }
    //     }
    // },

    initWindowResizeEvt() {
        console.log("initWindowResizeEvt");
        window.onresize = () => {
            setTimeout(() => {
                this.windowHeight = document.documentElement.clientHeight;
            }, 400);
        };
    }

    // methods: {
    //     // ...mapMutations("sidebar", ["updateSelectedSideBar"]),

    // },

    mounted() {
        this.initWindowResizeEvt();
    }
}
</script>

<style lang="scss">
*:not(input) {
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