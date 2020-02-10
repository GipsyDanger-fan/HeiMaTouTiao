<template>
  <div class="container-login">
    <el-card class="my-card">
      <img src="../../assets/logo_index.png" alt />
      <el-form ref="loginForm" status-icon :rules="loginRouter" :model="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
            @keyup.enter.native="login"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import auth from "@/utils/auth";
export default {
  name: "app-login",
  data() {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error("手机号码格式错误"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        mobile: "",
        code: ""
      },
      loginRouter: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { len: "6", message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$http
            .post("/authorizations", this.loginForm)
            .then(res => {
              auth.setUser(res.data.data);
              this.$router.push("/");
            })
            .catch(() => {
              this.$message.error("手机号或验证码错误");
            });
        }
      });
    }
  }
};
</script>
<style scoped lang='less'>
.container-login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  left: 0;
  top: 0;
  .my-card {
    width: 400px;
    height: 350px;
    transform: translate(-50%, -60%);
    position: absolute;
    top: 50%;
    left: 50%;
    img {
      display: block;
      width: 200px;
      margin: 0 auto 20px;
    }
  }
}
</style>