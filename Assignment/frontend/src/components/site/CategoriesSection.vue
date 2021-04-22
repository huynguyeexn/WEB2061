<template>
  <!-- Categories Section Begin -->
  <section class="categories">
    <div class="container">
      <div class="row">
        <div class="categories__slider owl-carousel">
          <div
            v-for="category in categories"
            :key="category.id"
            class="col-lg-3"
          >
            <div
              class="categories__item set-bg"
              :style="{
                'background-image': `url(${category.thumb})`,
              }"
            >
              <h5>
                <a href="#">{{ category.name }}</a>
              </h5>
            </div>
          </div>
          <!-- <div class="col-lg-3">
            <div
              class="categories__item set-bg"
              :style="{
                'background-image': `url(${require('@/assets/img/categories/cat-1.jpg')})`,
              }"
            >
              <h5><a href="#">Fresh Fruit</a></h5>
            </div>
          </div>
          <div class="col-lg-3">
            <div
              class="categories__item set-bg"
              :style="{
                'background-image': `url(${require('@/assets/img/categories/cat-2.jpg')})`,
              }"
            >
              <h5><a href="#">Dried Fruit</a></h5>
            </div>
          </div>
          <div class="col-lg-3">
            <div
              class="categories__item set-bg"
              :style="{
                'background-image': `url(${require('@/assets/img/categories/cat-3.jpg')})`,
              }"
            >
              <h5><a href="#">Vegetables</a></h5>
            </div>
          </div>
          <div class="col-lg-3">
            <div
              class="categories__item set-bg"
              :style="{
                'background-image': `url(${require('@/assets/img/categories/cat-4.jpg')})`,
              }"
            >
              <h5><a href="#">drink fruits</a></h5>
            </div>
          </div>
          <div class="col-lg-3">
            <div
              class="categories__item set-bg"
              :style="{
                'background-image': `url(${require('@/assets/img/categories/cat-5.jpg')})`,
              }"
            >
              <h5><a href="#">drink fruits</a></h5>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </section>
  <!-- Categories Section End -->
</template>

<script>
import { mapState } from "vuex";

export default {
  mounted() {
    this.$store.dispatch("loadCategories");
  },
  computed: {
    ...mapState(["categories"]),
  },
};
</script>

<style>
</style>
