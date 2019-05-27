<template>
    <div id="loginPage">
        <div id="mask">
            <div class="loginBox">
                <div class="appName">Jessic</div>
                <el-input class="inputs" v-model="username" placeholder="请输入账号"></el-input>
                <el-input class="inputs" placeholder="请输入密码" v-model="password" show-password></el-input>
                <el-button class="loginBtn" type="primary" round @click="loginBtn">登陆</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
    data() {
        return {
            username: "15602298828",
            password: "82216118"
        };
    },

    computed: {
        ...mapState("userInfo", {
            isSucceed: state => state.isSucceed
        })
    },

    watch: {
        isSucceed: function() {
            if (this.isSucceed) {
                this.$router.push("/");
            }
        }
    },

    mounted() {
        // this.loginBtn();
    },

    methods: {
        ...mapMutations("userInfo", ["updateUserNameNPwd"]),
        ...mapActions("userInfo", ["login"]),
        loginBtn() {
            this.updateUserNameNPwd({
                username: this.username,
                password: this.password
            });
            this.login();
        }
    }
};
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
</style>