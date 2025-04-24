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
        <template v-if="activeView === 'add'">
          <CreateCustomerForm
            @save="saveNewCustomer"
            @cancel="activeView = null"
          />
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCustomerStore } from "@/stores/customer";

const customerStore = useCustomerStore();
const { users, fetchUsers, addUser, updateUser, deleteUser } = customerStore;

const activeView = ref(null);
const selectedUser = ref(null);

onMounted(async () => {
  await fetchUsers();
});

const handleEdit = (user) => {
  selectedUser.value = { ...user };
  activeView.value = "edit";
};

const handleDelete = async (user) => {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    await deleteUser(user.id);
    if (selectedUser.value?.id === user.id) {
      activeView.value = null;
    }
  }
};

const handleView = (user) => {
  selectedUser.value = { ...user };
  activeView.value = "performance";
};

const saveChanges = async (updatedUser) => {
  await updateUser(updatedUser);
  activeView.value = null;
};

const handleAddCustomer = () => {
  activeView.value = "add";
  selectedUser.value = null;
};

const saveNewCustomer = async (newUser) => {
  await addUser(newUser);
  activeView.value = null;
};
</script>
