<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Danh sách sản phẩm</h1>
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
              :to="{ name: 'adminAddProduct' }"
              class="btn btn-primary"
              role="button"
              >Thêm sản phẩm mới <i class="fa fa-plus" aria-hidden="true"></i
            ></router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <b-table
              id="products-table"
              :per-page="perPage"
              :current-page="currentPage"
              striped
              hover
              :items="products"
              :fields="fields"
            >
              <template #cell(id)="data">
                {{ data.item.id }}
              </template>

              <!-- A custom formatted column -->
              <template #cell(name)="data">
                <img
                  :src="data.item.thumb"
                  alt=""
                  style="height: 100px; width: 100px"
                />
                <strong>
                  {{ data.item.name }}
                </strong>
              </template>

              <!-- A custom formatted column -->
              <template #cell(priceNew)="data">
                {{ data.item.priceNew | vnd }}
                <p>
                  <del v-if="data.item.priceOld">
                    {{ data.item.priceOld | vnd }}
                  </del>
                </p>
              </template>
              <template #cell(views)="data">
                {{ data.item.views || 0 }}
                <i class="fa fa-eye" aria-hidden="true"></i>
              </template>
              <template #cell(quantity)="data">
                {{ data.item.quantity }}
                <i class="fas fa-box"></i>
              </template>
              <template #cell(action)="data">
                <router-link
                  :to="{ name: 'adminEditProduct', params: { id: data.item.id } }"
                  class="btn btn-primary"
                  >Sửa</router-link
                >
                <b-button :id="`popover-${data.item.id}`" variant="outline-danger"
                        >Xóa</b-button
                      >
                      <b-popover :target="`popover-${data.item.id}`" triggers="focus">
                        <template #title>Bạn chắc chứ!</template>
                        <div class="text-center">
                          <b-button @click="delProduct(data.item.id)" variant="danger"
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
              aria-controls="products-table"
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
        // A virtual column that doesn't exist in items
        { key: "id", label: "ID", sortable: true },
        // A column that needs custom formatting
        { key: "name", label: "Sản phẩm", sortable: true },
        // A regular column
        { key: "priceNew", label: "Giá", sortable: true },
        // A regular column
        { key: "views", label: "Lượt xem", sortable: true },
        { key: "quantity", label: "Tồn kho", sortable: true },
        { key: "action", label: "" },
      ],
    };
  },
  computed: {
    ...mapState(["products"]),
    rows() {
      return this.products.length;
    },
  },
  methods: {
    async delProduct(productId){
      await this.deleteProduct(productId).then((result) => {
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
    ...mapActions(["deleteProduct"])
  },
};
</script>

<style></style>
