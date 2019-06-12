<template>
    <div id="player">
        <el-container>
            <el-aside width="250px">
                <el-button icon="el-icon-arrow-left" circle @click="prevSong" size="small" :disabled="isGettingUrl"></el-button>
                <el-button icon="el-icon-video-pause" circle @click="playSong" v-if="isPlaying"></el-button>
                <el-button icon="el-icon-caret-right" circle @click="playSong" v-else></el-button>
                <el-button icon="el-icon-arrow-right" circle @click="nextSong" size="small" :disabled="isGettingUrl"></el-button>
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

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import moment from "moment";
export default {
    name: "player",
    data() {
        return {
            isPlaying: false,
            playing_currentTime: null,
            playing_duration: null,
            timer: null
        };
    },

    watch: {
        playingId: function() {
            this.getUrlNPlay()
        }
    },

    computed: {
        ...mapState("color", {
            bgc: state => state.bgc
        }),

        ...mapState("songList", {
            currentSongs: state => state.currentSongs
        }),

        ...mapState("player", {
            playingId: state => state.playingId,
            playingIndex: state => state.playingIndex,
            playingSrc: state => state.playingSrc,
            playingName: state => state.playingName,
            playingSinger: state => state.playingSinger,
            playingAlbumPicUrl: state => state.playingAlbumPicUrl,
            isGettingUrl: state => state.isGettingUrl,
            isShowLivePage: state => state.isShowLivePage
        }),

        playingProgress: function() {
            if (!this.playing_duration) {
                return;
            }

            let percentage = parseInt(
                (this.playing_currentTime / this.playing_duration) * 100
            );
            return percentage;
        },

        displayCurrentTime: function() {
            const handleFormat = val => {
                if (val < 10) {
                    val = "0" + val;
                }

                return val;
            };
            let d = moment.duration(this.playing_currentTime, "seconds");
            let minute = handleFormat(d.minutes());
            let second = handleFormat(d.seconds());

            return minute + ":" + second;
        },

        displayDuration: function() {
            const handleFormat = val => {
                if (val < 10) {
                    val = "0" + val;
                }

                return val;
            };
            let d = moment.duration(this.playing_duration, "seconds");
            let minute = handleFormat(d.minutes());
            let second = handleFormat(d.seconds());

            return minute + ":" + second;
        }
    },

    methods: {
        ...mapActions("player", ["getSongUrl"]),
        ...mapMutations("player", ["updatePlayingInfo", "updateShowLivePage"]),

        getUrlNPlay() {
            this.isPlaying = false;

            this.getSongUrl({
                id: this.playingId
            }).then(() => {
                this.$refs.audio.load();
                this.playSong();
            });
        },

        // It is the main method
        playSong() {
            if(this.playingIndex === undefined){
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
        },

        nextSong() {
            // console.log('nextSong')
            this.updatePlayingInfo(this.currentSongs[this.playingIndex + 1]);
        },

        prevSong() {
            // console.log('prevSong')
            this.updatePlayingInfo(this.currentSongs[this.playingIndex - 1]);
        },

        onPlay() {
            this.isPlaying = true;
        },

        onPause() {
            this.isPlaying = false;
        },

        onEnd() {
            this.isPlaying = false;
            this.nextSong();
        },

        onTimeupdate(res) {
            this.playing_currentTime = res.target.currentTime;
        },

        onLoadedmetadata(res) {
            this.playing_duration = res.target.duration;
        },

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
                            // console.log("此网站可自动播放");
                        })
                        .catch(error => {
                            // console.log("此网站的自动播放功能被浏览器禁用");
                        });
                }
            }
        },

        showOrHideLivePage() {
            console.log("showLivePage");
            // return;
            // if (this.isShowLivePage) {
            //     this.updateShowLivePage(false);
            // } else {
            //     this.updateShowLivePage(true);
            // }
        }
    }
};
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