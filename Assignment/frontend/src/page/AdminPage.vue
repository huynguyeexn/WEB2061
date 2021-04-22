<template>
  <div class="admin-page hold-transition sidebar-mini" style="height: auto">
    <div class="wrapper">
      <!-- Navbar -->
      <Navbar></Navbar>
      <!-- /.navbar -->

      <!-- Main Sidebar Container -->
      <MainSideBar></MainSideBar>

      <!-- Content Wrapper. Contains page content -->
      <router-view></router-view>
      <!-- /.content-wrapper -->

      <!-- Control Sidebar -->
      <ControlSidebar></ControlSidebar>
      <!-- /.control-sidebar -->

      <!-- Main Footer -->
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import ControlSidebar from "@/components/admin/ControlSidebar.vue";
import Footer from "@/components/admin/Footer.vue";
import MainSideBar from "@/components/admin/MainSideBar.vue";
import Navbar from "@/components/admin/Navbar.vue";

import "@/assets/admin/css/adminlte.css";

export default {
  components: { Navbar, MainSideBar, ControlSidebar, Footer },
};
</script>

<style lang="scss" scoped>
</style>
