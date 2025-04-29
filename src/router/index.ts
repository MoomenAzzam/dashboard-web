import { createRouter, createWebHistory } from "vue-router";

// Lazy-load your pages
const Dashboard = () => import("@/pages/index.vue");
const Analytics = () => import("@/pages/analytics.vue");
const Invoice = () => import("@/pages/invoice.vue");
const Schedule = () => import("@/pages/schedule.vue");
const Calendar = () => import("@/pages/calendar.vue");
const Messages = () => import("@/pages/messages.vue");
const Notification = () => import("@/pages/notification.vue");
const Settings = () => import("@/pages/settings.vue");
const Login = () => import("@/pages/login.vue");
const Register = () => import("@/pages/Register.vue");
const ResetPassword = () => import("@/pages/ResetPassword.vue");

// Layouts
const DefaultLayout = () => import("@/layouts/default.vue");
const BlankLayout = () => import("@/layouts/blank.vue");

const routes = [
  {
    path: "/login",
    component: BlankLayout,
    children: [
      {
        path: "",
        component: Login,
      },
      { path: "/reset-password", component: ResetPassword },
      { path: "/register", component: Register },
    ],
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", component: Dashboard },
      { path: "analytics", component: Analytics },
      { path: "invoice", component: Invoice },
      { path: "schedule", component: Schedule },
      { path: "calendar", component: Calendar },
      { path: "messages", component: Messages },
      { path: "notification", component: Notification },
      { path: "settings", component: Settings },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
