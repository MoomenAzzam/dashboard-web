<template>
  <button>
    <v-icon color="white" v-if="icon">{{ icon }}</v-icon>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
button {
  background-color: #5b93ff30;
  color: #5b93ff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center; /* Ensure icon and text are vertically aligned */
  gap: 10px;
  transition: background-color 0.3s, box-shadow 0.3s;
  &:hover {
    background-color: #5b92ff30;
  }

  /* Ensure icon color is white */
  .v-icon {
    color: #5b93ff !important;
  }
}
</style>
