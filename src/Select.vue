<template>
  <div class="datetimepicker-select">
    <div 
      :class="show ? 'open' : 'closed'" 
      class="selected"
      @click="show = !show">
      <span>{{ value !== null ? padNum(value) : 'Select an item...' }}</span>
      <svg 
        :fill="show ? '#17a2b8' : '#aaa'" 
        :class="show ? 'open' : 'closed'" 
        height="24" 
        viewBox="0 0 24 24" 
        width="24" 
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
        <path 
          d="M0 0h24v24H0z" 
          fill="none"/>
      </svg>
    </div>
    <transition name="slide">
      <div 
        v-if="show" 
        class="dropdown scrollbar">
        <div 
          v-for="(option, i) in options" 
          :key="i" 
          :class="option === value ? 'active' : ''"
          class="option"
          @click="handleSelect(option)">
          {{ padNum(option) }}
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "Select",
  props: {
    value: {
      type: [Number, String],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    padNum(num) {
      return String(num).padStart(2, "0");
    },
    handleSelect(option) {
      this.show = false;
      this.$emit("input", option);
    }
  }
};
</script>
