<template>
  <!-- Header Section Begin -->
  <header class="header">
    <div class="header__top">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="header__top__left">
              <ul>
                <li>
                  <i class="fas fa-envelope"></i>
                  huynguyeexn@gmail.com
                </li>
                <li>
                  Miễn phí giao hàng toàn quốc
                  <i class="fa fa-truck" aria-hidden="true"></i>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="header__top__right">
              <div class="header__top__right__social">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                <a href="#"><i class="fab fa-pinterest-p"></i></a>
              </div>

              <div class="header__top__right__auth">
                <router-link v-if="!user" :to="{ name: 'login' }"
                  ><i class="fas fa-user"></i> Đăng nhập</router-link
                >
                <router-link v-if="user" :to="{ name: 'user' }"
                  ><i class="fas fa-user"></i> Tài khoản</router-link
                >
              </div>
              <div v-if="user" class="header__top__right__auth ml-3">
                <router-link :to="{ name: 'logout' }"
                  >
                  <i class="fas fa-door-open"></i>Đăng xuất
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="header__logo">
            <router-link to="/">
              <img src="@/assets/img/logo.png" alt="" />
            </router-link>
          </div>
        </div>
        <div class="col-lg-6">
          <nav class="header__menu">
            <ul>
              <li class="active">
                <router-link :to="{ name: 'home' }">Trang chủ</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'shop' }">Cửa hàng</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'cart' }">Giỏ hàng</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'about' }">Liên hệ</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-lg-3">
          <div class="header__cart">
            <ul>
              <li>
                <a href="#"><i class="fas fa-heart"></i> <span>1</span></a>
              </li>
              |
              <li>
                <router-link :to="{ name: 'cart' }"
                  ><i class="fas fa-shopping-bag"></i>
                  <span>{{ cartAmount }}</span></router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="humberger__open">
        <i class="fas fa-bars"></i>
      </div>
    </div>
  </header>
  <!-- Header Section End -->
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["cart", "user"]),
    cartAmount() {
      let result = 0;

      // console.log(this.cart, this.cart.length);
      if (this.cart && this.cart.length) {
        result = this.cart.reduce((a, b) => {
          return a + Number.parseInt(b.amount);
        }, 0);
      }
      return result;
    },
  },
};
</script>

<style></style>
