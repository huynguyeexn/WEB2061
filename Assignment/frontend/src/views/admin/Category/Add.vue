<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Thêm mới danh mục</h1>
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
                    <label for="name">Tên danh mục</label>
                    <input
                      class="form-control"
                      id="name"
                      v-model="form.name"
                      type="text"
                      name="name"
                      placeholder="Nhập tên danh mục..."
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
                        Lưu danh mục
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
      },
    };
  },
  methods: {
    ...mapActions(["addCategory"]),
    checkForm(e) {
      e.preventDefault();

      this.errors = [];

      if (!this.form.name) {
        this.errors.push("Vui lòng nhập TÊN SẢN PHẨM.");
      }
      if (!this.errors.length) {
        this.addCategory(this.form);
        return true;
      }
    },
  },
};
</script>

<style>
</style>
