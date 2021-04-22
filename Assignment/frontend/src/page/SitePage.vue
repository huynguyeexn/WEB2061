<template>
  <div id="site">
    <HeaderSection></HeaderSection>
    <router-view />
    <!-- <router-view name="helper" /> -->
    <div class="m-5"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/site/Footer.vue";
import HeaderSection from "@/components/site/HeaderSection.vue";
import PreLoader from "@/components/site/PreLoader.vue";

import "owl.carousel";
import "owl.carousel/dist/assets/owl.carousel.css";

export default {
  components: { HeaderSection, Footer, PreLoader },
};
</script>

<style lang="scss">
@import "../assets/css/elegant-icons.css";
@import "../assets/css/nice-select.css";
@import "../assets/css/slicknav.min.css";
@import "../assets/sass/style.scss";
</style>
