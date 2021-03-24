<template>
  <div class="home">
    <SlideBar/>
    <div class="main-app" :class="{ collapsed: $store.state.collapsed }">
      <MainHeader/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SlideBar from './component/SlideBar.vue';
import MainHeader from './component/MainHeader.vue';

export default {
  components: {
    SlideBar,
    MainHeader,
  },
  data() {
    return {

    };
  },
  methods: {
  },
};
</script>

<style lang='less'>
@import url("~@/assets/css/home.less"); ;
</style>
