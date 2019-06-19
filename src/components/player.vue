<template>
    <div id="player">
        <el-container>
            <el-aside width="250px">
                <el-button
                    icon="el-icon-arrow-left"
                    circle
                    @click="prevSong"
                    size="small"
                    :disabled="isGettingUrl"
                ></el-button>
                <el-button icon="el-icon-video-pause" circle @click="playSong" v-if="isPlaying"></el-button>
                <el-button icon="el-icon-caret-right" circle @click="playSong" v-else></el-button>
                <el-button
                    icon="el-icon-arrow-right"
                    circle
                    @click="nextSong"
                    size="small"
                    :disabled="isGettingUrl"
                ></el-button>
            </el-aside>
            <el-main v-bind:class="bgc">
                <el-row>
                    <el-col class="albumBox">
                        <!-- <el-image
                        style="width: 50px; height: 50px"
                        :src="playingAlbumPicUrl"
                        fit="cover"
                        ></el-image>-->
                        <!-- 不要用 element的图片，功能太少了 -->
                        <img
                            :src="playingAlbumPicUrl"
                            width="50px"
                            height="50px"
                            alt
                            v-on:click="showOrHideLivePage"
                            v-show="playingId"
                        >
                    </el-col>
                    <el-col :span="20">
                        <el-row class="aboveProgess" v-show="playingId">
                            <span>
                                {{playingName}} -
                                <span class="greyText">{{playingSinger}}</span>
                            </span>
                            <span class="duration">{{displayCurrentTime}} / {{displayDuration}}</span>
                        </el-row>
                        <el-row class="progressBar" v-show="playingId">
                            <el-progress :percentage="playingProgress" :show-text="false"></el-progress>
                        </el-row>
                    </el-col>
                </el-row>
            </el-main>

            <!-- <source> within <video> makes play() promise never rejects -->
            <!-- see details: https://developers.google.com/web/updates/2017/06/play-request-was-interrupted÷ -->
            <audio
                ref="audio"
                @play="onPlay"
                @pause="onPause"
                @ended="onEnd"
                @timeupdate="onTimeupdate"
                @loadedmetadata="onLoadedmetadata"
                v-show="false"
                preload="none"
            >
                <source v-bind:src="playingSrc" type="audio/mpeg">
            </audio>
        </el-container>
    </div>
</template>

<script lang="ts">
import moment from "moment";
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";
import { SongListState, PlayerState } from "../store/modules/module-types";
@Component
export default class playerComp extends Vue {
    @State("songList") songListStore!: SongListState;
    @State("player") playerStore!: PlayerState;

    @Action("getSongUrl", { namespace: "player" })
    getSongUrl: any;
    @Mutation("updatePlayingInfo", { namespace: "player" })
    updatePlayingInfo: any;
    @Mutation("updateShowLivePage", { namespace: "player" })
    updateShowLivePage: any;

    @Watch("playingId")
    onPlayingIdChanged() {
        this.getUrlNPlay();
    }

    isPlaying: boolean = false;
    playing_currentTime: number = 0;
    playing_duration: number = 0;
    timer: any = null;

    get currentSongs() {
        return this.songListStore.currentSongs;
    }

    get playingId() {
        return this.playerStore.playingId;
    }

    get playingIndex() {
        return this.playerStore.playingIndex;
    }

    get playingSrc() {
        return this.playerStore.playingSrc;
    }
    get playingName() {
        return this.playerStore.playingName;
    }
    get playingSinger() {
        return this.playerStore.playingSinger;
    }
    get playingAlbumPicUrl() {
        return this.playerStore.playingAlbumPicUrl;
    }
    get isGettingUrl() {
        return this.playerStore.isGettingUrl;
    }
    get isShowLivePage() {
        return this.playerStore.isShowLivePage;
    }

    get playingProgress() {
        if (!this.playing_duration) {
            return;
        }

        let percentage = Math.floor(
            (this.playing_currentTime / this.playing_duration) * 100
        );
        return percentage;
    }

    get displayCurrentTime() {
        let d = moment.duration(this.playing_currentTime, "seconds");
        let minute = this.handleFormat(d.minutes());
        let second = this.handleFormat(d.seconds());
        return minute + ":" + second;
    }

    get displayDuration() {
        let d = moment.duration(this.playing_duration, "seconds");
        let minute = this.handleFormat(d.minutes());
        let second = this.handleFormat(d.seconds());
        return minute + ":" + second;
    }

    get bgc() {
        return "bgc-day";
    }

    handleFormat(val: number) {
        let newVal: string = "";
        if (val < 10) {
            newVal = "0" + val.toString();
        } else {
            newVal = val.toString();
        }

        return newVal;
    }

    getUrlNPlay() {
        this.isPlaying = false;

        this.getSongUrl({
            id: this.playingId
        }).then(() => {
            this.$refs.audio.load();
            this.playSong();
        });
    }

    // It is the main method
    playSong() {
        if (this.playingIndex === undefined) {
            this.updatePlayingInfo(this.currentSongs[0]);
        }

        clearInterval(this.timer);
        if (!this.playingSrc) {
            this.$notify({
                title: this.playingName,
                message: "暂时听不了了,只能试试其他歌曲了"
            });
            this.timer = setTimeout(() => {
                this.nextSong();
            }, 1000);
        } else {
            this.playOrPause();
        }
    }

    nextSong() {
        // console.log('nextSong')
        this.updatePlayingInfo(this.currentSongs[this.playingIndex + 1]);
    }

    prevSong() {
        // console.log('prevSong')
        this.updatePlayingInfo(this.currentSongs[this.playingIndex - 1]);
    }

    onPlay() {
        this.isPlaying = true;
    }

    onPause() {
        this.isPlaying = false;
    }

    onEnd() {
        this.isPlaying = false;
        this.nextSong();
    }

    onTimeupdate(res: any) {
        this.playing_currentTime = res.target.currentTime;
    }

    onLoadedmetadata(res: any) {
        this.playing_duration = res.target.duration;
    }

    playOrPause() {
        if (this.isPlaying) {
            // console.log("pause");
            this.$refs.audio.pause();
        } else {
            // console.log("play");
            const playPromise = this.$refs.audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log("可播放");
                    })
                    .catch((error: any) => {
                        console.log("无法播放了");
                    });
            }
        }
    }

    showOrHideLivePage() {
        // console.log("showLivePage");
        // return;
        // if (this.isShowLivePage) {
        //     this.updateShowLivePage(false);
        // } else {
        //     this.updateShowLivePage(true);
        // }
    }
}
</script>
<style lang="scss" scoped>
.el-main {
    padding: 10px;
}
$grey: #909399;
.greyText {
    color: $grey;
}

.el-aside {
    text-align: center;
    line-height: 80px;
}
.el-button {
    vertical-align: middle;
    border: 2px solid #409eff;
    color: #409eff;
}

.duration {
    float: right;
    color: $grey;
}
.albumBox {
    width: 50px;
    margin-right: 20px;
}
.aboveProgess {
    line-height: 2;
}
</style>