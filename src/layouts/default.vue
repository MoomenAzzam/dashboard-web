<template>
  <v-app>
    <v-navigation-drawer
      expand-on-hover
      rail
      permanent
      color="white"
      width="280"
      class="h-100"
      style="
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        height: 100vh;
        z-index: 1000;
      "
    >
      <v-list>
        <v-list-item
          prepend-avatar="/logo.png"
          title="Base"
          class="font-weight-bold"
        />
      </v-list>

      <v-divider />

      <v-list density="compact" nav class="font-weight-bold">
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :to="item.route"
          active-class="active-nav-item"
        >
          <!-- Add v-chip for Messages -->
          <template v-if="item.value === 'messages'" v-slot:append>
            <v-chip
              size="small"
              color="red"
              class="text-white"
              v-if="item.messageCount > 0"
            >
              {{ item.messageCount }}
            </v-chip>
          </template>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="mb-4">
          <v-list-item
            max-height="100px"
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            subtitle="Free User"
          >
            <template v-slot:append>
              <v-btn icon="mdi-logout" variant="text" @click="logout" />
            </template>
          </v-list-item>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="main">
      <v-container fluid class="pa-7">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const navItems = ref([
  {
    icon: "mdi-view-dashboard",
    title: "Dashboard",
    value: "dashboard",
    route: "/",
    messageCount: 0,
  },
  {
    icon: "mdi-google-analytics",
    title: "Analytics",
    value: "analytics",
    route: "/analytics",
    messageCount: 0,
  },
  {
    icon: "mdi-invoice-list",
    title: "Invoice",
    value: "invoice",
    route: "/invoice",
    messageCount: 0,
  },
  {
    icon: "mdi-clock-outline",
    title: "Schedule",
    value: "schedule",
    route: "/schedule",
    messageCount: 0,
  },
  {
    icon: "mdi-calendar-month",
    title: "Calendar",
    value: "calendar",
    route: "/calendar",
    messageCount: 0,
  },
  {
    icon: "mdi-message-badge",
    title: "Messages",
    value: "messages",
    route: "/messages",
    messageCount: 5, // Example: 5 unread messages
  },
  {
    icon: "mdi-bell",
    title: "Notification",
    value: "notification",
    route: "/notification",
    messageCount: 0,
  },
  {
    icon: "mdi-cog",
    title: "Settings",
    value: "settings",
    route: "/settings",
    messageCount: 0,
  },
]);

const logout = () => {
  router.push("/login");
};
</script>

<style scoped>
.main {
  background-color: #f5f5f5;
}
.v-list-item-title {
  font-size: 16px !important;
  font-weight: bold !important;
}
</style>
