<template>
  <div>
    <div class="header d-flex align-center justify-space-between">
      <h2>Add Customer</h2>
      <Cancel @click="emit('cancel')" />
    </div>
    <v-form @submit.prevent="handleSubmit" class="form">
      <v-avatar class="image" size="134">
        <v-img :alt="localUser.name" :src="localUser.avatar" />
      </v-avatar>
      <v-text-field
        v-model="localUser.name"
        label="Name"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-text-field
        v-model="localUser.email"
        label="Email"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-text-field
        v-model="localUser.phone"
        label="Phone"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-select
        v-model="localUser.gender"
        :items="['Male', 'Female']"
        placeholder="Gender"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-text-field
        v-model="localUser.date"
        label="Date"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-select
        v-model="localUser.status"
        :items="['Complete', 'Pending', 'Cancel']"
        placeholder="Status"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-switch
        v-model="localUser.starred"
        label="Starred"
        color="warning"
        class="custom-input"
        :true-value="1"
        :false-value="0"
      />
      <v-card-actions>
        <Button color="info" @click="handleSubmit" class="w-100">Add</Button>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["save", "cancel"]);
const localUser = ref({
  name: "",
  email: "",
  phone: "",
  gender: "",
  date: "",
  status: "",
  starred: 0,
  avatar: "",
});
function handleSubmit() {
  emit("save", localUser.value);
}
</script>
