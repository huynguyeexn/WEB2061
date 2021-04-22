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
                <form @submit="checkForm">

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
                      v-model="form.name"
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
                      v-model="form.thumb"
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
                      v-model="form.priceOld"
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
                      v-model="form.priceNew"
                      type="number"
                      name="priceNew"
                    />
                  </div>
                  <!-- info -->
                  <div class="form-group">
                    <label for="info">Mô tả sản phẩm</label>
                    <vue-editor v-model="form.info"></vue-editor>
                  </div>
                  <!-- quantity -->
                  <div class="form-group">
                    <label for="quantity">Số lượng nhập kho</label>
                    <input
                      required
                      class="form-control"
                      id="quantity"
                      v-model="form.quantity"
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
                      <button type="submit" class="btn btn-primary">
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
import { mapActions } from 'vuex';
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      errors: [],
      form: {
        name: "",
        priceNew: 0,
        priceOld: 0,
        thumb: "",
        info: "",
        quantity: 0,
      },
    };
  },
  methods: {
    ...mapActions(["addProduct"]),
    checkForm(e) {
      e.preventDefault();

      this.errors = [];

      if (!this.form.name) {
        this.errors.push("Vui lòng nhập TÊN SẢN PHẨM.");
      }
      if (!this.errors.length) {
        this.addProduct(this.form);
        return true;
      }
    },
  },
};
</script>

<style>
</style>
