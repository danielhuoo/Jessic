<template>
    <el-container>
        <el-aside width="200px">
            <el-button icon="el-icon-arrow-left" circle @click="prevSong" size="small"></el-button>
            <el-button icon="el-icon-video-pause" circle @click="playSong" v-if="isPlaying"></el-button>
            <el-button icon="el-icon-caret-right" circle @click="playSong" v-else></el-button>
            <el-button icon="el-icon-arrow-right" circle @click="nextSong" size="small"></el-button>
        </el-aside>
        <el-main>
            <el-row>
                <el-col class="albumBox">
                    <el-image
                        style="width: 50px; height: 50px"
                        :src="playingAlbumPicUrl"
                        fit="cover"
                    ></el-image>
                </el-col>
                <el-col :span="20">
                    <el-row class="aboveProgess" v-show="playingId">
                        <span>
                            {{playingName}} -
                            <span class="greyText">{{playingSinger}}</span>
                        </span>
                        <span class="duration">{{displayCurrentTime}} / {{displayDuration}}</span>
                    </el-row>
                    <el-row class="progressBar">
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
        >
            <source v-bind:src="playingSrc" type="audio/mpeg">
        </audio>
    </el-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";
export default {
    name: "player",
    data() {
        return {
            isPlaying: false,
            playing_currentTime: null,
            playing_duration: null
        };
    },

    watch: {
        playingSrc: function() {
            this.isPlaying = false;
            this.$refs.audio.load();
            this.playSong()
        },

        listIsReady: function() {
            if (this.listIsReady) {
                this.initPlayer();
            }
        }
    },

    computed: {
        playingProgress: function() {
            if (!this.playing_duration) {
                return;
            }

            let percentage = parseInt(
                (this.playing_currentTime / this.playing_duration) * 100
            );
            return percentage;
        },

        ...mapState("songList", {
            listIsReady: state => state.isReady,
            likeSongs: state => state.likeSongs
        }),

        ...mapState("player", {
            playingId: state => state.playingId,
            playingIndex: state => state.playingIndex,
            playingSrc: state => state.playingSrc,
            playingName: state => state.playingName,
            playingSinger: state => state.playingSinger,
            playingAlbumPicUrl: state => state.playingAlbumPicUrl
        }),

        displayCurrentTime: function() {
            let d = moment.duration(this.playing_currentTime, "seconds");
            let minute = handleFormat(d.minutes());
            let second = handleFormat(d.seconds());

            function handleFormat(val) {
                if (val < 10) {
                    val = "0" + val;
                }

                return val;
            }

            return minute + ":" + second;
        },

        displayDuration: function() {
            let d = moment.duration(this.playing_duration, "seconds");
            let minute = handleFormat(d.minutes());
            let second = handleFormat(d.seconds());

            function handleFormat(val) {
                if (val < 10) {
                    val = "0" + val;
                }

                return val;
            }

            return minute + ":" + second;
        }
    },

    methods: {
        ...mapMutations("player", ["updatePlayingInfo"]),
        initPlayer() {
            // play the first song of the list
            this.updatePlayingInfo(this.likeSongs[0]);
            this.playSong();
        },

        // It is the main method
        playSong() {
            if (!this.playingSrc) {
                this.$notify({
                    title: this.playingName,
                    message: "暂时听不了了,只能试试其他歌曲了"
                });
            } else {
                this.playOrPause();
            }
        },

        nextSong() {
            const nextId = this.playingIndex + 1;
            this.updatePlayingInfo(this.likeSongs[nextId]);
            this.playSong();
        },

        prevSong() {
            const prevId = this.playingIndex - 1;
            this.updatePlayingInfo(this.likeSongs[prevId]);
            this.playSong();
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
                this.$refs.audio.pause();
            } else {
                this.$refs.audio.play();
            }
        }
    }
};
</script>
<style lang="scss" scoped>
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

.progressBar {
    /* margin-top: 20px */
}
.aboveProgess {
    line-height: 2;
}
</style>