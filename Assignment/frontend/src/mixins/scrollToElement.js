export default {
  methods: {
    scrollToElement(element) {
      const el = this.$el.getElementsByClassName(element)[0];
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
};
