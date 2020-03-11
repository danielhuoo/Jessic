<template>
    <div id="sidebar">
        <el-container>
            <el-header class="avatarBox" height="150px">
                <el-tooltip placement="bottom" effect="light">
                    <div slot="content">
                        <el-button type="danger" round @click="logout">退出账号</el-button>
                    </div>
                    <img :src="avatarUrl" alt class="el-dropdown-link" />
                </el-tooltip>

                <el-row class="username">{{nickname}}</el-row>
            </el-header>

            <el-main>
                <!-- 找不到能默认展开菜单的方法 -->
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

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Action, Mutation, namespace } from "vuex-class";
import { LoginInfoState, SongListState } from "../store/modules/module-types";
@Component
export default class sidebarComp extends Vue {
    @State("loginInfo") loginInfo!: LoginInfoState; //為什麼不用指定namespace呢？
    @State("songList") songList!: SongListState;
    @Action("removeAllStates")
    removeAllStates: any;
    @Action("getPlayListInfo", { namespace: "songList" })
    getPlayListInfo: any;
    @Action("getPlayListDetail", { namespace: "songList" })
    getPlayListDetail: any;
    @Mutation("updateSelectedListIndex", { namespace: "songList" })
    updateSelectedListIndex: any;

    // To display the avatar and nickname
    get avatarUrl(): string {
        return this.loginInfo.avatarUrl;
    }

    // To display the nickname
    get nickname(): string {
        return this.loginInfo.nickname;
    }

    // To display the playlists
    get playListInfo(): Array<any> {
        return this.songList.playListInfo;
    }

    // handle the event of selecting a songList
    handleSelect(index: number) {
        this.updateSelectedListIndex({
            selectedListIndex: index
        });

        this.getPlayListDetail();
    }

    // logout the current account
    logout() {
        console.log("logout");
        this.$confirm("是否退出账号?", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            showClose: false,
            center: true,
            type: "warning"
        }).then(() => {
            this.removeAllStates();
            this.$router.push("/login");
        });
    }

    mounted() {
        this.getPlayListInfo();
    }
}
</script>
<style scoped lang="scss">
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