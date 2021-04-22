<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Trang quản trị website</h1>
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
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-lg-3 col-6">
                <!-- small card -->
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>{{ monthOrder }}</h3>

                    <p>Đơn hàng tháng này</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-shopping-cart"></i>
                  </div>
                  <a href="#" class="small-box-footer">
                    Xem thêm <i class="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-lg-3 col-6">
                <!-- small card -->
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3>53<sup style="font-size: 20px">%</sup></h3>

                    <p>Tỷ lệ mua hàng</p>
                  </div>

                  <div class="icon">
                    <i class="fas fa-chart-bar"></i>
                  </div>
                  <a href="#" class="small-box-footer">
                    Xem thêm <i class="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-lg-3 col-6">
                <!-- small card -->
                <div class="small-box bg-warning">
                  <div class="inner">
                    <h3>44</h3>

                    <p>Tài khoản mới</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-user-plus"></i>
                  </div>
                  <a href="#" class="small-box-footer">
                    Xem thêm <i class="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
              <!-- ./col -->
              <div class="col-lg-3 col-6">
                <!-- small card -->
                <div class="small-box bg-danger">
                  <div class="inner">
                    <h3>65</h3>

                    <p>Lượng truy cập</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-chart-pie"></i>
                  </div>
                  <a href="#" class="small-box-footer">
                    Xem thêm <i class="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
              <!-- ./col -->
            </div>
          </div>
          <div class="col-12">
            <div>
              <!-- <ChartLine
                v-if="loaded"
                :chartdata="chartSales"
                :options="options"
              >
              </ChartLine> -->
            </div>
          </div>
          <div class="col-12">
            <div>
              <ChartLine
                v-if="loaded"
                :chartdata="chartdata"
                :options="options"
              >
              </ChartLine>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import axios from "axios";
import ChartLine from "@/components/ChartLine.vue";

const moment = require("moment");
moment.locale("vi");
export default {
  components: { ChartLine },
  data() {
    return {
      monthOrder: 0,
      loaded: false,
      chartSales: null,
      chartdata: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    this.loaded = false;
    try {
      let months = [];
      for (let index = 0; index < 13; index++) {
        months.push(moment().subtract(index, "months").format("X"));
      }
      new Promise(async (resolve) => {
        let result = [];
        await months.reduce(async (a, b) => {
          let data = await this.$store.getters.orderFromTo(await a, b);
          result.push({
            date: moment.unix(data.unix).format("DD/MM/YYYY"),
            data: {
              products: data.data.products,
              orders: data.data.orders,
              sales: data.data.sales,
            },
          });
          console.log(data);
          return b;
        });
        resolve(result.reverse());
      }).then((result) => {
        this.chartdata = {
          labels: result.map((el) => el.date),
          datasets: [
          {
            label: "Đơn hàng",
            data: result.map((el) => el.data.orders),
            backgroundColor: "rgba(0, 255, 64, 0.30)",
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
          },
          {
            label: "Sản phẩm bán được",
            data: result.map((el) => el.data.products),
            backgroundColor: "rgba(1, 116, 188, 0.30)",
            borderColor: "#00e600",
            pointBackgroundColor: "white",
          }
        ]
        };
        this.chartSales ={
          labels: result.map((el) => el.date),
          datasets: [
          {
            label: "Doanh thu",
            data: result.map((el) => el.data.sale),
            backgroundColor: "rgba(0, 255, 64, 0.30)",
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
          }
        ]
        };
        this.loaded = true;
      });
      this.monthOrder = await this.getMonthOrder();
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async getMonthOrder(){
      let today = moment().format("X");
      let lastMonth = moment().subtract(1, "months").format("X");

      let data = await this.$store.getters.orderFromTo(today, lastMonth);
      return data.data.orders;
    }
  },
};
</script>

<style>
</style>
