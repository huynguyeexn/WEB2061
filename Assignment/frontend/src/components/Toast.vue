<template>
  <div>
    <b-toaster-top-right id="my-toast" :variant="message.type" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">{{ message.title }}!</strong>
        </div>
      </template>
      {{ message.content }}
    </b-toaster-top-right>
  </div>
</template>

<script>
export default {
  props: ["message"],
  data() {
    return {
      show: false,
    };
  },
  watch: {
    message: {
      handler: (val) => {
        console.log("Toast:", val);
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 1000);
      },
      deep: true,
    },
  },
};
</script>

<style></style>
