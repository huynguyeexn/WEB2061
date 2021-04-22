<template>
  <b-modal ref="modal-payment" id="modal-payment" hide-footer>
    <template #modal-header="{ close }">
      <h5>Thanh toán đơn hàng</h5>
      <b-button size="sm" variant="outline-danger" @click="close()">
        <i class="fa fa-times" aria-hidden="true"></i>
      </b-button>
    </template>

    <template #default="">
      <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Email của bạn hoặc người nhận:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Nhập Email..."
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Họ tên người nhận:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.name"
              placeholder="Nhập họ và tên..."
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="SĐT người nhận:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.phone"
              placeholder="Nhập số điện thoại..."
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Địa chỉ giao hàng:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model="form.address"
              placeholder="Nhập Địa chỉ giao hàng..."
              required
            >
            </b-form-input>
          </b-form-group>
          <b-button variant="primary" class="float-right ml-2" type="submit">
            Thanh toán
          </b-button>
          <b-button
            class="float-right"
            variant="outline-secondary"
            @click="cancel()"
          >
            Hủy
          </b-button>
        </b-form>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        phone: "",
        address: "",
      },
      show: true,
    };
  },
  async mounted() {
    await this.$store.dispatch("loadUser");
    this.form.email = this.user.email || "";
    this.form.name = this.user.name || "";
    this.form.phone = this.user.phone || "";
    this.form.address = this.user.address || "";
  },
  computed: {
    ...mapState(["cart", "user"]),
  },
  methods: {
    cancel() {
      this.$refs["modal-payment"].hide();
    },
    async onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch("addOrder");
      await this.$swal({
        icon: "success",
        title: "Đặt hàng thành công",
      });
      this.cancel();
      this.$router.push({ path: 'user' });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.phone = "";
      this.form.address = "";

      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style>
</style>
