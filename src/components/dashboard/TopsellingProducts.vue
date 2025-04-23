<template>
  <v-card class="pa-4" elevation="0">
    <v-card-title class="text-h6 font-weight-bold mb-5">
      Top Selling Products
    </v-card-title>


    <v-list>
      <v-list-item
        v-for="(product, index) in products"
        :key="index"
        class="px-4 d-flex w-full"
      >
        <div class="d-flex align-center ga-5">
          <v-list-item-avatar size="70">
            <v-img
              :src="product.image"
              alt="Product image"
              width="96"
              rounded
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">{{
              product.name
            }}</v-list-item-title>

            <v-rating
              v-model="product.rating"
              color="yellow"
              dense
              readonly
              size="18"
              half-increments
            ></v-rating>

            <div class="text-subtitle-1 font-weight-bold mt-1">
              ${{ product.price }}
            </div>
          </v-list-item-content>
        </div>
        <v-divider v-if="index < products.length - 1" class="my-6 w-full"></v-divider>
      </v-list-item>

      <v-divider
        v-if="index < products.length - 1"
        :key="'divider-' + index"
      ></v-divider>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const products = ref([
  {
    name: "NIKE Shoes Black Pattern",
    image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460", // replace with actual image
    rating: 4,
    price: 87,
  },
  {
    name: "iPhone 12",
    image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460", // replace with actual image
    rating: 5,
    price: 987,
  },
]);
</script>

<style scoped>
.v-list-item {
  align-items: flex-start;
}
</style>
