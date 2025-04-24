import { defineStore } from "pinia";

export const useInvoiceStore = defineStore("invoice", {
  state: () => ({
    invoices: [
      {
        id: 1,
        name: "Arrora Gaur",
        email: "arroragaur@gmail.com",
        phone: "+1234567890",
        gender: "Male",
        date: "12 Dec, 2020",
        status: "Complete",
        starred: 1,
      },
      {
        id: 2,
        name: "James Mullican",
        email: "jamesmullican@gmail.com",
        phone: "+1987654321",
        gender: "Female",
        date: "10 Dec, 2020",
        status: "Pending",
        starred: 0,
      },
      {
        id: 3,
        name: "Robert Bacins",
        email: "robertbacins@gmail.com",
        phone: "+1122334455",
        gender: "Male",
        date: "09 Dec, 2020",
        status: "Complete",
        starred: 0,
      },
      {
        id: 4,
        name: "Bethany Jackson",
        email: "bethanyjackson@gmail.com",
        phone: "+1222333444",
        gender: "Female",
        date: "09 Dec, 2020",
        status: "Cancel",
        starred: 1,
      },
    ],
    searchText: "",
  }),
  getters: {
    filteredInvoices(state) {
      if (!state.searchText) return state.invoices;
      const search = state.searchText.toLowerCase();
      return state.invoices.filter(
        (inv) =>
          inv.name.toLowerCase().includes(search) ||
          inv.email.toLowerCase().includes(search) ||
          inv.status.toLowerCase().includes(search)
      );
    },
  },
  actions: {
    addInvoice(invoice) {
      this.invoices.push(invoice);
    },
    updateInvoice(updated) {
      const idx = this.invoices.findIndex((i) => i.id === updated.id);
      if (idx !== -1) this.invoices[idx] = { ...updated };
    },
    deleteInvoice(id) {
      this.invoices = this.invoices.filter((i) => i.id !== id);
    },
    deleteMultiple(ids: number[]) {
      this.invoices = this.invoices.filter((i) => !ids.includes(i.id));
    },
    setSearchText(text: string) {
      this.searchText = text;
    },
  },
});
