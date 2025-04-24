<template>
  <div class="customer-cards-container">
    <table class="customer-cards">
      <thead>
        <tr class="header-row">
          <th>
            <v-checkbox
              :indeterminate="someSelected"
              :model-value="allSelected"
              @update:modelValue="toggleAll"
              hide-details
              density="compact"
              color="custom-purple"
            />
          </th>
          <th><span>Invoice ID</span> <Down /></th>
          <th><span>Name</span> <Down /></th>
          <th><span>Email</span> <Down /></th>
          <th><span>Date</span> <Down /></th>
          <th><span>Status</span> <Down /></th>
          <th><span>Star</span></th>
          <th colspan="7" style="text-align: right">
            <button
              :disabled="!selected.length"
              @click="deleteSelected"
              class="delete-selected-btn"
              title="Delete selected"
              style="
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
              "
            >
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.4">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.2871 3.24297C17.6761 3.24297 18 3.56596 18 3.97696V4.35696C18 4.75795 17.6761 5.09095 17.2871 5.09095H0.713853C0.32386 5.09095 0 4.75795 0 4.35696V3.97696C0 3.56596 0.32386 3.24297 0.713853 3.24297H3.62957C4.22185 3.24297 4.7373 2.82197 4.87054 2.22798L5.02323 1.54598C5.26054 0.616994 6.0415 0 6.93527 0H11.0647C11.9488 0 12.7385 0.616994 12.967 1.49699L13.1304 2.22698C13.2627 2.82197 13.7781 3.24297 14.3714 3.24297H17.2871ZM15.8058 17.134C16.1102 14.2971 16.6432 7.55712 16.6432 7.48913C16.6626 7.28313 16.5955 7.08813 16.4623 6.93113C16.3193 6.78413 16.1384 6.69713 15.9391 6.69713H2.06852C1.86818 6.69713 1.67756 6.78413 1.54529 6.93113C1.41108 7.08813 1.34494 7.28313 1.35467 7.48913C1.35646 7.50162 1.37558 7.73903 1.40755 8.13594C1.54958 9.89917 1.94517 14.8102 2.20079 17.134C2.38168 18.846 3.50498 19.922 5.13206 19.961C6.38763 19.99 7.68112 20 9.00379 20C10.2496 20 11.5149 19.99 12.8094 19.961C14.4929 19.932 15.6152 18.875 15.8058 17.134Z"
                    fill="#030229"
                  />
                </g>
              </svg>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="index"
          class="customer-card"
          :class="{
            'card-hover': hoveredRow === index,
            selected: selected.includes(user.id),
          }"
          @mouseover="hoveredRow = index"
          @mouseleave="hoveredRow = null"
        >
          <td>
            <v-checkbox
              :model-value="selected.includes(user.id)"
              @update:modelValue="(val) => toggleRow(user.id, val)"
              hide-details
              density="compact"
              color="custom-purple"
            />
          </td>
          <td @click="$emit('view', user)">
            <span class="font-weight-medium">{{ user.id || "—" }}</span>
          </td>
          <td @click="$emit('view', user)">
            <div class="d-flex align-center">
              <v-avatar
                :color="getAvatarColor(user.gender)"
                size="36"
                class="mr-3"
              >
                <span class="white--text">{{ getInitials(user.name) }}</span>
              </v-avatar>
              <span class="font-weight-medium">{{ user.name }}</span>
            </div>
          </td>
          <td @click="$emit('view', user)">
            <v-icon size="18" color="success" class="mr-1">mdi-email</v-icon>
            {{ user.email }}
          </td>
          <td @click="$emit('view', user)">
            <v-icon size="18" color="primary" class="mr-1">mdi-calendar</v-icon>
            {{ user.date || "—" }}
          </td>
          <td @click="$emit('view', user)">
            <span :class="['status-pill', user.status?.toLowerCase()]">
              {{ user.status || "—" }}
            </span>
          </td>
          <!-- Star column -->
          <td>
            <v-rating
              v-model="user.starred"
              :length="1"
              color="warning"
              background-color="grey-lighten-2"
              size="20"
              dense
              clearable
              @update:modelValue="(val) => toggleStar(user, val)"
            />
          </td>
          <!-- Actions column -->
          <td>
            <div class="action-menu-container">
              <div @click="toggleActionMenu(index)">
                <v-icon class="dots">mdi-dots-horizontal</v-icon>
              </div>
              <div
                v-if="activeMenu === index"
                class="action-menu-card pa-2"
                @click="closeActionMenu"
                @mouseleave="closeActionMenu"
              >
                <EditBtn
                  text
                  block
                  icon="mdi-pencil"
                  @click="$emit('edit', user)"
                  class="menu-button"
                >
                  Edit
                </EditBtn>
                <DeleteBtn
                  text
                  block
                  icon="mdi-delete"
                  color="error"
                  @click="$emit('delete', user)"
                  class="menu-button mt-2"
                >
                  Delete
                </DeleteBtn>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="users.length === 0" class="customer-card">
          <td colspan="8" class="text-center py-4">No customers found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

defineEmits(["view", "edit", "delete", "delete-multiple"]);

const hoveredRow = ref(null);
const activeMenu = ref(null);
const selected = ref([]);

// Selection logic
const allSelected = computed(
  () => selected.value.length === props.users.length && props.users.length > 0
);
const someSelected = computed(
  () => selected.value.length > 0 && !allSelected.value
);

function toggleAll(val) {
  selected.value = val ? props.users.map((u) => u.id) : [];
}
function toggleRow(id, val) {
  if (val) {
    if (!selected.value.includes(id)) selected.value.push(id);
  } else {
    selected.value = selected.value.filter((i) => i !== id);
  }
}

const getGenderColor = (gender) => {
  return gender === "Male"
    ? "blue lighten-4 blue--text text--darken-2"
    : "pink lighten-4 pink--text text--darken-2";
};

const getAvatarColor = (gender) => {
  return gender === "Male" ? "blue" : "pink";
};

const getInitials = (name) => {
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

const toggleActionMenu = (index) => {
  activeMenu.value = activeMenu.value === index ? null : index;
};

const closeActionMenu = () => {
  activeMenu.value = null;
};
function toggleStar(user, val) {
  user.starred = val ? 1 : 0;
}
function deleteSelected() {
  // Emit an event to parent to handle deletion, or filter locally if you own the data
  // Example: emit('delete-multiple', selected.value)
  // Or, if you want to mutate the users array directly (if it's local):
  console.log("Deleting users with IDs:", selected.value);

  props.users.splice(
    0,
    props.users.length,
    ...props.users.filter((u) => !selected.value.includes(u.id))
  );
  selected.value = [];
}
</script>

<style scoped lang="scss">
.customer-cards-container {
  width: 100%;
}

.customer-cards {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;

  .header-row {
    th {
      padding: 12px 16px;
      font-size: 14px;
      font-weight: 500;
      color: #616161;
      text-align: left;
      background: transparent;
    }
  }
}

.customer-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  margin-bottom: 10px;
  cursor: pointer;

  td {
    padding: 16px;
    font-size: 14px;
    color: #030229;
    text-align: left;
    font-weight: 400;
    border: none;

    &:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    &:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  &.card-hover {
    transform: scale(1.01);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    z-index: 1;
    position: relative;
  }
  &.selected {
    background: #f0f4ff;
  }
}

.status-pill {
  display: inline-block;
  padding: 6px 20px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 15px;
  &.complete {
    background: #eafaf3;
    color: #2ecc71;
  }
  &.pending {
    background: #fff6e5;
    color: #f5a623;
  }
  &.cancel {
    background: #ffeaea;
    color: #e74c3c;
  }
}

.action-menu-container {
  position: relative;
  display: flex;
  justify-content: center;
  .dots:hover {
    color: rgb(var(--v-theme-custom-purple));
  }
  .v-btn {
    min-width: auto;
    padding: 0 8px;
  }
}

.action-menu-card {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 120px;
  overflow: hidden;
  .menu-button {
    width: 100%;
    justify-content: flex-start;
    padding: 8px 16px;
    margin: 0;
    border-radius: 0;
    border-radius: 10px;
  }
}

.delete-selected-btn svg {
  transition: opacity 0.2s;
  opacity: 0.7;
}
.delete-selected-btn:hover svg {
  opacity: 1;
}
</style>
