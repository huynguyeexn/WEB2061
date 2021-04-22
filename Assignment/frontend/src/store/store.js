import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";

Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.config.devtools = true;
export default new Vuex.Store({
  state: {
    categories: [],
    products: [],
    deals: [],
    productPage: [],
    currentProduct: [],
    currentCategory: [],
    cart: {},
    user: null,
    userOrder: null,
    orders: null
  },
  mutations: {
    SET_CATEGORIES(state, value) {
      state.categories = [...value];
    },
    SET_PRODUCTS(state, value) {
      state.products = value;
    },
    SET_DEALS(state, value) {
      state.deals = [...value];
    },
    SET_PRODUCT_PAGE(state, value) {
      state.productPage = { ...value };
    },
    SET_CURRENT_PRODUCT(state, value) {
      state.currentProduct = { ...value };
    },
    SET_CART(state, value) {
      /**
       * Lưu dữ liệu vào state.cart
       * 1. Nếu object input = NULL
       *  => Thì lưu vào state và localStorage = NULL
       *
       * 2. Nếu object input != NULL
       *  => Thì lưu vào state = object input
       *  => lưu vào localStorage object {productID, amount};
       *
       * @input object {amount, product detail}
       * @output set state.cart = object input
       */
      let result = {
        localStorage: null,
        state: null
      };
      if (value !== null) {
        result.state = value;

        result.localStorage = value.map(el => {
          return { amount: el.amount, id: el.id };
        });
      }
      state.cart = result.state;

      localStorage.setItem("cart", JSON.stringify(result.localStorage));
    },
    SET_USER(state, value) {
      if (value) {
        delete value.password;
        document.cookie = "user=" + JSON.stringify(value);
      }

      state.user = value;
    },
    SET_USER_ORDERS(state, value) {
      state.userOrder = value;
    },
    SET_ORDERS(state, value) {
      state.orders = value;
    },
    SET_CURRENT_CATEGORY(state, value) {
      state.currentCategory = { ...value };
    }
  },
  actions: {
    async loadCategories({ commit }) {
      let data = await Vue.axios.get(
        "http://localhost:3000/api/categories?_sort=createdAt&_order=desc"
      );
      data = data.data;
      commit("SET_CATEGORIES", data);
      return data;
    },
    async loadProducts({ commit }) {
      let data = await Vue.axios.get(
        "http://localhost:3000/api/products?_sort=createdAt&_order=desc"
      );
      data = data.data;
      commit("SET_PRODUCTS", data);
      return data;
    },
    loadDeals({ commit }) {
      Vue.axios
        .get("http://localhost:3000/api/deals")
        .then(res => res.data)
        .then(deals => commit("SET_DEALS", deals));
    },
    loadProductPage({ commit }, page = 1, limit = 10) {
      Vue.axios
        .get(`http://localhost:3000/api/products?_page=${page}&limit=${limit}`)
        .then(res => res.data)
        .then(data => commit("SET_PRODUCT_PAGE", data));
    },
    async productById({ commit }, productId) {
      await Vue.axios
        .get(`http://localhost:3000/api/products/` + productId)
        .then(res => res.data)
        .then(data => commit("SET_CURRENT_PRODUCT", data));
    },
    async productsByCategory({ commit }, categoryId) {
      let data = await Vue.axios.get(
        `http://localhost:3000/api/categories/${categoryId}/products`
      );
      console.log(categoryId, data);
      return data;
    },
    async loadCart({ commit, getters, state, dispatch }) {
      /**
       * Lấy giỏ hàng từ LocalStorage
       * 1. Nếu localStorage trả về [null]
       *    => thì commit tới SET_CART với value = null
       * 2. Nếu localStorage trả về mảng sản phẩm
       *    => thì commit tới SET_CART object = { amount, ...product_detail }
       *
       *
       * @input ()
       * @ouput commit tới SET_CART với object = { amount, ...product_detail }
       *         hoặc null nếu localStorage = null
       *
       */

      // Load lại sản phảm trước khi xử lý Cart
      await dispatch("loadProducts");

      let result;
      let products = state.products;

      let cart = localStorage.getItem("cart") || null;
      cart = JSON.parse(cart);

      if (cart === null) {
        result = null;
      } else {
        try {
          result = cart.map(cartItem => {
            // Lấy sản phẩm ứng với id của cartItem
            let product = products.find(
              productItem => productItem.id === cartItem.id
            );

            let result = {
              amount: cartItem.amount,
              ...product
            };
            return result;
          });
        } catch (error) {
          return console.error(error);
        }
      }
      commit("SET_CART", result);
    },
    async addToCart({ commit, state, dispatch }, productId, amount = 1) {
      /**
       * Thêm sản phẩm vào giỏ hàng
       * 1. Nếu sản phẩm chưa có thì thêm vào với amount = 1;
       * 2. Nêu sản phẩm đã có trong giỏ thì amount + 1;
       *
       * @input (productID, amount = 1)
       * @output commit tới SET_CART với object = { amount, ...product_detail }
       *
       */
      // Load lại sản phảm trước khi xử lý Cart
      await dispatch("loadProducts");
      await dispatch("loadCart");

      let index = -1;
      let cart = state.cart;
      let products = state.products;

      // Lấy vị trí của sản phẩm trong giỏ hàng.
      if (cart === null) {
        let product = products.find(el => el.id === productId);
        // cart = [{ amount: amount, ...product }];
      }
      try {
        index = cart.findIndex(el => el.id === productId);
      } catch (error) {
        return console.error(error);
      }

      // Nếu sản phẩm tồn tại trong giỏ hàng
      if (index > -1) {
        // Nếu số lượng trong giỏ <= quantity của product
        // Thì cho phép thêm
        if (
          cart[index].amount + 1 <=
          products.find(el => el.id === productId).quantity
        ) {
          ++cart[index].amount;
        }
      }

      // Nếu sản phẩm KHÔNG tồn tại trong giỏ hàng
      else {
        try {
          let product = products.find(el => el.id === productId);
          cart.push({ amount: amount, ...product });
        } catch (error) {
          return console.error(error);
        }
      }
      commit("SET_CART", cart);
    },
    async deleteCart({ commit, state, dispatch }, productId) {
      /**
       * Xóa sản phẩm trong giỏ hàng
       * 1. Nếu sản phẩm tồn tại thì xóa
       * 2. Nêu sản phẩm không tồn tại thì không làm gì
       *
       * @input (productID, amount = 1)
       * @output commit tới SET_CART với object = { amount, ...product_detail }
       *
       */
      // Load lại sản phảm trước khi xử lý Cart
      await dispatch("loadProducts");
      await dispatch("loadCart");

      let index = -1;
      let cart = state.cart;
      try {
        index = cart.findIndex(el => el.id === productId);
      } catch (error) {
        return console.error(error);
      }
      // Nếu sản phẩm tồn tại trong giỏ hàng
      if (index > -1) {
        cart.splice(index, 1);
      }

      commit("SET_CART", cart);
    },
    async clearCart({ commit }) {
      commit("SET_CART", null);
    },
    async addOrder({ commit, state, dispatch }) {
      let data = state.cart.map(el => {
        let result = {
          id: el.id,
          categoryId: el.categoryId,
          name: el.name,
          priceNew: el.priceNew,
          priceOld: el.priceOld,
          thumb: el.thumb,
          amount: el.amount
        };
        return result;
      });

      data = {
        userId: state.user.id,
        total: state.cart.reduce((a, b) => a + b.amount * b.priceNew, 0),
        products: [...data]
      };
      await Vue.axios
        .post("http://localhost:3000/api/orders", data)
        .then(function(response) {
          dispatch("clearCart");
          return response;
        })
        .catch(function(error) {
          return error;
        });
    },
    async loadOrder({ commit }) {
      let data = await axios.get(
        "http://localhost:3000/api/orders?_sort=createdAt&_order=desc"
      );
      data = data.data;
      commit("SET_ORDERS", data);
    },
    async updateOrderStatus({ commit }, data) {
      console.log(data);
      let result = await axios.patch(
        `http://localhost:3000/api/orders/${data.orderId}`,
        { status: data.status }
      );
      console.log(result);

      return result;
      // commit("SET_ORDERS", data);
    },
    async login({ commit }, data) {
      try {
        let result = await Vue.axios.get(
          `http://localhost:3000/api/users?email=${data.email}&password=${data.password}`
        );
        if (result.data) {
          result = result.data[0];
        } else {
          result = null;
        }
        commit("SET_USER", result);
      } catch (error) {
        throw error;
      }
    },
    async loadUser({ commit }) {
      let cookie = await VueCookies.get("user");
      commit("SET_USER", cookie);
      return cookie;
    },
    logOut({ commit }) {
      VueCookies.remove("user");
      commit("SET_USER", null);
      return null;
    },
    async loadOrderByUser({ commit, state, dispatch }, userId = null) {
      await dispatch("loadUser");
      if (userId == null && state.user.id) {
        userId = state.user.id;
      }
      let data = await Vue.axios.get(
        "http://localhost:3000/api/orders?_userId=" +
          userId +
          "&_page=1&_sort=createdAt&_order=desc"
      );
      data = data.data;
      data = data.data;
      commit("SET_USER_ORDERS", data);
      return data;
    },
    async addProduct({ dispatch }, data) {
      let result;
      await Vue.axios
        .post("http://localhost:3000/api/products", data)
        .then(res => (result = res))
        .then(() => dispatch("loadProducts"))
        .catch(function(error) {
          return error;
        });
      return result;
    },
    async updateProduct({ dispatch }, product) {
      let result;
      await Vue.axios
        .put(`http://localhost:3000/api/products/${product.id}`, product)
        .then(res => (result = res))
        .then(() => dispatch("loadProducts"))
        .catch(function(error) {
          return error;
        });
      return result;
    },
    async deleteProduct({ dispatch }, productId) {
      let result;
      await Vue.axios
        .delete(`http://localhost:3000/api/products/${productId}`)
        .then(res => (result = res))
        .then(() => dispatch("loadProducts"))
        .catch(function(error) {
          return error;
        });
      return result;
    },
    async categoryById({ commit }, categoryId) {
      await Vue.axios
        .get(`http://localhost:3000/api/categories/` + categoryId)
        .then(res => res.data)
        .then(data => commit("SET_CURRENT_CATEGORY", data));
    },
    async addCategory({ dispatch }, data) {
      let result;
      await Vue.axios
        .post("http://localhost:3000/api/categories", data)
        .then(res => (result = res))
        .then(() => dispatch("loadCategories"))
        .catch(function(error) {
          return error;
        });
      return result;
    },
    async updateCategory({ dispatch }, category) {
      let result;
      await Vue.axios
        .put(`http://localhost:3000/api/categories/${category.id}`, category)
        .then(res => (result = res))
        .then(() => dispatch("loadCategories"))
        .catch(function(error) {
          return error;
        });
      return result;
    },
    async deleteCategory({ dispatch }, categoryId) {
      let result;
      await Vue.axios
        .delete(`http://localhost:3000/api/categories/${categoryId}`)
        .then(res => (result = res))
        .then(() => dispatch("loadCategories"))
        .catch(function(error) {
          return error;
        });
      return result;
    },
    // async addComment({ dispatch }, data) {
    //   let result = await await Vue.axios
    //     .patch(`http://localhost:3000/api/products/${data.productId}`, {})
    //     .then(res => (result = res));
    // }
  },
  getters: {
    productById: state => productId => {
      return state.products.find(x => x.id == productId);
    },
    getDealsProduct: state => dealId => {
      let result = [];
      let deal = state.deals.find(deal => deal.id === dealId);
      if (deal) {
        result = state.products.filter(product => {
          if (deal.products.includes(product.id)) return product;
        });
      }
      return result;
    },
    dealById: (state, dispatch) => dealId => {
      let result = [];
      result = state.deals.find(x => x.id == dealId);
      return result;
    },
    productPage: state => (page = 1, limit = 10) => {
      return Vue.axios
        .get(`http://localhost:3000/api/products?_page=${page}&_limit=${limit}`)
        .then(res => res.data)
        .then(data => data);
    },
    catProductPage: state => (page = 1, limit = 10, catId) => {
      return Vue.axios
        .get(
          `http://localhost:3000/api/categories/${catId}/products?_page=${page}&_limit=${limit}`
        )
        .then(res => res.data)
        .then(data => data);
    },
    orderFromTo: (state, dispatch) => async (from, to) => {
      let data = await new Promise(resolve => {
        axios
          .get(
            `http://localhost:3000/api/orders?createdAt_gte=${to}&createdAt_lte=${from}`
          )
          .then(result =>
            result.data.map(el => {
              return {
                production: el.products.reduce((a, b) => a + b.amount, 0),
                sales: el.products.reduce((a, b) => a + b.priceNew, 0)
              };
            })
          )
          .then(result => {
            resolve({
              products: result.reduce((a, b) => a + b.production, 0),
              orders: result.length,
              sales: result.reduce((a, b) => a + b.sales, 0)
            });
          });
      });
      return { unix: from, data: data };
    }
  }
});
