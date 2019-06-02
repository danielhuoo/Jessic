<template>
    <div id="headbar">
        <el-dropdown @command="handleCommand">
            <el-button type="primary">
                切换模式
                <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="day">白天模式</el-dropdown-item>
                <el-dropdown-item command="night">夜间模式</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
    name: "headbar",
    data() {
        return {};
    },

    computed: {
        ...mapState("color", {
            bgc: state => state.bgc
        })
    },

    mounted() {},

    methods: {
        ...mapMutations("color", ["updateMode"]),
        handleCommand(command) {
            console.log(command);
            this.updateMode({
                mode: command
            });
        }
    }
};
</script>

<style scoped>
#headbar {
}
</style>