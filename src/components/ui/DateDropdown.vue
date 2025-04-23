<template>
  <div class="date-picker-container">
    <div class="date-picker-label" @click="showPicker = true">
      <label>{{ label }}: {{ displayDate || "Select date" }}</label>
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M1 1L5 5L9 1"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <v-dialog v-model="showPicker" width="auto">
      <v-date-picker
        v-model="selectedDate"
        show-adjacent-months
        :min="minDate"
        :max="maxDate"
        @update:modelValue="onDateSelected"
        :disabled="disabled"
      ></v-date-picker>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits, defineProps, onMounted } from "vue";
import { useDate } from "vuetify";

const props = defineProps({
  label: {
    type: String,
    default: "Date",
  },
  minDate: {
    type: String,
    default: null,
  },
  maxDate: {
    type: String,
    default: null,
  },
  initialDisabled: {
    type: Boolean,
    default: false,
  },
});

const dateVuetify = useDate();
const showPicker = ref(false);
const selectedDate = ref<string | null>(null);
const displayDate = ref<string>("");
const disabled = ref(props.initialDisabled);

const emit = defineEmits<{
  (e: "date-selected", date: string): void;
}>();

function onDateSelected(date: string | null) {
  if (!date) return;

  displayDate.value = formatDate(date);
  showPicker.value = false;
  emit("date-selected", displayDate.value);
}

function formatDate(date: string | null): string {
  if (!date) return "";
  return dateVuetify.format(date, "keyboardDate");
}

watch(selectedDate, (newVal) => {
  if (newVal) {
    displayDate.value = formatDate(newVal);
  }
});

// Enable end date picker only when start date is selected
watch(
  () => props.minDate,
  (newVal) => {
    if (props.label === "End Date") {
      disabled.value = !newVal;
    }
  }
);

onMounted(() => {
  if (!props.initialDisabled) {
    const today = new Date();
    selectedDate.value = dateVuetify.format(today, "YYYY-MM-DD");
    displayDate.value = formatDate(selectedDate.value);
  }
});
</script>

<style scoped>
.date-picker-container {
  margin-right: 10px;
}

.date-picker-label {
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  color: #030229;
  padding: 11px 17px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  gap: 5px;
  align-items: center;
  font-family: "Nunito", sans-serif;
  min-width: 150px;
}

.date-picker-label[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
