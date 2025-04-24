<template>
  <div>
    <div class="header d-flex align-center justify-space-between">
      <h2>Edit Invoice</h2>
      <Cancel @click="emit('cancel')" />
    </div>
    <v-form @submit.prevent="handleSubmit" class="form">
      <v-avatar class="image" size="134">
        <v-img :alt="localInvoice.name" :src="localInvoice.avatar" />
      </v-avatar>
      <v-text-field
        v-model="localInvoice.name"
        label="Name"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-text-field
        v-model="localInvoice.email"
        label="Email"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-text-field
        v-model="localInvoice.phone"
        label="Phone"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-select
        v-model="localInvoice.gender"
        :items="['Male', 'Female']"
        placeholder="Gender"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-text-field
        v-model="localInvoice.date"
        label="Date"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-select
        v-model="localInvoice.status"
        :items="['Complete', 'Pending', 'Cancel']"
        placeholder="Status"
        variant="solo-filled"
        rounded
        hide-details
        class="custom-input"
      />
      <v-switch
        v-model="localInvoice.starred"
        label="Starred"
        color="warning"
        class="custom-input"
        :true-value="1"
        :false-value="0"
      />
      <v-card-actions>
        <Button color="info" @click="handleSubmit" class="w-100">Save</Button>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const emit = defineEmits(["save", "cancel"]);
const props = defineProps({ invoice: Object });
const localInvoice = ref({ ...props.invoice });

watch(
  () => props.invoice,
  (val) => {
    localInvoice.value = { ...val };
  }
);

function handleSubmit() {
  emit("save", localInvoice.value);
}
</script>
