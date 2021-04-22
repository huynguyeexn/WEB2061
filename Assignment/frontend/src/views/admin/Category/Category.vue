<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Danh sách danh mục</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Starter Page</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 mb-3">
            <router-link
              :to="{ name: 'adminAddCategory' }"
              class="btn btn-primary"
              role="button"
              >Thêm danh mục mới <i class="fa fa-plus" aria-hidden="true"></i
            ></router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <b-table
              id="categories-table"
              :per-page="perPage"
              :current-page="currentPage"
              striped
              hover
              :items="categories"
              :fields="fields"
            >
              <template #cell(id)="data">
                {{ data.item.id }}
              </template>

              <template #cell(name)="data">
                <strong>
                  {{ data.item.name }}
                </strong>
              </template>

              <template #cell(action)="data">
                <router-link
                  :to="{ name: 'adminEditCategory', params: { id: data.item.id } }"
                  class="btn btn-primary"
                  >Sửa</router-link
                >
                <b-button :id="`popover-${data.item.id}`" variant="outline-danger"
                        >Xóa</b-button
                      >
                      <b-popover :target="`popover-${data.item.id}`" triggers="focus">
                        <template #title>Bạn chắc chứ!</template>
                        <div class="text-center">
                          <b-button @click="delCategory(data.item.id)" variant="danger"
                            >Xóa</b-button
                          >
                        </div>
                      </b-popover>
              </template>
            </b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="categories-table"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- /.content -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "danh mục", sortable: true },
        { key: "action", label: "" },
      ],
    };
  },
  computed: {
    ...mapState(["categories"]),
    rows() {
      return this.categories.length;
    },
  },
  methods: {
    async delCategory(categoryId){
      await this.deleteCategory(categoryId).then((result) => {
        if (result.status === 200) {
            this.$swal({
              title: "Xóa thành công!",
              icon: "success",
              confirmButtonText: "Oke",
            });
          }
      }).catch((err) => {

      });
    },
    ...mapActions(["deleteCategory"])
  },
};
</script>

<style></style>
