import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/store";

// Page components
import AdminPage from "@/page/AdminPage";
import SitePage from "@/page/SitePage";
import UserPage from "@/page/UserPage";

// Site Page Components
import Home from "../views/site/Home.vue";
import Shop from "../views/site/Shop.vue";
import About from "../views/site/About.vue";
import Product from "../views/site/Product.vue";
import Cart from "../views/site/Cart.vue";

// Admin Page Components
import AdminHome from "../views/admin/Home.vue";


// Admin Product Page Components
import AdminProduct from "../views/admin/Product/Index.vue";
import AdminHomeProduct from "../views/admin/Product/Product.vue";
import AdminAddProduct from "../views/admin/Product/Add.vue";
import AdminEditProduct from "../views/admin/Product/Edit.vue";


// Admin Category Page Components
import AdminCategory from "../views/admin/Category/Index.vue";
import AdminHomeCategory from "../views/admin/Category/Category.vue";
import AdminAddCategory from "../views/admin/Category/Add.vue";
import AdminEditCategory from "../views/admin/Category/Edit.vue";


// Admin Order Page Components
import AdminOrder from "../views/admin/Order/Index.vue";
import AdminHomeOrder from "../views/admin/Order/Order.vue";
import AdminViewOrder from "../views/admin/Order/View.vue";

// User Page Components
import UserHome from "../views/user/User.vue";
import Login from "../views/user/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // You could also have named views at the top
    component: SitePage,
    children: [
      {
        name: "home",
        path: "/",
        component: Home,
        alias: "/home"
      },
      {
        name: "shop",
        path: "shop",
        component: Shop,
        props: route => ({ default: true, query: route.query.q })
      },
      {
        name: "categories",
        path: "categories/:id",
        component: Shop,
        props: route => ({ default: true, params: route.params.id })
      },
      {
        name: "about",
        path: "about",
        component: About
      },
      {
        name: "product",
        path: "product/:id",
        component: Product,
        props: route => ({ default: true, params: route.params.id })
      },
      {
        name: "cart",
        path: "cart",
        component: Cart
      }
    ]
  },
  {
    path: "/admin",
    component: AdminPage,
    children: [
      {
        name: "admin",
        path: "/",
        alias: "/home",
        component: AdminHome
      },
      {
        name: "adminProduct",
        path: "product",
        component: AdminProduct,
        children: [
          {
            path: "",
            component: AdminHomeProduct
          },
          {
            name: "adminAddProduct",
            path: "new",
            component: AdminAddProduct
          },
          {
            name: "adminEditProduct",
            path: "edit/:id",
            component: AdminEditProduct,
            props: route => ({ default: true, params: route.params.id })
          }
        ]
      },
      {
        name: "adminCategory",
        path: "category",
        component: AdminCategory,
        children: [
          {
            path: "",
            component: AdminHomeCategory
          },
          {
            name: "adminAddCategory",
            path: "new",
            component: AdminAddCategory
          },
          {
            name: "adminEditCategory",
            path: "edit/:id",
            component: AdminEditCategory,
            props: route => ({ default: true, params: route.params.id })
          }
        ]
      },
      {
        name: "adminOrder",
        path: "order",
        component: AdminOrder,
        children: [
          {
            path: "",
            component: AdminHomeOrder
          },
          {
            name: "adminViewOrder",
            path: "view/:id",
            component: AdminViewOrder,
            props: route => ({ default: true, params: route.params.id })
          }
        ]
      }
    ]
  },
  {
    path: "/user",
    component: UserPage,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("loadUser");
      // Nếu user đã đăng nhập thì quay về trang user
      if (store.state.user) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    children: [
      {
        name: "user",
        path: "/",
        alias: "/home",
        component: UserHome
      }
    ]
  },
  {
    name: "login",
    path: "/login",
    component: Login,
    beforeEnter: async (to, from, next) => {
      // Nếu user đã đăng nhập thì quay về trang user
      await store.dispatch("loadUser");
      if (store.state.user) {
        next({ name: "user" });
      } else {
        next();
      }
    }
  },
  {
    name: "logout",
    path: "/logout",
    component: Login,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("logOut");
      next({ name: "home" });
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: "active",
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  }
});

export default router;
