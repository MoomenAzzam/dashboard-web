<template>
  <div class="customer-cards-container">
    <table class="customer-cards">
      <thead>
        <tr class="header-row">
          <th class="text-left"><span>Name</span> <Down /></th>
          <th class="text-left"><span>Email</span> <Down /></th>
          <th class="text-left"><span>Phone</span> <Down /></th>
          <th class="text-left"><span>Gender</span> <Down /></th>
          <th class="text-left"><span>Actions</span> <Down /></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="index"
          class="customer-card"
          rounded="lg"
          @mouseover="hoveredRow = index"
          @mouseleave="hoveredRow = null"
          :class="{ 'card-hover': hoveredRow === index }"
        >
          <td @click="$emit('view', user)">
            <div class="d-flex align-center">
              <v-avatar
                :color="getAvatarColor(user.gender)"
                size="36"
                class="mr-3"
              >
                <span class="white--text">{{ getInitials(user.name) }}</span>
              </v-avatar>
              {{ user.name }}
            </div>
          </td>
          <td @click="$emit('view', user)">{{ user.email }}</td>
          <td @click="$emit('view', user)">{{ user.phone }}</td>
          <td @click="$emit('view', user)">
            <v-chip small :color="getGenderColor(user.gender)">
              {{ user.gender }}
            </v-chip>
          </td>
          <td>
            <div class="action-menu-container">
              <div @click="toggleActionMenu(index)">
                <v-icon class="dots"> mdi-dots-horizontal </v-icon>
              </div>
              <div
                v-if="activeMenu === index"
                class="action-menu-card pa-2"
                @click="() => closeActionMenu()"
                @mouseleave="() => closeActionMenu()"
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
          <td colspan="5" class="text-center py-4">No customers found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  users: {
    type: Array,
    required: true,
  },
});

defineEmits(["view", "edit", "delete"]);

const hoveredRow = ref(null);
const activeMenu = ref(null);

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
</style>
