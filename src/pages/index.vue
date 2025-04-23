<template>
  <v-row>
    <v-col cols="12">
      <AppHeader title="Dashboard">
        <template #right>
          <DateDropdown
            label="Start Date"
            @date-selected="handleDateSelectionStart"
            :max-date="endDate"
          />
          <DateDropdown
            label="End Date"
            @date-selected="handleDateSelectionEnd"
            :min-date="startDate"
            :initial-disabled="true"
          />
        </template>
      </AppHeader>
      <TopAnalyticsCard />
      <MainChart />
      <v-container fluid class="mt-4">
        <v-row>
          <v-col cols="12" md="7">
            <RecentOrdersTable />
          </v-col>
          <v-col cols="12" md="5">
            <TopSellingProducts />
          </v-col> </v-row
      ></v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import AppHeader from "../components/ui/AppHeader.vue";
import DateDropdown from "../components/ui/DateDropdown.vue";
import TopAnalyticsCard from "@/components/dashboard/TopAnalyticsCard.vue";
import MainChart from "@/components/dashboard/MainChart.vue";
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable.vue";
import TopSellingProducts from "@/components/dashboard/TopsellingProducts.vue";

import { ref } from "vue";

const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

const handleDateSelectionStart = (selectedDate: string) => {
  startDate.value = selectedDate;
  console.log("Selected date Start:", selectedDate);

  // Reset end date if it's now invalid
  if (endDate.value && new Date(endDate.value) < new Date(selectedDate)) {
    endDate.value = null;
  }
};

const handleDateSelectionEnd = (selectedDate: string) => {
  endDate.value = selectedDate;
  console.log("Selected date End:", selectedDate);
};
</script>
