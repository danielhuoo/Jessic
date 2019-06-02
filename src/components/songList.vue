<template>
    <div id="songList">
        <!-- <el-row>{{songListName}}</el-row> -->
        <!-- <el-row v-show="isReady">
            <el-button type="primary" plain :click="playSelectedList">播放此歌单</el-button>
        </el-row>-->
        <el-table
            v-loading="isLoading"
            element-loading-text="正在加载歌单信息"
            element-loading-background="#ffffff"
            :data="currentSongs"
            v-bind:class="bgc"
            :height="tableHeight"
            :row-key="currentSongs.id"
            :row-class-name="tableRowClassName"
            header-row-class-name="tableHeaderBgc"
            @row-dblclick="playThisSong"
            empty-text="暂无歌曲"
        >
            <el-table-column prop="name" label="歌曲" v-bind:class="bgc"></el-table-column>
            <el-table-column prop="ar[0].name" label="歌手" v-bind:class="bgc"></el-table-column>
            <el-table-column prop="al.name" label="专辑" v-bind:class="bgc"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    name: "songList",
    data() {
        return {
            playerHeight: 80,
            windowHeight: document.documentElement.clientHeight
        };
    },
    computed: {
        ...mapState("songList", {
            currentSongs: state => state.currentSongs,
            playListInfo: state => state.playListInfo,
            isReady: state => state.isReady,
            selectedListIndex: state => state.selectedListIndex
        }),
        ...mapState("player", {
            playingIndex: state => state.playingIndex
        }),

        ...mapState("color", {
            bgc: state => state.bgc
        }),

        isLoading: function() {
            return !this.isReady;
        },

        songListName: function() {
            return this.playListInfo[this.selectedListIndex].name;
        },

        tableHeight: function() {
            return this.windowHeight - this.playerHeight + "px";
        }
    },
    methods: {
        ...mapMutations("player", ["updatePlayingInfo"]),
        ...mapActions("songList", ["getLikeList", "getPlayListInfo"]),
        playThisSong(row, column, event) {
            this.updatePlayingInfo(row);
        },

        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === this.playingIndex) {
                return "playingSong";
            } else if (!row.songUrl) {
                return "songUnavailable";
            }
        }

        // push all the songs from this list to the playlist
        // playSelectedList() {}
    },
    mounted() {
        this.getPlayListInfo();
    }
};
</script>

<style lang="scss">
#songList {
    // border: 1px solid red
}
.el-table {
    .playingSong {
        color: #409eff;
    }

    .songUnavailable {
        color: #c0c4cc;
    }
}
// .el-table th,
// .el-table tr {
//     background-color: #282828 !important;
// }
</style>