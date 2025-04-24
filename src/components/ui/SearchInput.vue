<template>
  <div class="search-input-wrapper">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.enter="onEnter"
      :placeholder="placeholder"
      class="search-input"
      type="text"
    />
    <span class="search-icon" @click="onEnter">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle
          cx="11"
          cy="11"
          r="7"
          stroke="#888"
          stroke-width="2"
          fill="none"
        />
        <line
          x1="16.5"
          y1="16.5"
          x2="21"
          y2="21"
          stroke="#888"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: "Search",
  },
});
const emit = defineEmits(["update:modelValue", "search"]);
const onEnter = () => emit("search", props.modelValue);
</script>

<style scoped>
.search-input-wrapper {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 0 18px 0 18px;
  height: 56px;
  box-sizing: border-box;
  width: 100%;
  box-shadow: none;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 18px;
  color: #23223a;
  height: 100%;
  padding: 0;
}

.search-input::placeholder {
  color: #030229;
  font-size: 18px;
  opacity: 1;
}

.search-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 8px;
}
</style>
