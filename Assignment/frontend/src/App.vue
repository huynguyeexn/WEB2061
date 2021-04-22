<template>
  <div id="app">
    <PreLoader></PreLoader>
    <router-view></router-view>
  </div>
</template>

<script>
import PreLoader from "@/components/site/PreLoader";
export default {
  components: { PreLoader },
  created() {
    this.$store.dispatch("loadDeals");
    this.$store.dispatch("loadProducts");
    this.$store.dispatch("loadCategories");
    this.$store.dispatch("loadCart");
    this.$store.dispatch("loadUser");
  },
};
</script>

<style lang="scss"></style>
