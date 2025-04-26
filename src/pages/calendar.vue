<script setup>
import { ScheduleXCalendar } from "@schedule-x/vue";
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import "@schedule-x/theme-default/dist/index.css";
import { ref } from "vue";

// Reactive events array
const events = ref([
  {
    id: 1,
    title: "Event 1",
    start: "2025-04-24",
    end: "2025-04-24",
  },
  {
    id: 2,
    title: "Event 2",
    start: "2025-04-25 12:00",
    end: "2025-04-25 13:00",
  },
]);

// Initialize calendar with drag-and-drop plugin
const calendarApp = createCalendar({
  selectedDate: "2025-04-24",
  views: [
    createViewDay(),
    createViewWeek(),
    createViewMonthGrid(),
    createViewMonthAgenda(),
  ],
  events: events.value,
  plugins: [
    createDragAndDropPlugin({
      onEventUpdate(updatedEvent) {
        const index = events.value.findIndex((e) => e.id === updatedEvent.id);
        if (index !== -1) {
          events.value[index] = updatedEvent;
        }
      },
    }),
  ],
  callbacks: {
    onEventClick(event) {
      const title = prompt("Edit event title:", event.title);
      if (title) {
        const updatedEvent = { ...event, title };
        const index = events.value.findIndex((e) => e.id === event.id);
        if (index !== -1) {
          events.value[index] = updatedEvent;
          calendarApp.events.update(updatedEvent);
        }
      }
    },
  },
  onMouseDownDateTime(dateTime) {
    console.log("Mouse down on date/time:", dateTime);
  },
});

// calendarApp.on("calendarClick", (dateInfo) => {
//   const title = prompt("Enter event title:");
//   if (title) {
//     const newEvent = {
//       id: Date.now(),
//       title,
//       start: dateInfo.date,
//       end: dateInfo.date,
//     };
//     events.value.push(newEvent);
//     calendarApp.events.add(newEvent);
//   }
// });
</script>

<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>

<style scoped>
div {
  margin: auto;
}
.sx-vue-calendar-wrapper {
  width: 1200px !important;
  max-width: 90vw !important;
  height: 800px !important;
  max-height: 90vh !important;
  margin: 0 auto !important;
}
</style>
