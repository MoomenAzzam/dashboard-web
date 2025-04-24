<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useInvoiceStore } from "@/stores/invoice";

const invoiceStore = useInvoiceStore();
const { filteredInvoices, searchText } = storeToRefs(invoiceStore);

const activeView = ref<null | "add" | "edit">(null);
const editingInvoice = ref(null);

const handleSearch = (val: string) => {
  invoiceStore.setSearchText(val);
};

const handleAddNewInvoice = () => {
  activeView.value = "add";
  editingInvoice.value = null;
};

function handleEdit(user) {
  editingInvoice.value = { ...user };
  activeView.value = "edit";
}

function handleDelete(user) {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    invoiceStore.deleteInvoice(user.id);
  }
}

function handleDeleteMultiple(ids: number[]) {
  invoiceStore.deleteMultiple(ids);
}

// Save new invoice
function handleSaveNew(invoice) {
  invoice.id = Date.now();
  invoiceStore.addInvoice(invoice);
  closeSidebar();
}

// Save edited invoice
function handleSaveEdit(invoice) {
  invoiceStore.updateInvoice(invoice);
  closeSidebar();
}

function closeSidebar() {
  activeView.value = null;
  editingInvoice.value = null;
}
</script>

<template>
  <v-row>
    <v-col :cols="activeView ? 8 : 12" :md="activeView ? 8 : 12">
      <AppHeader title="Customer List">
        <template #right>
          <SearchInput v-model="searchText" @search="handleSearch" />
          <Button
            icon="mdi-plus"
            @click="handleAddNewInvoice"
            class="min-width-145px"
            >Add New</Button
          >
        </template>
      </AppHeader>
      <InvoiceCards
        :users="filteredInvoices"
        @edit="handleEdit"
        @delete="handleDelete"
        @delete-multiple="handleDeleteMultiple"
      />
    </v-col>
    <v-col v-if="activeView" cols="12" md="4" class="position-relative">
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
        <template v-if="activeView === 'add'">
          <InvoiceCreateCard @save="handleSaveNew" @cancel="closeSidebar" />
        </template>
        <template v-else-if="activeView === 'edit'">
          <InvoiceEditCard
            v-if="editingInvoice"
            :invoice="editingInvoice"
            @save="handleSaveEdit"
            @cancel="closeSidebar"
          />
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.min-width-145px {
  min-width: 145px;
}
</style>
