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
            <a-input size="large" placeholder="账户">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input size="large" placeholder="密码">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a href="">忘记密码</a>
          </div>
          <div class="item">
            <a-button size="large" type="primary"> 登入 </a-button>
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
            <a-input size="large" placeholder="邀请码">
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
    const regFrom = reactive({
      account: "",
      password: "",
    });
    const register = () => {
      auth.register(regFrom.account, regFrom.password);
    };
    return {
      activeKey: ref("1"),
      regFrom,
      register,
    };
  },
};
</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>
