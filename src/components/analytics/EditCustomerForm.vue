<template>
  <div>
    <div class="header d-flex align-center justify-space-between">
      <h2>Add Customer</h2>
      <Cancel @click="emit('cancel', null)" />
    </div>
    <v-form @submit.prevent="handleSubmit" class="form">
      <v-avatar class="image" size="134">
        <v-img :alt="user.name" :src="user.avatar" />
      </v-avatar>
      <v-text-field v-model="localUser.name" label="Name" />
      <v-text-field v-model="localUser.email" label="Email" />
      <v-text-field v-model="localUser.phone" label="Phone" />
      <v-select
        v-model="localUser.gender"
        :items="['Male', 'Female']"
        label="Gender"
      />
      <v-text-field v-model="localUser.role" label="Role" />
      <v-text-field v-model="localUser.address" label="Address" />
      <v-card-actions>
        <v-btn color="info" @click="emit('save', localUser)">Save</v-btn>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["save", "cancel"]);

const localUser = ref({ ...props.user });

const handleSubmit = () => {
  emit("save", localUser.value);
};
</script>
<style lang="scss">
.header {
  font-size: 20px;
  justify-content: space-between;
}
.form {
  text-align: center;
}
.image {
  margin: 40px;
}
</style>
