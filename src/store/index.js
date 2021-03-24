import Vue from 'vue';
import Vuex from 'vuex';
import { setUserInfo, getUserInfo, removeUserInfo } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    userInfo: getUserInfo(),
    menuRouters: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    logout(state) {
      state.userInfo = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
    addRouter(state, arrRouter) {
      state.menuRouters = arrRouter;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setUserInfo(userInfo);
    },
    logout({ commit }) {
      commit('logout');
      removeUserInfo();
    },
    addRouter({ commit }, arrRouter) {
      commit('addRouter', arrRouter);
    },
  },
  modules: {
  },
});
