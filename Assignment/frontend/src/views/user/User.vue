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
    <section class="content">
      <div class="container-fluid">
        <div class="row" v-if="loading == true">
          loading
        </div>
        <div class="row" v-else>
          <div class="col-12" v-for="item of userOrder" :key="item.id">
            <div class="card card-outline card-primary">
              <div class="card-header bg-white">
                <div class="row">
                  <div class="col-6">
                    <h3 class="card-title">Đơn hàng <strong>#{{item.id}}</strong></h3>
                  </div>
                  <div class="col-6">
                    <div class="badge badge-primary float-right" v-if="item.status == 1">
                      Đang chuẩn bị hàng
                    </div>
                    <div class="badge badge-info float-right" v-if="item.status == 2">
                      Đã gói hàng
                    </div>
                    <div class="badge badge-warning float-right" v-if="item.status == 3">
                      Đang giao
                    </div>
                    <div class="badge badge-success float-right" v-if="item.status == 4">
                      Đã giao hàng
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-4">
                    Ngày đặt hàng: <strong>{{item.createdAt | moment("hh:mm - DD/MM/YYYY")}}</strong>
                  </div>
                  <div class="col-md-4">
                    Ngày giao hàng dự kiến: <strong>{{item.createdAt | moment('add', '6 days', "DD/MM/YYYY")}}</strong>
                  </div>
                  <div class="col-md-4">
                    Tổng đơn hàng: <strong>{{item.total | vnd}}</strong>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <b-table striped hover :items="item.products" :fields="fields">
                      <template #cell(index)="data">
                        <strong>
                        #{{ data.index + 1 }}
                        </strong>
                      </template>

                      <!-- A custom formatted column -->
                      <template #cell(name)="data">
                        <img
                          :src="data.item.thumb"
                          alt=""
                          style="height: 50px; width: 50px"
                        />
                        {{ data.item.name }}
                      </template>

                      <!-- A custom formatted column -->
                      <template #cell(priceNew)="data">
                        {{ data.item.priceNew | vnd }}
                      </template>
                      <template #cell(amount)="data">
                        x{{ data.item.amount }}
                      </template>
                      <template #cell(total)="data">
                        {{ data.item.amount * data.item.priceNew | vnd }}
                      </template>
                    </b-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: true,
      fields: [
        // A virtual column that doesn't exist in items
        { key: "index", label: "" },
        // A column that needs custom formatting
        { key: "name", label: "Sản phẩm" },
        // A regular column
        { key: "priceNew", label: "Giá" },
        // A regular column
        { key: "amount", label: "Số lượng" },
        { key: "total", label: "Tổng" },
      ],
    };
  },
  created() {
    this.$store.dispatch("loadOrderByUser").then(()=> this.loading = false);
  },
  computed: {
    ...mapState(["userOrder", "products"]),
  },
};
</script>

<style></style>
