<template>
  <div class="row">
    <div class="col-md-6 mx-auto mt-5">
      <form @submit="toLogin" class="card">
        <div class="card-header">
          <strong>
            Đăng nhập
          </strong>
        </div>
        <div class="card-body">
          <div class="form-group">
            <input
              v-model="email"
              id="email"
              type="email"
              class="form-control"
              placeholder="Nhập email của bạn..."
              required
            />
          </div>
          <div class="form-group">
            <input
              v-model="password"
              id="pass"
              type="password"
              class="form-control"
              placeholder="Nhập mật khẩu của bạn..."
              autocomplete="on"
              required
            />
          </div>

          <b-button v-if="loading" variant="primary" disabled class="btn-block">
            <b-spinner small type="grow"></b-spinner>
            Đăng nhập...
          </b-button>
          <button v-if="!loading" type="submit" class="btn btn-block btn-primary">
            Đăng nhập
          </button>
          <a class="btn btn-block btn-secondary">
            Đăng ký
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    toLogin: function(e) {
       e.preventDefault();
      this.loading = true;
      this.login({ email: this.email, password: this.password }).finally(() =>
        setTimeout(() => {
          this.$router.go(-1);
          this.loading = false;
        }, 1000)
      );
    },
  },
};
</script>

