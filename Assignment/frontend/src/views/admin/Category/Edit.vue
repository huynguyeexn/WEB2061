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
                    <label for="name">Tên danh mục</label>
                    <input
                      class="form-control"
                      id="name"
                      v-model="currentCategory.name"
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

                      <button class="btn btn-primary" disabled v-if="onSave">
                        <span
                          class="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Lưu danh mục...
                      </button>
                      <button type="submit" class="btn btn-primary" v-else>
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
      categoryId: Number.parseInt(this.$route.params.id),
      category: null,
    };
  },
  created() {
    this.loading = true;
    this.categoryById(Number.parseInt(this.$route.params.id)).then(() => {
      this.loading = false;
      this.category = this.currentCategory;
    });
  },
  computed: {
    ...mapState(["currentCategory"]),
  },
  methods: {
    ...mapActions(["categoryById", "updateCategory"]),
    checkForm(e) {
      e.preventDefault();

      this.errors = [];
      if (!this.currentCategory.name) {
        this.errors.push("Vui lòng nhập TÊN danh mục.");
      }
      if (!this.errors.length) {
        this.onSave = true;
        this.updateCategory(this.currentCategory)
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
                    this.$router.push({ path: '/admin/category'});
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
