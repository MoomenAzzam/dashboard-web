<template>
  <v-card class="pa-4" elevation="0">
    <v-card-title class="text-h6 font-weight-bold">Recent Orders</v-card-title>
    <v-table class="mt-3" style="font-size: 12px;">
      <thead>
        <tr>
          <th class="text-left" @click="sortBy('tracking')">
            Tracking no
            <v-icon v-if="sortKey === 'tracking'" size="small">
              {{ sortIcon }}
            </v-icon>
          </th>
          <th class="text-left" @click="sortBy('name')">
            Product Name
            <v-icon size="small">
              {{ sortIcon }}
            </v-icon>
          </th>
          <th class="text-left" @click="sortBy('price')">
            Price
            <v-icon size="small">
              {{ sortIcon }}
            </v-icon>
          </th>
          <th class="text-left" @click="sortBy('totalOrder')">
            Total Order
            <v-icon size="small">
              {{ sortIcon }}
            </v-icon>
          </th>
          <th class="text-left" @click="sortBy('totalAmount')">
            Total Amount
            <v-icon size="small">
              {{ sortIcon }}
            </v-icon>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in sortedOrders" :key="index">
          <td>{{ order.tracking }}</td>
          <td class="d-flex align-center">
            <v-avatar size="32" class="me-3" rounded>
              <v-img :src="order.image" />
            </v-avatar>
            {{ order.name }}
          </td>
          <td>{{ order.price }}</td>
          <td>
            <v-chip
              color="blue-lighten-1"
              text-color="sky"
              class="font-weight-bold"
            >
              {{ order.totalOrder }}
            </v-chip>
          </td>
          <td>{{ order.totalAmount }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
export default {
  name: "RecentOrdersTable",
  data() {
    return {
      orders: [
        {
          tracking: "#876364",
          name: "Camera Lens",
          image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          price: "$178",
          totalOrder: 325,
          totalAmount: "$1,46,660",
        },
        {
          tracking: "#876368",
          name: "Black Sleep Dress",
          image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          price: "$14",
          totalOrder: 53,
          totalAmount: "$46,660",
        },
        {
          tracking: "#876412",
          name: "Argan Oil",
          image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          price: "$21",
          totalOrder: 78,
          totalAmount: "$3,46,676",
        },
        {
          tracking: "#876621",
          name: "EAU DE Parfum",
          image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          price: "$32",
          totalOrder: 98,
          totalAmount: "$3,46,981",
        },
      ],
      sortKey: "",
      sortOrder: 1, // 1 for ascending, -1 for descending
    };
  },
  computed: {
    sortedOrders() {
      if (!this.sortKey) return this.orders;

      return [...this.orders].sort((a, b) => {
        // Extract numerical values for sorting (remove $ and commas)
        const getValue = (value) => {
          if (typeof value === "string") {
            const num = parseFloat(value.replace(/[^0-9.-]+/g, ""));
            return isNaN(num) ? value : num;
          }
          return value;
        };

        const aValue = getValue(a[this.sortKey]);
        const bValue = getValue(b[this.sortKey]);

        if (aValue < bValue) return -1 * this.sortOrder;
        if (aValue > bValue) return 1 * this.sortOrder;
        return 0;
      });
    },
    sortIcon() {
      return this.sortOrder === 1 ? "mdi-menu-down" : "mdi-menu-up";
    },
  },
  methods: {
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder *= -1; // Toggle order
      } else {
        this.sortKey = key;
        this.sortOrder = 1; // Default to ascending
      }
    },
  },
};
</script>

<style scoped>
.v-table thead th {
  font-weight: 600;
  color: #555;
  cursor: pointer;
  user-select: none;
}
.v-table thead th:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
.v-chip {
  min-width: 50px;
  justify-content: center;
}
</style>
