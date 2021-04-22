
<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      gradient: null,
      gradient2: null,
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(0, 230, 0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(0, 230, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(0, 230, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

    if (this.chartdata.datasets.length > 1) {
      this.chartdata.datasets[1].backgroundColor = this.gradient;
    }
    this.chartdata.datasets[0].backgroundColor = this.gradient2;

    this.renderChart(this.chartdata, this.options);
  },
};
</script>
