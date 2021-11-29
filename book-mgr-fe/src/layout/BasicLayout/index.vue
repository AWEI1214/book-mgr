<template>
  <div class="basic-layout">
    <div class="app-header">
      <div class="left">
        <img
          src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1"
          alt=""
        />
        <div class="title">图书管理系统</div>
      </div>
      <div class="right">
        <div class="hello-msg">你好，xx</div>
        <div class="logout">退出</div>
      </div>
    </div>
    <div class="app-header-placlehodel"></div>
    <div class="app-content">
      <div class="left">
        <app-nav />
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from "./Nav/index.vue";
export default {
  components: {
    AppNav,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
