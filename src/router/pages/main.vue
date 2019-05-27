<template>
    <div>
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
import sidebar from "../../components/sidebar";
import player from "../../components/player";
import likeList from "../../components/likeList";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
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
        })
    },

    mounted() {
        this.updateSelectedSideBar({
            selectedSideBar: "likeList"
        });
        this.initWindowResizeEvt();
    },

    methods: {
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