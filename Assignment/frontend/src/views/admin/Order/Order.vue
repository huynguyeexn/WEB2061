<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Danh sách đơn hàng</h1>
          </div>
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
              >Thêm đơn hàng mới <i class="fa fa-plus" aria-hidden="true"></i
            ></router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-12" v-if="loading">loading...</div>
          <div class="col-12" v-else>
            <b-table
              id="orders-table"
              :per-page="perPage"
              :current-page="currentPage"
              striped
              hover
              :items="orders"
              :fields="fields"
            >
              <template #cell(id)="data">
                {{ data.item.id }}
              </template>
              <template #cell(createdAt)="data">
                {{ data.item.createdAt | moment("hh:mm - DD/MM/YYYY") }}
              </template>

              <template #cell(total)="data">
                <strong>{{ data.item.total | vnd }}</strong>
              </template>

              <template #cell(status)="data" :class="'text-center'">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-outline-primary" :class="{ active: data.item.status === 1}">
                    <input type="radio" name="options" id="option_a1" autocomplete="off" @click="updateStatus(data.item.id, 1)">Đang chuẩn bị
                  </label>
                  <label class="btn btn-outline-info" :class="{ active: data.item.status === 2}">
                    <input type="radio" name="options" id="option_a2" autocomplete="off"  @click="updateStatus(data.item.id, 2)"> Đã gói hàng
                  </label>
                  <label class="btn btn-outline-warning" :class="{ active: data.item.status === 3}">
                    <input type="radio" name="options" id="option_a3" autocomplete="off"  @click="updateStatus(data.item.id, 3)"> Đã gửi
                  </label>
                  <label class="btn btn-outline-success" :class="{ active: data.item.status === 4}">
                    <input type="radio" name="options" id="option_a4" autocomplete="off"  @click="updateStatus(data.item.id, 4)"> Đã giao
                  </label>
                </div>
              </template>
            </b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="orders-table"
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
      loading: true,
      perPage: 10,
      currentPage: 1,
      fields: [
        // A virtual column that doesn't exist in items
        { key: "id", label: "ID", sortable: true },
        { key: "createdAt", label: "ngày đặt", sortable: true },
        { key: "total", label: "tổng tiền", sortable: true },
        { key: "status", label: "trạng thái", sortable: true , tdClass: 'text-center'},
      ],
    };
  },
  async created() {
    await this.loadOrder();
    this.loading = false;
  },
  computed: {
    ...mapState(["orders"]),
    rows() {
      return this.orders.length;
    },
  },
  methods: {
    async updateStatus(orderId, status){
      await this.updateOrderStatus({orderId: orderId, status: status});
      this.loadOrder();
    },
    ...mapActions(["deleteProduct", "loadOrder", "updateOrderStatus"]),
  },
};
</script>

<style></style>
