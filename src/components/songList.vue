<template>
    <div id="songList">
        <!-- <el-row>{{songListName}}</el-row> -->
        <!-- <el-row v-show="isReady">
            <el-button type="primary" plain :click="playSelectedList">播放此歌单</el-button>
        </el-row>-->

        <el-table
            :data="currentSongs"
            v-loading="isLoading"
            :row-class-name="tableRowClassName"
            element-loading-text="正在加载歌单信息"
            element-loading-background="#ffffff"
            v-bind:class="bgc"
            :height="tableHeight"
            :row-key="currentSongs.id"
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
import { mapState, mapMutations } from "vuex";
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
            isLoading: state => state.isLoading,
            selectedListIndex: state => state.selectedListIndex
        }),
        ...mapState("player", {
            playingIndex: state => state.playingIndex,
            playingId: state => state.playingId
        }),

        ...mapState("color", {
            bgc: state => state.bgc
        }),

        songListName: function() {
            return this.playListInfo[this.selectedListIndex].name;
        },

        tableHeight: function() {
            return this.windowHeight - this.playerHeight + "px";
        }
    },
    methods: {
        ...mapMutations("player", ["updatePlayingInfo"]),
        playThisSong(row) {
            this.updatePlayingInfo(row);
        },

        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === this.playingIndex && row.id === this.playingId) {
                return "playingSong";
            }
        }

        // push all the songs from this list to the playlist
        // playSelectedList() {}
    }
};
</script>

<style lang="scss">
#songList {
}
.el-table {
    .playingSong {
        color: #409eff;
    }
}
</style>