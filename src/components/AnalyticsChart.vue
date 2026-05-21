<template>
  <div ref="chartContainer"></div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: {},
      chartOptions: {
        chart: {
          type: 'areaspline',
          style: {
            fontSize: '12px',
            fontWeight: 'normal',
            fontStyle: 'normal'
          },
          backgroundColor: 'transparent',
          spacingLeft: 0,
          spacingRight: 0,
          spacingBottom: 0,
          spacingTop: 5
        },
        title: {
          text: ''
        },
        xAxis: {
          categories:
          []
        },
        yAxis: {
          title: {
            text: ''
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        exporting: {
          chartOptions: {
            plotOptions: {
              series: {
                dataLabels: {
                  enabled: true
                }
              }
            }
          },
          fallbackToExportServer: false
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 0,
          showInLegend: false
        },
        series: [
          {
            name: 'Sessions',
            color: '#43ccf0',
            fillColor: 'rgba(67,204,240,0.4)',
            type: 'areaspline',
            data: [],
            label: {
              enabled: false,
              connectorAllowed: false
            }
          },
          {
            name: 'Studio sessions',
            color: '#b6bdcc',
            fillColor: 'rgba(182,189,204,0.2)',
            type: 'areaspline',
            data: [],
            label: {
              enabled: false,
              connectorAllowed: false
            }
          }
        ],
        credits: {
          enabled: false
        }
      }
    };
  },
  props: {
    appsSessions: {
      type: Array,
      default() {
        return [];
      }
    },
    studioSessions: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    initChart: function() {
      this.transformData()
        .then(() => {
          this.chartInstance = Highcharts.chart(this.$refs.chartContainer, this.chartOptions);
        });
    },
    transformData: function() {
      return new Promise((resolve) => {
        const categories = [];
        const appSessionVal = [];

        this.appsSessions.forEach((appSession) => {
          categories.push(appSession.day);
          appSessionVal.push(appSession.count);
        });

        const studioSessionVal = [];

        this.studioSessions.forEach((studioSession) => {
          studioSessionVal.push(studioSession.count);
        });

        this.chartOptions.xAxis.categories = categories;
        this.chartOptions.series[0].data = appSessionVal;
        this.chartOptions.series[1].data = studioSessionVal;
        resolve();
      });
    }
  },
  mounted: function() {
    this.initChart();
  }
};
</script>
