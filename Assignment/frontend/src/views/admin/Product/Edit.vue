<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Thêm mới sản phẩm</h1>
          </div>
          <div class="col-sm-6"></div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-outline card-primary">
              <div class="card-body">
                <p v-if="loading">Loading</p>
                <form @submit="checkForm" v-else>
                  <div class="form-group" v-if="errors.length > 0">
                    <div class="callout callout-danger">
                      <p v-for="(error, index) of errors" :key="index">
                        {{ error }}
                      </p>
                    </div>
                  </div>
                  <!-- name -->
                  <div class="form-group">
                    <label for="name">Tên sản phẩm</label>
                    <input
                      class="form-control"
                      id="name"
                      v-model="currentProduct.name"
                      type="text"
                      name="name"
                      placeholder="Nhập tên sản phẩm..."
                    />
                  </div>
                  <!-- thumb -->
                  <div class="form-group">
                    <label for="thumb">Ảnh sản phẩm</label>
                    <input
                      required
                      class="form-control"
                      id="thumb"
                      v-model="currentProduct.thumb"
                      type="text"
                      name="thumb"
                      placeholder="Nhập link ảnh sản phẩm..."
                    />
                  </div>
                  <!-- priceNew -->
                  <div class="form-group">
                    <label for="priceOld">Giá sản phẩm</label>
                    <input
                      required
                      class="form-control"
                      id="priceOld"
                      v-model="currentProduct.priceOld"
                      type="number"
                      name="priceOld"
                    />
                  </div>
                  <!-- priceOld -->
                  <div class="form-group">
                    <label for="priceNew">Giá khuyến mãi</label>
                    <input
                      required
                      class="form-control"
                      id="priceNew"
                      v-model="currentProduct.priceNew"
                      type="number"
                      name="priceNew"
                    />
                  </div>
                  <!-- info -->
                  <div class="form-group">
                    <label for="info">Mô tả sản phẩm</label>
                    <vue-editor v-model="currentProduct.info"></vue-editor>
                  </div>
                  <!-- quantity -->
                  <div class="form-group">
                    <label for="quantity">Số lượng nhập kho</label>
                    <input
                      required
                      class="form-control"
                      id="quantity"
                      v-model="currentProduct.quantity"
                      type="number"
                      name="quantity"
                    />
                  </div>
                  <div class="form-group" v-if="errors.length > 0">
                    <div class="callout callout-danger">
                      <p v-for="(error, index) of errors" :key="index">
                        {{ error }}
                      </p>
                    </div>
                  </div>
                  <div class="cart-footer d-flex justify-content-end">
                    <div class="form-group">
                      <button type="button" class="btn btn-outline-secondary">
                        Quay về
                      </button>
                      <button type="button" class="btn btn-outline-danger">
                        Reset
                      </button>

                      <button class="btn btn-primary" disabled v-if="onSave">
                        <span
                          class="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Lưu sản phẩm...
                      </button>
                      <button type="submit" class="btn btn-primary" v-else>
                        Lưu sản phẩm
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      onSave: false,
      loading: true,
      errors: [],
      productId: Number.parseInt(this.$route.params.id),
      product: null,
    };
  },
  created() {
    this.loading = true;
    this.productById(Number.parseInt(this.$route.params.id)).then(() => {
      this.loading = false;
      this.product = this.currentProduct;
    });
  },
  computed: {
    ...mapState(["currentProduct"]),
  },
  methods: {
    ...mapActions(["productById", "updateProduct"]),
    checkForm(e) {
      e.preventDefault();

      this.errors = [];
      if (!this.currentProduct.name) {
        this.errors.push("Vui lòng nhập TÊN SẢN PHẨM.");
      }
      if (!this.errors.length) {
        this.onSave = true;
        this.updateProduct(this.currentProduct)
          .then((res) => {
            if (res.status === 200) {
              this.$swal({
                title: "Lưu thành công!",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Oke",
                cancelButtonText: 'Quay về trang danh sách',
              }).then((res) => {
                if(res.isDismissed){
                    this.$router.push({ path: '/admin/product'});
                }
              });
            }
          })
          .then(() => {
            setTimeout(() => {
              return (this.onSave = false);
            }, 500);
          });
        return true;
      }
    },
  },
};
</script>

<style>
</style>
