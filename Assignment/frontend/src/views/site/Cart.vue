<template>
  <section class="shoping-cart spad">
    <div class="container" v-if="cart == null || cart.length < 1">
      <div class="col-12 text-center m-2">
        <h4>
          <strong>Bạn chưa có sản phẩm trong giỏ hàng!</strong>
        </h4>
      </div>
      <div class="col-lg-12">
        <div class="shoping__cart__btns text-center">
          <a href="#" class="primary-btn cart-btn">TIẾP TỤC MUA HÀNG</a>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row">
        <div class="col-lg-12">
          <div class="shoping__cart__table">
            <table>
              <thead>
                <tr>
                  <th class="shoping__product">Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product of cart" :key="product.id">
                  <td class="shoping__cart__item">
                    <img :src="product.thumb" style="height: 100px; width: 100px" />
                    <h5>
                      <strong>
                        {{ product.name }}
                      </strong>
                    </h5>
                  </td>
                  <td class="shoping__cart__price">
                    {{ product.priceNew | vnd }}
                    <small v-if="product.priceOld" class="text-muted">
                      <del>
                        {{ product.priceOld | vnd }}
                      </del>
                    </small>
                  </td>
                  <td class="shoping__cart__quantity">
                    <div class="quantity">
                      <div class="pro-qty">
                        <input
                          type="number"
                          v-model="product.amount"
                          min="1"
                          :max="product.quantity"
                        />
                      </div>
                    </div>
                  </td>
                  <td class="shoping__cart__total">
                    {{ (product.priceNew * product.amount) | vnd }}
                  </td>
                  <td class="shoping__cart__item__close">
                    <!-- <span class="icon_close"></span> -->
                    <div class="text-center">
                      <b-button :id="`popover-${product.id}`" variant="outline-danger"
                        >Xóa</b-button
                      >
                      <b-popover :target="`popover-${product.id}`" triggers="focus">
                        <template #title>Bạn chắc chứ!</template>
                        <div class="text-center">
                          <b-button @click="deleteCart(product.id)" variant="danger"
                            >Xóa</b-button
                          >
                        </div>
                      </b-popover>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="shoping__cart__btns">
            <a href="#" class="primary-btn cart-btn">TIẾP TỤC MUA HÀNG</a>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="shoping__continue">
            <div class="shoping__discount">
              <h5>Mã giảm giá</h5>
              <form action="#">
                <input type="text" placeholder="Nhập vào mã giảm giá của bạn" />
                <button type="submit" class="site-btn">ÁP DỤNG</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="shoping__checkout">
            <h5>Thành tiền</h5>
            <ul>
              <li>Tạm tính <span>$454.98</span></li>
              <li>Tổng thành tiền <span>$454.98</span></li>
            </ul>
            <router-link v-if="!user" to="login" class="primary-btn">ĐĂNG NHẬP ĐỂ THANH TOÁN</router-link>
            <a v-if="user" class="primary-btn" @click="$bvModal.show('modal-payment')">THANH TOÁN ĐƠN HÀNG</a>
          </div>
        </div>
      </div>
    </div>
    <Payment></Payment>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Payment from '@/components/site/cart/Payment.vue';
export default {
  components: {
    Payment
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["cart", 'user']),
  },
  methods: {
    ...mapActions(["deleteCart"]),
  },
  watch: {
    cart: {
      handler: function (val) {
        if (val && val.length) {
        val.map((el) => (el.amount = Number.parseInt(el.amount)));
        this.$store.commit("SET_CART", val);
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
