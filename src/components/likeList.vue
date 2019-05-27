<template>
    <el-table
        :data="likeSongs"
        v-loading="isLoading"
        height="100%"
        :row-key="likeSongs.id"
        :row-class-name="tableRowClassName"
        @row-dblclick="playThisSong"
        empty-text="暂无歌曲"
    >
        <el-table-column prop="name" label="歌曲"></el-table-column>
        <el-table-column prop="ar[0].name" label="歌手"></el-table-column>
        <el-table-column prop="al.name" label="专辑"></el-table-column>
    </el-table>
</template>

<script>
//
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    name: "likeList",
    computed: {
        ...mapState("songList", {
            likeSongs: state => state.likeSongs,
            isReady: state => state.isReady
        }),
        ...mapState("player", {
            playingIndex: state => state.playingIndex
        }),

        isLoading: function() {
            return !this.isReady;
        }
    },
    methods: {
        ...mapMutations("player", ["updatePlayingInfo"]),
        ...mapActions("songList", ["getLikeList"]),
        playThisSong(row, column, event) {
            this.updatePlayingInfo(row);
        },

        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === this.playingIndex) {
                return "playingSong";
            } else {
                return "";
            }
        }
    },
    mounted() {
        this.getLikeList();
    }
};
</script>

<style>
.el-table .playingSong {
    color: #409eff;
}
</style>