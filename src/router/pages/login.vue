<template>
    <div id="loginPage">
        <div id="mask">
            <div class="loginBox">
                <div class="appName">Jessic</div>
                <el-input class="inputs" v-model="username" placeholder="请输入网易云账号"></el-input>
                <el-input class="inputs" placeholder="请输入密码" v-model="password" show-password></el-input>
                <el-button class="loginBtn" type="primary" round @click="loginBtn">登录</el-button>
                <el-link class="logasVisitor" @click="loginAsVisitors">Login as visitors</el-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action, Mutation } from "vuex-class";
import { LoginInfoState } from "../../store/modules/module-types";
@Component
export default class Login extends Vue {
    username: string = "";
    password: string = "";

    @Action("login", { namespace: "loginInfo" }) login: any;

    mounted() {
        // this.login();
        // this.loginAsVisitors();
    }

    loginBtn(): void {
        console.log("loginBtn");
        if (!this.username || !this.password) {
            this.$message({
                message: "用户名或密码输入有误，请重新输入",
                type: "warning"
            });
            return;
        }

        const loadingInstance = this.$loading({
            fullscreen: true,
            text: "正在拼命登录...",
            customClass: "loadingBg"
        });

        this.login({
            username: this.username,
            password: this.password
        }).then(() => {
            this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close();
            });
            console.log("登录成功");
            this.$router.push("/");
            this.username = "";
            this.password = "";
        });
    }

    loginAsVisitors(): void {
        this.username = "18002280851";
        this.password = "abc12345";
        this.loginBtn();
    }
}
</script>

<style scoped>
#loginPage {
    height: 100%;
    background-image: url("../../assets/bg.jpg");
    background-size: cover;
}

#mask {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}

.loginBox {
    width: 200px;
    height: 100%;
    display: flex;
    display: -webkit-box;
    align-items: center;
    margin: 0 auto;
}

.inputs {
    margin: 5px 0;
}

.loginBtn {
    width: 100%;
    margin-top: 5px;
}

.appName {
    user-select: none;
    width: 100%;
    color: white;
    font-size: 60px;
    display: inline-block;
    text-align: center;
    margin-bottom: 10px;
}

.logasVisitor {
    width: 100%;
    color: white;
    margin-top: 5px;
}
</style>