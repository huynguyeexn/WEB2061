<template>
  <div class="product__pagination">
    <router-link :to="{ name: routeName, query: { page: 1, limit: limit } }">
      <i class="fa fa-angle-double-left" aria-hidden="true"></i>
    </router-link>
    <router-link
      :to="{
        name: routeName,
        query: { page: currentPage - 1 || 1, limit: limit },
      }"
    >
      <i class="fas fa-arrow-left" aria-hidden="true"></i>
    </router-link>

    <!-- Number Link -->
    <router-link
      v-for="n in lastPage > 5 ? 5 : lastPage"
      :key="n"
      :to="{
        name: routeName,
        query: {
          page: getPageActive(n),
          limit: limit,
        },
      }"
      :class="{
        active: currentPage === getPageActive(n),
      }"
    >
      {{ getPageActive(n) }}
    </router-link>
    <!-- End Number Link -->

    <router-link
      :to="{
        name: routeName,
        query: {
          page: currentPage + 1 > lastPage ? currentPage : currentPage + 1,
          limit: limit,
        },
      }"
    >
      <i class="fas fa-arrow-right" aria-hidden="true"></i>
    </router-link>
    <router-link
      :to="{ name: routeName, query: { page: lastPage, limit: limit } }"
    >
      <i class="fa fa-angle-double-right" aria-hidden="true"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["pagination"],
  data() {
    return {
      routeName: this.$route.name,
      currentPage: this.pagination._page,
      lastPage: this.pagination._lastPage,
      limit: this.pagination._limit || 12,
    };
  },
  methods: {
    getPageActive(n) {
      if (this.currentPage >= 3) {
        if (this.currentPage >= this.lastPage - 2) {
          return n + this.lastPage - 5;
        }
        return n + this.currentPage - 3;
      } else {
        return n;
      }
    },
  },
  watch: {
    pagination() {
      this.currentPage = this.pagination._page;
      this.lastPage = this.pagination._lastPage;
      this.limit = this.pagination._limit;
      this.routeName = this.$route.name;
    },
  },
};
</script>

<style>
</style>
