<template>
  <v-app class="login-app">
    <v-row no-gutters class="login-row">
      <!-- Left Panel -->
      <v-col cols="4" md="4" class="login-panel">
        <v-card elevation="0" rounded="xl" class="login-card">
          <img src="../assets/logo.png" alt="Logo" class="logo" />
          <h2 class="my-8 font-weight-medium">Log in</h2>

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

            <div
              class="d-flex justify-space-between align-center mb-4 text-caption"
            >
              <v-checkbox
                v-model="rememberMe"
                hide-details
                density="compact"
                color="custom-purple"
                label="Remember me"
              />
              <RouterLink to="/reset-password" class="text-custom-purple">
                Reset Password?
              </RouterLink>
            </div>

            <Button class="w-100 mb-4" @click="submit"> Log in </Button>

            <p class="text-center text-caption">
              Don’t have an account yet?
              <RouterLink
                to="/register"
                class="text-custom-purple font-weight-medium"
              >
                New Account
              </RouterLink>
            </p>
          </v-form>
        </v-card>
      </v-col>

      <!-- Right Panel -->
      <v-col cols="8" class="pa-0">
        <div class="right-panel">
          <v-img
            src="../assets/Illustration.png"
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
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const valid = ref(false);
const form = ref(null);

const rules = {
  required: (v) => !!v || "Field is required",
  email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  min: (n) => (v) => (v && v.length >= n) || `Minimum ${n} characters required`,
};

const submit = () => {
  if (form.value.validate()) {
    console.log("Submitted:", {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value,
    });
    console.log("Form is valid");

    // Proceed with login logic (API call etc.)
    router.push("/"); // Redirect to dashboard on success
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
  position: relative;
}
.login-card {
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
  gap: 5px;
  width: 46%;
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
</style>
