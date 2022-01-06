// import { Line, mixins } from 'vue-chartjs'
// const { reactiveProp } = mixins

// export default {
//   extends: Line,
//   mixins: [reactiveProp],
//   props: ['options'],
//   mounted () {
//     // this.chartData is created in the mixin.
//     // If you want to pass options please create a local options object
//     this.renderChart(this.chartData, this.options)
//   }
// }



import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  methods: {
    renderpie() {
        console.log(JSON.stringify(this.chartdata))
      this.renderChart(this.chartdata, this.options)
    }
  },
  mounted() {}
}