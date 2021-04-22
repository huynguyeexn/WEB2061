<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link to="/" class="brand-link">
      <!-- <img
      src="@/assets/img/logo.png"
        alt="OTech Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      /> -->
      <span class="brand-text font-weight-bold p-2">OTech</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="@/assets/admin/img/user2-160x160.jpg"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div class="info">
          <router-link to="/admin" class="d-block"
            >Alexander Pierce</router-link
          >
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input
            class="form-control form-control-sidebar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <router-link to="/admin" class="nav-link" >
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Trang quản trị
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/product" class="nav-link">
              <i class="nav-icon fas fa-box-open"></i>
              <p>
                Sản phẩm
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/category" class="nav-link">
              <i class="nav-icon fa fa-tag" aria-hidden="true"></i>
              <p>
                Danh mục
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/order" class="nav-link">
              <i class="nav-icon fa fa-cart-arrow-down" aria-hidden="true"></i>
              <p>
                Danh mục
              </p>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {};
</script>

<style>
</style>
