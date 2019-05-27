<template>
    <el-menu ref="sidebar" @select="handleSelect">
        <el-menu-item index="likeList">
            <i class="el-icon-star-on"></i>
            <span slot="title">我喜欢</span>
        </el-menu-item>

        <!-- <el-menu-item index="2">
            <i class="el-icon-s-platform"></i>
            <span slot="title">本地歌曲</span>
        </el-menu-item>

        <el-menu-item index="3">
            <i class="el-icon-download"></i>
            <span slot="title">下载歌曲</span>
        </el-menu-item>

        <el-menu-item index="4">
            <i class="el-icon-time"></i>
            <span slot="title">播放历史</span>
        </el-menu-item> -->
    </el-menu>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: "sidebar",
    data() {
        return {};
    },
    mounted() {},
    methods: {
        ...mapMutations("sidebar", ["updateSelectedSideBar"]),
        handleSelect(index) {
            this.updateSelectedSideBar({
                selectedSideBar: index
            });
        }
    }
};
</script>
<style scoped>
</style>