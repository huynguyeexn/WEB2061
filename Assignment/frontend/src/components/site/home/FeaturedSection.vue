<template>
  <!-- Featured Section Begin -->
  <section class="featured spad" v-if="deal">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title">
            <h2>{{ deal.name | uppercase }}</h2>
          </div>
        </div>
      </div>
      <div class="row featured__filter">
        <div
          v-for="product of dealProducts"
          :key="product.id"
          class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
        >
          <div class="featured__item">
            <div
              class="featured__item__pic set-bg"
              :style="{
                'background-image': `url(${product.thumb})`,
              }"
            >
              <div class="product__discount__percent" v-if="product.priceOld">
                -{{ percent(product) }}%
              </div>
              <ul class="featured__item__pic__hover">
                <li>
                  <a href="#"><i class="fa fa-heart"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-retweet"></i></a>
                </li>
                <li>
                  <a @click="addToCart(product.id)"
                    ><i class="fa fa-shopping-cart"></i
                  ></a>
                </li>
              </ul>
            </div>
            <div class="featured__item__text">
              <h6>
                <router-link
                  :to="{
                    name: 'product',
                    params: { id: product.id },
                  }"
                  >{{ product.name }}</router-link
                >
              </h6>
              <div class="product__item__price">
                {{ product.priceNew | vnd }}
                <span v-if="product.priceOld">{{
                  product.priceOld | vnd
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Featured Section End -->
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["deal"],
  mounted() {},
  computed: {
    dealProducts() {
      return this.getDealsProduct(this.deal.id);
    },
    ...mapActions["addToCart"],
  },
  methods: {
    percent(product) {
      return Math.round(100 - product.priceNew / (product.priceOld / 100));
    },
    productById(productId) {
      return this.$store.getters.productById(productId);
    },
    getDealsProduct(dealId) {
      // console.log("getDealsProduct", this.$store.getters.getDealsProduct(dealId));
      return this.$store.getters.getDealsProduct(dealId);
    },
  },
  watch: {},
};
</script>

<style></style>
