<template>
    <div id="songList">
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
            <el-table-column label="操作" v-bind:class="bgc">
                <template slot-scope="scope">
                    <el-button
                        v-if="selectedListIndex==0"
                        circle
                        icon="el-icon-star-on"
                        @click="handleEdit(scope.$index, scope.row,false)"
                    ></el-button>
                    <el-button
                        v-if="selectedListIndex!=0"
                        circle
                        icon="el-icon-star-off"
                        @click="handleEdit(scope.$index, scope.row,true)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";
import { SongListState, PlayerState } from "../store/modules/module-types";
@Component
export default class songListComp extends Vue {
    
    @State("songList") songList!: SongListState;
    @State("player") playerStore!: PlayerState;

    @Mutation("updatePlayingInfo", { namespace: "player" })
    updatePlayingInfo: any;

    @Action("likeTheSong", { namespace: "songList" })
    likeTheSong: any;

    playerHeight: number = 80;
    windowHeight: number = document.documentElement.clientHeight;

    get tableHeight() {
        return `${this.windowHeight - this.playerHeight}px`;
    }

    get currentSongs() {
        return this.songList.currentSongs;
    }

    get isLoading() {
        return this.songList.isLoading;
    }

    get playListInfo() {
        return this.songList.playListInfo;
    }

    get selectedListIndex() {
        return this.songList.selectedListIndex;
    }

    get playingIndex() {
        return this.playerStore.playingIndex;
    }

    get playingId() {
        return this.playerStore.playingId;
    }

    get bgc() {
        return "bgc-day";
    }

    handleEdit(index: number, row: any, isLike: boolean): void {
        let message: string;
        isLike
            ? (message = "已添加至列表“我喜欢”")
            : (message = "已被移出列表“我喜欢”");
        this.likeTheSong({ id: row.id }).then(() => {
            this.$notify({
                title: row.name,
                message: message
            });
        });
    }

    playThisSong(row: any): void {
        console.log(`play song: ${row.name}`);
        this.updatePlayingInfo(row);
    }

    // show css style on the list item that the song is playing
    tableRowClassName({ row, rowIndex }: any): string {
        let className: string = "";
        if (rowIndex === this.playingIndex && row.id === this.playingId) {
            className = "playingSong";
        }
        return className;
    }
}
</script>

<style lang="scss">
.el-table {
    .playingSong {
        color: #409eff;
    }
}
</style>