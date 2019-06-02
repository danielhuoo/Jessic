<template>
    <div id="sidebar">
        <el-container>
            <el-header class="avatarBox" height="150px">
                <el-tooltip placement="bottom" effect="light">
                    <div slot="content">
                        <el-button type="danger" round @click="logout">退出账号</el-button>
                    </div>
                    <img :src="avatarUrl" alt class="el-dropdown-link">
                </el-tooltip>

                <el-row class="username">{{nickname}}</el-row>
            </el-header>

            <el-main>
                <el-menu default-active="myList">
                    <el-submenu index="myList">
                        <template slot="title">
                            <span>我的歌单</span>
                        </template>

                        <el-menu-item
                            v-for="item in playListInfo"
                            v-bind:item="item"
                            v-bind:key="item.id"
                            :index="item.index4El"
                            @click="handleSelect(item.index4El)"
                        >{{item.name}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
    name: "sidebar",
    data() {
        return {};
    },
    computed: {
        // To display the avatar and nickname on the sidebar
        ...mapState("userInfo", {
            uid: state => state.uid,
            avatarUrl: state => state.avatarUrl,
            nickname: state => state.nickname
        }),

        // To display the playlists on the sidebar
        ...mapState("songList", {
            playListInfo: state => state.playListInfo
        })
    },

    watch: {
        // only when the playlistinfo is loaded could start the song
        playListInfo: function() {
            if (this.playListInfo.length) {
                this.getPlayListDetail();
            }
        }
    },

    methods: {
        ...mapActions("songList", ["getPlayListDetail"]),
        ...mapMutations("userInfo", ["removeLoginInfo"]),
        ...mapMutations("songList", ["updateSelectedListIndex"]),

        handleSelect(index) {
            this.updateSelectedListIndex({
                selectedListIndex: index
            });

            this.getPlayListDetail();
        },
        logout() {
            console.log("logout");

            this.$confirm("是否退出账号?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                showClose: false,
                center: true,
                type: "warning"
            })
                .then(() => {
                    this.removeLoginInfo();
                    this.$router.push("/login");
                })
                .catch(() => {});
        }
    },
    mounted() {
        // this.getPlayListDetail()
        // console.log(this.playListInfo);
    }
};
</script>
<style scoped lang="scss">
#sidebar {
    // border: 1px solid red;
}
.avatarBox {
    margin-top: 20px;
    text-align: center;
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
}

.username {
    margin: 10px 0;
    text-align: center;
}

.el-menu {
    overflow-x: hidden;
}
</style>