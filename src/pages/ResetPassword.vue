<template>
  <v-app>
    <v-container class="fill-height d-flex align-center justify-center">
      <v-card width="400" class="pa-6" elevation="2" rounded="xl">
        <div class="text-center">
          <img src="../assets/logo.png" alt="logo" class="logo" />
          <h2 class="mb-4 text-h5">Recover</h2>
        </div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            label="Email"
            placeholder="example@gmail.com"
            :rules="[rules.required, rules.email]"
            variant="solo-filled"
            rounded
            hide-details="auto"
            class="custom-input mb-4"
          />
          <Button block color="primary" @click="submit" class="w-100"
            >Reset Your Password</Button
          >
        </v-form>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const valid = ref(false);
const form = ref(null);

const rules = {
  required: (v) => !!v || "Required",
  email: (v) => /.+@.+\..+/.test(v) || "Invalid email",
};

const submit = () => {
  if (form.value.validate()) {
    console.log("Reset email sent to", email.value);
  }
};
</script>
<style scoped>
.logo {
  width: 92px;
  margin: 100px auto 60px;
}
</style>
