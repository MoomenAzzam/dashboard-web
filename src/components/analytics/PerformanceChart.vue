<template>
  <div class="performance-card">
    <Cancel @click="$emit('cancel', null)"  class="ml-auto"/>

    <div class="header">
      <v-avatar class="avatar" size="70">
        <v-img :alt="user.name" :src="user.avatar" />
      </v-avatar>
      <h2>{{ user.name }}</h2>
      <p>{{ user.role }}</p>
    </div>

    <div class="contact-info">
      <h3>Contact Info</h3>
      <ul>
        <li>{{ user.email }}</li>
        <li>{{ user.phone }}</li>
        <li>{{ user.address }}</li>
      </ul>
    </div>

    <div class="performance-section">
      <h3>Performance</h3>
      <div class="chart-container">
        <apexchart
          type="bar"
          height="200"
          :options="chartOptions"
          :series="series"
        />
      </div>
      <div class="radial-charts">
        <v-row>
          <v-col cols="6" class="text-center">
            <apexchart
              type="radialBar"
              :options="radialChartBlue.options"
              :series="radialChartBlue.series"
            />
          </v-col>
          <v-col cols="6" class="text-center">
            <apexchart
              type="radialBar"
              :options="radialChartYellow.options"
              :series="radialChartYellow.series"
          /></v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineEmits } from "vue";
import VueApexCharts from "vue3-apexcharts";
const emit = defineEmits(["cancel"]);

export default defineComponent({
  name: "PerformanceChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      series: [
        {
          name: "Performance",
          data: [70, 60, 65, 75, 68, 72],
        },
      ],
      chartOptions: {
        chart: {
          type: "line",
          height: 200,
          toolbar: { show: false },
        },
        colors: ["#FF8F6B"],
        stroke: {
          curve: "smooth",
          width: 3,
        },
        markers: {
          size: 5,
          colors: ["#FF8F6B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7,
          },
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          labels: {
            style: {
              colors: "#666",
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          min: 0,
          max: 100,
          labels: {
            style: {
              colors: "#666",
              fontSize: "12px",
            },
            formatter: (val) => `${val}%`,
          },
        },
        grid: {
          borderColor: "#f1f1f1",
          strokeDashArray: 3,
        },
        tooltip: {
          y: {
            formatter: (val) => `${val}%`,
          },
        },
      },
      // Radial chart 1 (blue)
      radialChartBlue: {
        series: [60],
        options: {
          chart: {
            type: "radialBar",
            height: 200,
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: "60%",
              },
              track: {
                background: "#e0e0e0",
                margin: 0,
                strokeWidth: "97%",
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  color: "#007bff",
                  fontSize: "20px",
                  fontWeight: "bold",
                  show: true,
                  offsetY: 5,
                  formatter: function (val) {
                    return val + "%";
                  },
                },
              },
              stroke: {
                lineCap: "round",
              },
            },
          },
          stroke: {
            lineCap: "round",
            width: 10,
          },
          colors: ["#007bff"],
          labels: [""],
        },
      },

      // Radial chart 2 (yellow)
      radialChartYellow: {
        series: [70],
        options: {
          chart: {
            type: "radialBar",
            height: 200,
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: "60%",
              },
              track: {
                background: "#e0e0e0",
                margin: 0,
                strokeWidth: "97%",
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  color: "#fcd116",
                  fontSize: "20px",
                  fontWeight: "bold",
                  show: true,
                  offsetY: 5,
                  formatter: function (val) {
                    return val + "%";
                  },
                },
              },
              stroke: {
                lineCap: "round",
              },
            },
          },
          stroke: {
            lineCap: "round",
            width: 10,
          },
          colors: ["#fcd116"],
          labels: [""],
        },
      },
    };
  },
});
</script>

<style scoped lang="scss">
.performance-card {
  width: 100%;
}

.header {
  text-align: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 30px;

  .avatar {
    margin: 40px auto 0;
    display: block;
  }

  h2 {
    margin-top: 20px;
    font-size: 24px;
    color: #333;
  }

  p {
    margin-top: 10px;
    font-size: 16px;
    color: #666;
  }
}

.contact-info,
.performance-section {
  margin-top: 40px;

  h3 {
    font-size: 18px;
    color: #444;
    margin-bottom: 30px;
  }
}

.contact-info ul {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;

  li {
    padding: 20px 0;
    color: #555;
    border-bottom: 1px solid #eee;
  }
}

.chart-container {
  margin-top: 15px;
}

.radial-charts {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;

  .apexcharts-canvas {
    margin: 0 auto;
    width: 100% !important;

    .apexcharts-text.apexcharts-datalabel-value {
      font-weight: bold;
      font-size: 24px;
    }
  }
}
</style>
