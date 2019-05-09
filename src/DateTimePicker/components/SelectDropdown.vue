<template>
  <div class="select-dropdown" :class="show ? 'is-active' : ''">
    <div class="selected" @click="show = !show">
      <span>{{ displayValue }}</span>
      <ExpandLess v-if="show" />
      <ExpandMore v-else />
    </div>
    <div class="dropdown scrollbar">
      <DropdownItem
        v-for="(option, i) in options"
        :key="`option-${i}`"
        :option="option"
        :selected="option.value === value"
        @select="handleSelect(option)"
      />
    </div>
  </div>
</template>
<script>
import ExpandMore from "../icons/expand-more.svg";
import ExpandLess from "../icons/expand-less.svg";

import DropdownItem from "./SelectDropdownItem.vue";

export default {
  name: "SelectDropdown",
  components: {
    DropdownItem,
    ExpandMore,
    ExpandLess
  },
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
  computed: {
    displayValue() {
      return this.pad(this.value);
    }
  },
  mounted() {
    window.addEventListener("click", this.onClick);
  },
  destroyed() {
    window.removeEventListener("click", this.onClick);
  },
  methods: {
    pad(input) {
      return typeof input === "string"
        ? input.padStart(2, "0")
        : String(input).padStart(2, "0");
    },
    onClick(e) {
      if (!this.$el.contains(e.target)) {
        this.show = false;
      }
    },
    handleSelect(option) {
      this.$emit("input", option.value);
    }
  }
};
</script>
<style lang="scss">
.select-dropdown {
  position: relative;
  flex: 1;
  background-color: #f4f4f4;
  &:not(:first-child) {
    margin-left: -1px;
  }
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;

    max-height: 250px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding-left: 0;

    border-left: 1px solid #ced4da;
    border-right: 1px solid #ced4da;
    border-bottom: 1px solid #ced4da;

    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;

    visibility: hidden;
    filter: alpha(opacity=0);
    opacity: 0;
    transition: opacity 200ms ease;
  }

  &.is-active {
    &:first-child {
      border-bottom-left-radius: 0;
    }
    &:last-child {
      border-bottom-right-radius: 0;
    }
    .dropdown {
      visibility: visible;
      opacity: 1;
      filter: alpha(opacity=100);
    }
  }
  &:not(.is-active) {
    &:first-child {
      .selected {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0.25rem;
      }
    }
    &:last-child {
      .selected {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0.25rem;
      }
    }
  }
  .selected {
    cursor: pointer;
    user-select: none;
    border: 1px solid #ced4da;
    color: #495057;
    text-align: inherit;
    padding: 0.5rem 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    // font-size: 1.25rem;
    position: relative;
    transition: 200ms ease;

    span {
      text-align: center;
      flex: 1;
    }
    &:hover {
      svg {
        transform: scale(1.2);
      }
    }
    svg {
      fill: #495057;
      transition: 400ms ease;

      cursor: pointer;
      height: 1.5rem;
      width: 1.5rem;
      &.open {
        transform: rotate(180deg);
      }
    }
    &.open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}

/*
   * SCROLLBAR
   */

.scrollbar::-webkit-scrollbar-track {
  background-color: transparent;
}

.scrollbar::-webkit-scrollbar {
  width: 0rem;
  background-color: transparent;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #17a2b8;
}
</style>
