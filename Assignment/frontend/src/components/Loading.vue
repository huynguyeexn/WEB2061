<template>
  <div class="row" v-if="loading">
    <div class="col-12 text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["loading"],
  watch: {
    loading(value) {
      this.loading = value;
    },
  },
};
</script>

<style >
</style>
