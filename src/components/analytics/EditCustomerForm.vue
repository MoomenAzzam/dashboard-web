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
        label=""
        placeholder="Gender"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-text-field
        v-model="localUser.role"
        label="Role"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-text-field
        v-model="localUser.address"
        label="Address"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />

      <v-card-actions>
        <Button color="info" @click="emit('save', localUser)" class="w-100"
          >Save</Button
        >
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
