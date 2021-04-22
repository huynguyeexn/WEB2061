<template>
  <div class="">
    <Breadcrumb></Breadcrumb>
    <section class="product spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-5">
            <Sidebar></Sidebar>
          </div>
          <div class="col-lg-9 col-md-7">
            <ProductDiscount></ProductDiscount>

            <Loading :loading="loading"></Loading>
            <div v-if="data">
              <div class="filter__item">
                <div class="row">
                  <div class="col-lg-4 col-md-5">
                    <div class="filter__sort">
                      <span>Sắp xếp</span>
                      <select>
                        <option value="0">Mặc định</option>
                        <option value="0">Tên A-Z</option>
                        <option value="0">Tên Z-A</option>
                        <option value="0">Giá thấp đến cao</option>
                        <option value="0">Giá cao đến thấp</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-3">
                    <div class="filter__sort">
                      <span>Hiển thị</span>
                      <select v-model="limit">
                        <option v-bind:value="3">3</option>
                        <option v-bind:value="6">6</option>
                        <option v-bind:value="12">12</option>
                        <option v-bind:value="20">20</option>
                        <option v-bind:value="data.pagination._totalRows">Tất cả</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4">
                    <div class="filter__found">
                      <h6>
                        <span>{{ data.pagination._totalRows || 0 }}</span> Sản phẩm được
                        tìm thấy
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <h4
                v-if="Object.keys(data.data).length < 1 && loading === false"
                class="text-center"
              >
                <h3 class="m-2">
                  <strong class="text-danger">Lỗi!</strong>
                </h3>
                Không có sản phẩm nào được tìm thấy!
                <br />
                <router-link to="home" class="btn btn-primary m-2"
                  >Quay về trang chủ</router-link
                >
              </h4>
              <transition name="fade">
                <div v-if="!loading && data" class="row">
                  <div
                    v-for="product of data.data"
                    :key="product.id"
                    class="col-lg-4 col-md-6 col-sm-6"
                  >
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        :style="{
                          'background-image': 'url(' + product.thumb + ')',
                        }"
                      >
                        <div class="product__discount__percent" v-if="product.priceOld">
                          -{{ percent(product) }}%
                        </div>
                        <ul class="product__item__pic__hover">
                          <li>
                            <a href="#"><i class="fa fa-heart"></i></a>
                          </li>
                          <li>
                            <a href="#"><i class="fa fa-retweet"></i></a>
                          </li>
                          <li>
                            <a @click="addToCart(product.id, 1)"
                              ><i class="fa fa-shopping-cart"></i
                            ></a>
                          </li>
                        </ul>
                      </div>
                      <div class="product__item__text">
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
              </transition>
              <Pagination :pagination="data.pagination"></Pagination>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Sidebar from "@/components/site/shop/Sidebar.vue";
import ProductDiscount from "@/components/ProductDiscount.vue";

import { mapActions } from "vuex";
import Loading from "@/components/Loading.vue";
import Pagination from "@/components/site/shop/Pagination.vue";

import scrollToElement from "@/mixins/scrollToElement";

export default {
  props: ["route"],
  mixins: [scrollToElement],
  components: {
    Breadcrumb,
    Sidebar,
    ProductDiscount,
    Loading,
    Pagination,
  },
  data() {
    return {
      loading: true,
      page: this.$route.query.page || 1,
      limit: this.$route.query.limit || 12,
      data: null,
      catId: this.$route.params.id || 0,
    };
  },
  mounted() {
    this.productPage();
  },
  methods: {
    ...mapActions(["addToCart"]),
    productPage() {
      this.loading = true;
      let page = this.page || 1;
      let limit = this.limit || 12;
      return new Promise((resolve, reject) => {
        try {
          if (this.catId) {
            // getProductsByCatId
            this.$store.getters
              .catProductPage(page, limit, this.catId)
              .then((result) => resolve(result));
          } else {
            // getAllProduct
            this.$store.getters
              .productPage(page, limit)
              .then((result) => resolve(result));
          }
        } catch (error) {
          reject(error);
        }
      })
        .then((data) => (this.data = data))
        .finally(() => {
          this.loading = false;
          this.scrollToElement("filter__item");
        })
        .catch((error) => {
          console.log(error);
          this.data = {};
        });
    },
    percent(product) {
      return Math.round(100 - product.priceNew / (product.priceOld / 100));
    },
  },
  watch: {
    $route(to) {
      this.page = to.query.page || 1;
      this.limit = to.query.limit || 12;
      this.catId = this.$route.params.id || null;
      this.productPage();
    },
    limit(value) {
      this.productPage();
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
