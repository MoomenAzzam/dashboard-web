<template>
  <v-container fluid>
    <div app dark :elevation="elevation" :height="height">
      <div class="d-flex align-center justify-space-between">
        <!-- Left slot -->
        <div>
          <slot name="left">
            <v-toolbar-title class="font-weight-bold text-h5">
              {{ title }}
            </v-toolbar-title>
          </slot>
        </div>

        <!-- Right slot -->
        <div class="d-flex align-center ga-3">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    title: {
      type: String,
      default: "My Application",
    },
    elevation: {
      type: Number,
      default: 0,
    },
    height: {
      type: [Number, String],
      default: 40,
    },
    hasDefaultActions: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
