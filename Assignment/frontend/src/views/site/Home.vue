<template>
  <div class="home">
    <HeroSection></HeroSection>
    <CategoriesSection></CategoriesSection>
    <FeaturedSection :deal="getDeal(1)"></FeaturedSection>
    <BannerSection></BannerSection>
    <FeaturedSection :deal="getDeal(2)"></FeaturedSection>
    <!-- <LatestProductSection></LatestProductSection> -->
    <div class="m-5"></div>
  </div>
</template>

<script>
import HeroSection from "@/components/site/home/HeroSection";
import CategoriesSection from "@/components/site/CategoriesSection";
import FeaturedSection from "@/components/site/home/FeaturedSection";
import BannerSection from "@/components/site/home/BannerSection";
import LatestProductSection from "@/components/site/home/LatestProductSection";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  name: "Home",
  components: {
    HeroSection,
    CategoriesSection,
    FeaturedSection,
    BannerSection,
    LatestProductSection,
  },
  computed: {
    ...mapState(["deals"]),
  },
  methods: {
    getDeal(dealId) {
      let result = this.$store.getters.dealById(dealId);
      return { ...result };
    },
  },
};
</script>
