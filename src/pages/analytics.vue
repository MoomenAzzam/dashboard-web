<template>
  <v-row>
    <v-col
      :cols="activeView !== null ? '8' : '12'"
      :md="activeView !== null ? '8' : '12'"
    >
      <AppHeader title="Customer List">
        <template #right>
          <Button icon="mdi-plus" @click="handleAddCustomer"
            >Add Customer</Button
          >
        </template>
      </AppHeader>
      <CustomerCards
        :users="users"
        @edit="handleEdit"
        @delete="handleDelete"
        @view="handleView"
      />
    </v-col>
    <v-col
      v-if="activeView !== null"
      cols="12"
      md="4"
      class="position-relative"
    >
      <v-card
        elevation="0"
        rounded="xl"
        style="
          position: fixed;
          padding: 30px;
          top: 0;
          bottom: 0;
          right: 0;
          height: 100vh;
          z-index: 2;
          width: 450px;
          overflow-y: auto;
        "
      >
        <template v-if="activeView === 'performance'">
          <PerformanceChart :user="selectedUser" @cancel="activeView = null" />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="activeView = null">Close</v-btn>
          </v-card-actions>
        </template>

        <template v-if="activeView === 'edit'">
          <EditCustomerForm
            :user="selectedUser"
            @save="saveChanges"
            @cancel="activeView = null"
          />
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";

const users = ref([
  {
    id: 1,
    name: "John Deo",
    email: "johndoe2211@gmail.com",
    phone: "+33757005467",
    gender: "Male",
    role: "UI/UX Designer",
    avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
    address: "2239 Hog Camp Road Schaumburg",
  },
  {
    id: 2,
    name: "Shelby Goode",
    email: "shelbygoode481@gmail.com",
    phone: "+33757005467",
    gender: "Female",
    role: "Frontend Developer",
    avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
    address: "123 Main Street New York",
  },
  {
    id: 3,
    name: "Robert Bacins",
    email: "robertbacins4182@com",
    phone: "+33757005467",
    gender: "Male",
    role: "Backend Developer",
    avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    address: "456 Oak Avenue Chicago",
  },
]);

const activeView = ref(null);
const showSidePanel = ref(false);
const isEditing = ref(false);
const selectedUser = ref(null);
const editingUser = ref(null);

const handleAddCustomer = () => {
  console.log("Add customer clicked");
};

const handleEdit = (user) => {
  selectedUser.value = { ...user };
  editingUser.value = { ...user };
  activeView.value = "edit";
};

const handleDelete = (user) => {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    users.value = users.value.filter((u) => u.id !== user.id);
    if (selectedUser.value?.id === user.id) {
      activeView.value = null;
    }
  }
};

const handleView = (user) => {
  selectedUser.value = { ...user };
  activeView.value = "performance";
};

const saveChanges = (updatedUser) => {
  const index = users.value.findIndex((u) => u.id === updatedUser.id);
  if (index !== -1) {
    users.value[index] = { ...updatedUser };
  }
  activeView.value = null;
};
</script>
