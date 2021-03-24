<template>
  <div class="header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <span class="crumbs">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ firstBar }}</a-breadcrumb-item>
        <a-breadcrumb-item
          ><a href="">{{ twoBar }}</a></a-breadcrumb-item
        >
      </a-breadcrumb>
    </span>
    <ul class="userInfo">
      <li>
        {{
          !$store.state.userInfo.username
            ? ""
            : "欢迎" + $store.state.userInfo.username
        }}<a-icon type="caret-up" />
      </li>
      <li @click="logout">退出</li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  // created() {
  // console.log(this.$router.currentRoute);
  // },
  data() {
    return {
      firstBar: this.$router.currentRoute.matched[0].meta.title ? this.$router.currentRoute.matched[0].meta.title : '首页',
      twoBar: this.$router.currentRoute.matched[1].meta.title ? this.$router.currentRoute.matched[1].meta.title : '统计',
    };
  },
  watch: {
    $route() {
      this.firstBar = this.$router.currentRoute.matched[0].meta.title;
      this.twoBar = this.$router.currentRoute.matched[1].meta.title;
      // console.log(this.firstBar, this.twoBar);
    },
  },
  methods: {
    ...mapActions(['changeCollapsed']),
    toggleCollapsed() {
      this.changeCollapsed();
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style>
</style>
