<template>
  <div>
    <div class="header d-flex align-center justify-space-between">
      <h2>Add Customer</h2>
      <Cancel @click="emit('cancel')" />
    </div>
    <v-form @submit.prevent="handleSubmit" class="form">
      <div class="image-upload">
        <label for="avatar-upload" class="upload-label">
          <v-avatar size="134">
            <v-img
              v-if="localUser.avatar"
              :src="localUser.avatar"
              :alt="localUser.name"
            />
            <v-icon v-else size="64">mdi-camera</v-icon>
          </v-avatar>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            @change="onImageChange"
            style="display: none"
          />
        </label>
        <div class="upload-text">Upload Image</div>
      </div>
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
        <Button color="info" type="submit" class="w-100">Save</Button>
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
  role: "",
  avatar: "https://cdn.vuetifyjs.com/images/john.jpg", // default avatar
  address: "",
});

const handleSubmit = () => {
  emit("save", { ...localUser.value });
};

const onImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      localUser.value.avatar = event.target.result;
    };
    reader.readAsDataURL(file);
  }
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

.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  cursor: pointer;
}
.upload-label {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.upload-text {
  margin-top: 8px;
  color: #888;
  font-size: 14px;
}
</style>
