<template>
  <v-container fluid class="mt-4">
    <v-row>
      <!-- Reports Line Chart -->
      <v-col cols="12" md="7">
        <v-card class="pa-4" elevation="0">
          <v-card-title>Reports</v-card-title>
          <apexchart
            width="100%"
            type="line"
            :options="lineChartOptions"
            :series="lineSeries"
          />
        </v-card>
      </v-col>

      <!-- Analytics Donut Chart -->
      <v-col cols="12" md="5">
        <v-card class="pa-4" elevation="0">
          <v-card-title>Analytics</v-card-title>
          <apexchart
            class="mt-3"
            type="donut"
            width="100%"
            :options="donutChartOptions"
            :series="donutSeries"
          />
          <div class="chart-legend mt-4">
            <div class="legend-item">
              <div class="legend-color sale"></div>
              <span>Sale</span>
            </div>
            <div class="legend-item">
              <div class="legend-color distribute"></div>
              <span>Distribute</span>
            </div>
            <div class="legend-item">
              <div class="legend-color return"></div>
              <span>Return</span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      // Line Chart (Reports)
      lineSeries: [
        {
          name: "Sales",
          data: [54, 32, 60, 40, 48, 22, 37, 44, 20, 28, 40, 60],
        },
      ],
      lineChartOptions: {
        chart: {
          height: 300,
          type: "line",
          toolbar: { show: false },
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        xaxis: {
          categories: [
            "10am",
            "11am",
            "12am",
            "01am",
            "02am",
            "03am",
            "04am",
            "05am",
            "06am",
            "07am",
          ],
        },
        tooltip: {
          theme: "dark",
          y: {
            formatter: (val) => `${val.toLocaleString()}`,
          },
        },
        markers: {
          size: 5,
          colors: ["#fff"],
          strokeColors: "#6A00FF",
          strokeWidth: 4,
          hover: { size: 7 },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#FF00C7"],
            inverseColors: true,
            opacityFrom: 0.7,
            opacityTo: 0.6,
            stops: [0, 100],
          },
        },
        colors: ["#00BFFF"],
        grid: { borderColor: "#f1f1f1" },
      },

      // Donut Chart (Analytics)
      donutSeries: [60, 20, 20],
      donutChartOptions: {
        chart: {
          type: "donut",
        },
        labels: ["Sale", "Distribute", "Return"],
        colors: ["#3B82F6", "#FACC15", "#FB7185"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: { show: false },
                value: {
                  show: true,
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#000",
                  offsetY: -10,
                  formatter: () => "100%",
                },
                total: {
                  show: true,
                  label: "Transactions",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#999",
                },
              },
            },
          },
        },
      },
    };
  },
};
</script>

<style scoped>
.chart-legend {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
}

.legend-color.sale {
  background-color: #3b82f6;
}

.legend-color.distribute {
  background-color: #facc15;
}

.legend-color.return {
  background-color: #fb7185;
}
</style>
