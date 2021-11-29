<template>
  <div class="bg"></div>
  <div class="auth">
    <div class="title-info">
      <img
        src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1"
        alt=""
      />
      <h2 class="title">图书管理系统后台</h2>
    </div>
    <div class="from">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane tab="登录" key="1">
          <div class="item">
            <a-input
              size="large"
              placeholder="账户"
              v-model:value="loginFrom.account"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input
              size="large"
              placeholder="密码"
              v-model:value="loginFrom.password"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a href="">忘记密码</a>
          </div>
          <div class="item">
            <a-button size="large" type="primary" @click="login">
              登入
            </a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="注册" key="2">
          <div class="item">
            <a-input
              size="large"
              placeholder="用户名"
              v-model:value="regFrom.account"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input
              size="large"
              placeholder="密码"
              v-model:value="regFrom.password"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input
              size="large"
              placeholder="邀请码"
              v-model:value="regFrom.inviteCode"
            >
              <template #prefix>
                <MailOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-button size="large" type="primary" @click="register">
              注册
            </a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { auth } from "../../service/inedx";
import { result } from "../../helper/utils/index";
import { message } from "ant-design-vue";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
export default {
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup() {
    //注册用的表单数据
    const regFrom = reactive({
      account: "",
      password: "",
      inviteCode: "",
    });
    //注册逻辑
    const register = async () => {
      if (regFrom.account === "") {
        message.info("请输入账号");
        return;
      }
      if (regFrom.password === "") {
        message.info("请输入密码");
        return;
      }
      if (regFrom.inviteCode === "") {
        message.info("请输入邀请码");
        return;
      }
      const res = await auth.register(
        regFrom.account,
        regFrom.password,
        regFrom.inviteCode
      );
      result(res).success((data) => {
        message.success(data.msg);
      });
    };

    //登陆用的表单逻辑
    const loginFrom = reactive({
      account: "",
      password: "",
    });
    //登录逻辑
    const login = async () => {
      if (loginFrom.account === "") {
        message.info("请输入账号");
        return;
      }
      if (loginFrom.password === "") {
        message.info("请输入密码");
        return;
      }

      const res = await auth.login(loginFrom.account, loginFrom.password);

      result(res).success((data) => {
        message.success(data.msg);
      });
    };
    return {
      activeKey: ref("1"),

      //注册相关的数据
      regFrom,
      register,

      //登录相关的数据
      loginFrom,
      login,
    };
  },
};
</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>
