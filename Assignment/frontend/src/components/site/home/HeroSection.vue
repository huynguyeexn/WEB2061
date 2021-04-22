<template>
  <!-- Hero Section Begin -->
  <section class="hero">
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="hero__categories">
            <div class="hero__categories__all">
              <i class="fa fa-bars"></i>
              <span>Danh mục</span>
            </div>
            <ul>
              <li v-for="category in categories.slice(0, 11)" :key="category.id">
                <a :href="category.slug">{{ category.name | uppercase }}</a>
              </li>

              <!-- <li><a href="#">Fresh Meat</a></li>
              <li><a href="#">Vegetables</a></li>
              <li><a href="#">Fruit & Nut Gifts</a></li>
              <li><a href="#">Fresh Berries</a></li>
              <li><a href="#">Ocean Foods</a></li>
              <li><a href="#">Butter & Eggs</a></li>
              <li><a href="#">Fastfood</a></li>
              <li><a href="#">Fresh Onion</a></li>
              <li><a href="#">Papayaya & Crisps</a></li>
              <li><a href="#">Oatmeal</a></li>
              <li><a href="#">Fresh Bananas</a></li> -->
            </ul>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="hero__search">
            <div class="hero__search__form">
              <form action="#">
                <input type="text" placeholder="Bạn cần tìm gì?..." />
                <button type="submit" class="site-btn">TÌM</button>
              </form>
            </div>
            <div class="hero__search__phone">
              <div class="hero__search__phone__icon">
                <i class="fa fa-phone fa-flip-horizontal"></i>
              </div>
              <div class="hero__search__phone__text">
                <h5>+84 11.188.888</h5>
                <span>Tổng đài hỗ trợ 24/7</span>
              </div>
            </div>
          </div>
          <div
            class="hero__item set-bg"
            :style="{
              'background-image': `url('${require('@/assets/img/hero/banner.png')}')`,
            }"
          >
            <div class="hero__text">
              <span class="h4">ƯU ĐÃI HOT</span>
              <h2>SẮM NGAY</h2>
              <h3>IPHONE 12 PRO MAX</h3>
              <h4>GIẢM NGAY 2 TRIỆU</h4>
              <p>Trả góp với lãi xuất 0%</p>
              <a href="#" class="primary-btn">MUA NGAY</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Hero Section End -->
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["categories"]),
  },
};
</script>

<style></style>
