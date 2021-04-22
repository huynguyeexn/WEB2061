import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router/router";
import store from "./store/store";
import { BootstrapVue } from "bootstrap-vue";
import VueSweetalert2 from "vue-sweetalert2";
import VueMoment from "vue-moment";
import VueSocialSharing from "vue-social-sharing";
import VueFacebook from 'vue-facebook';

import "animate.css/animate.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueFacebook);
Vue.use(VueSocialSharing);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.use(VueMoment);
Vue.use(VueRouter);

Vue.filter("uppercase", function(value = "") {
  return value.toUpperCase();
});
Vue.filter("uppercaseFirst", function(value = "") {
  return (
    value
      .toLowerCase()
      .charAt(0)
      .toUpperCase() + value.slice(1)
  );
});
Vue.filter("vnd", function(value) {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND"
  }).format(value);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
});
