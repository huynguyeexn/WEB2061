<template>
  <transition name="fade">
    <!-- Page Preloder -->
    <div id="preloder" v-if="show">
      <div class="loader"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "PreLoader",
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    this.showToggle();
  },
  methods: {
    showToggle() {
      setTimeout(() => {
        this.show = false;
      }, 500);
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
