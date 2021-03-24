<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[
        $router.currentRoute.matched[1] ? $router.currentRoute.matched[1].name : '',
      ]"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <template v-for="router in $store.state.menuRouters">
        <a-sub-menu :key="router.name" v-if="!router.meta.hidden">
          <span slot="title"
            ><a-icon type="mail" /><span>{{ router.meta.title }}</span></span
          >
          <template v-for="nav in router.children">
            <a-menu-item :key="nav.name" v-if="!nav.meta.hidden">
              <router-link :to="{ name: nav.name }"
                ><a-icon :type="nav.meta.icon" />{{
                  nav.meta.title
                }}</router-link
              >
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
};
</script>
