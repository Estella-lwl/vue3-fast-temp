<template>
  <div class="login">
    <div class="login-logo">
      <!-- <img src="@/assets/img/logo.png" alt="" /> -->
    </div>

    <div class="login-panel">
      <p class="login-title">通用后台系统</p>
      <el-form
        class="login-form"
        label-width="30px"
        ref="formRef"
        :model="loginParam"
        :rules="rules"
      >
        <el-form-item class="login-form-item" prop="loginName">
          <el-input placeholder="输入用户名" v-model="loginParam.loginName">
            <template #prefix>
              <img class="icon" src="@/assets/img/icon-phone.png" alt />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="login-form-item" prop="password">
          <el-input type="password" placeholder="输入密码" v-model="loginParam.password">
            <template #prefix>
              <img class="icon" src="@/assets/img/icon-password.png" alt />
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <div class="login-btn">
        <el-button class="login-btn-inner" @click="handleLoginClick"> 登录 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import LocalCache from "@/utils/cache";
import { rules } from "./config/account-config";
import { useUserStore } from "@/stores/modules/login.js";

const formRef = ref();

const loginParam = reactive({
  loginName: "admin",
  password: "admin"
});

const userStore = useUserStore();

const handleLoginClick = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      userStore.accountLoginAction(loginParam);
    }
  });
};
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login-bg.png") no-repeat 100% 100%;
  background-size: cover;
  background-color: #333;

  .login-logo {
    position: absolute;
    top: 43px;
    left: 71px;
  }

  .login-panel {
    position: absolute;
    margin: 0 auto;
    top: 44%;
    transform: translateY(-50%);
    right: 11.6%;
    padding: 50px 20px;
    text-align: center;
    width: 550px;
    min-height: 510px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

    .login-title {
      margin-bottom: 60px;
      font-size: 26px;
      font-family: Microsoft YaHei;
      font-weight: 560;
      color: #293234;
      line-height: 60px;
    }

    .login-form {
      font-size: 21px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #c2cbcc;

      .icon {
        width: 26px;
      }

      .login-form-item /deep/ .el-form-item__error {
        margin-top: -12px;
        animation: shake 0.5s ease;
      }

      @keyframes shake {
        0% {
          transform: translateX(0);
        }
        25% {
          transform: translateX(-5px);
        }
        50% {
          transform: translateX(5px);
        }
        75% {
          transform: translateX(-5px);
        }
        100% {
          transform: translateX(0);
        }
      }

      /deep/ .el-input {
        margin-bottom: 25px;
        width: 500px;
        height: 76px;
        background: #f7f8fc;
        font-size: 21px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #c2cbcc;
        line-height: 60px;
        border-radius: 20px;
      }

      /deep/ .el-input__wrapper {
        background: #f7f8fc;
        box-shadow: none;
        border-radius: 12px;
      }
    }

    /deep/ .el-button {
      border: none;
    }

    .login-btn {
      margin-top: 40px;
      margin-bottom: 30px;

      .login-btn-inner {
        width: 500px;
        height: 70px;
        line-height: 60px;
        background: #37c1d3;
        color: #ffffff;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        border-radius: 20px;
      }
    }
  }
}
</style>
