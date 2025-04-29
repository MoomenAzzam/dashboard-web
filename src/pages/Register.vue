<template>
  <v-app class="login-app">
    <v-row no-gutters class="login-row">
      <!-- Left Panel -->
      <v-col cols="4" md="4" class="login-panel">
        <v-card elevation="0" rounded="xl" class="login-card">
          <img src="../assets/logo.png" alt="Logo" class="logo" />
          <h2 class="my-8 font-weight-medium">Create Account</h2>

          <div class="login-with-social mb-6">
            <button><v-icon left>mdi-google</v-icon> Google</button>
            <button><v-icon left>mdi-facebook</v-icon> Facebook</button>
          </div>

          <!-- Divider -->
          <div class="d-flex align-center my-4 w-100">
            <div class="divider-line" />
            <span class="mx-3 divider-text">Or</span>
            <div class="divider-line" />
          </div>

          <v-form ref="form" v-model="valid" lazy-validation class="w-100">
            <v-text-field
              v-model="name"
              label="Name"
              placeholder="Your full name"
              :rules="[rules.required]"
              variant="solo-filled"
              rounded
              hide-details="auto"
              class="custom-input mb-4"
            />

            <v-text-field
              v-model="username"
              label="Username"
              placeholder="yourusername"
              :rules="[rules.required]"
              variant="solo-filled"
              rounded
              hide-details="auto"
              class="custom-input mb-4"
            />

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

            <v-text-field
              v-model="password"
              label="Password"
              placeholder="******"
              :rules="[rules.required, rules.min(6)]"
              type="password"
              variant="solo-filled"
              rounded
              hide-details="auto"
              class="custom-input mb-4"
            />

            <v-checkbox
              v-model="privacyPolicy"
              hide-details
              density="compact"
              color="custom-purple"
              class="mb-4"
            >
              <template #label>
                <span class="text-caption">
                  By creating an account you agree to the
                  <span class="text-custom-purple text-decoration-underline"
                    >terms of use</span
                  >
                  and our
                  <span class="text-custom-purple text-decoration-underline"
                    >privacy policy</span
                  >.
                </span>
              </template>
            </v-checkbox>

            <Button class="w-100 mb-4" @click="submit"> Register </Button>

            <p class="text-center text-caption">
              Already have an account?
              <RouterLink
                to="/login"
                class="text-custom-purple font-weight-medium"
              >
                Log in
              </RouterLink>
            </p>
          </v-form>
        </v-card>
      </v-col>

      <!-- Right Panel -->
      <v-col cols="8" class="pa-0">
        <div class="right-panel">
          <v-img
            src="../assets/register.png"
            height="60vh"
            width="100%"
            contain
          />
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const privacyPolicy = ref(false);
const valid = ref(false);
const form = ref(null);

const rules = {
  required: (v) => !!v || "Field is required",
  email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  min: (n) => (v) => (v && v.length >= n) || `Minimum ${n} characters required`,
};

const submit = () => {
  if (form.value.validate()) {
    console.log("Register submitted:", {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
    });
    // API logic here
  } else {
    console.warn("Form is invalid");
  }
};
</script>

<style scoped>
.login-app {
  overflow: hidden;
}
.login-row {
  height: 100vh;
  margin: 0;
}
.login-panel {
  height: 100vh;
  overflow-y: auto;
}

.login-card {
  /* Remove position: fixed to allow normal flow inside scrollable parent */
  height: auto;
  min-height: 100vh;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 92px;
  height: auto;
}
.login-with-social {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.login-with-social button {
  background: #f7f7f8;
  padding: 14px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46%;
  gap: 5px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: #e0e0e0;
}
.divider-text {
  color: #0a0a2f;
  font-weight: 500;
  font-size: 14px;
}
.right-panel {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.text-custom-purple {
  color: #7b57c2;
  cursor: pointer;
}
.text-decoration-underline {
  text-decoration: underline;
}
</style>
