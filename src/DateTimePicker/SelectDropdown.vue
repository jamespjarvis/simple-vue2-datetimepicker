<template>
  <div class="select-dropdown" :class="show ? 'is-active' : ''">
    <div class="selected" @click="show = !show">
      <span>{{ value !== null ? padNum(value) : "Select an item..." }}</span>
      <svg
        fill="#17a2b8"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
    <div class="dropdown scrollbar">
      <div
        v-for="(option, i) in options"
        :key="i"
        :class="option === value ? 'active' : ''"
        class="option"
        @click="handleSelect(option)"
      >
        <div class="option__inner">
          {{ padNum(option) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelectDropdown",
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
  mounted() {
    window.addEventListener("click", this.onClick);
  },
  destroyed() {
    window.removeEventListener("click", this.onClick);
  },
  methods: {
    onClick(e) {
      if (!this.$el.contains(e.target)) {
        this.show = false;
      }
    },
    padNum(num) {
      return String(num).padStart(2, "0");
    },
    handleSelect(option) {
      // this.show = false;
      this.$emit("input", option);
    }
  }
};
</script>
<style lang="scss">
.select-dropdown {
  position: relative;
  // margin-bottom: -1px;
  flex: 1;
  background-color: #f4f4f4;
  // border: 1px solid #ced4da;
  // z-index: 1000;
  &:not(:first-child) {
    margin-left: -1px;
  }

  // & + .datetimepicker-select {
  //   margin-left: -1px;
  // }
  .dropdown {
    // &:not(:first-child) {
    //   margin-left: -1px;
    // }
    // border: 1px solid #ced4da;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;

    max-height: 250px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    // border: 1px solid #ced4da;
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
    .selected {
      svg {
        transform: rotate(180deg);
      }
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
    // margin-top: -1px;
    cursor: pointer;
    user-select: none;
    border: 1px solid #ced4da;
    color: #495057;
    text-align: inherit;
    padding: 0.5rem 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    position: relative;
    // transition: 0.2s cubic-bezier(1, -0.115, 0.975, 0.855);
    transition: 200ms ease;

    // &:not(:first-child):not(:last-child) {
    //   border-radius: 0;
    // }
    span {
      flex: 1;
    }
    svg {
      fill: #495057;
      // transition: 0.2s cubic-bezier(1, -0.115, 0.975, 0.855);
      transition: 200ms ease;

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

.option {
  color: #333;
  background-color: #f0f0f0;
}

.option {
  cursor: pointer;
  border-radius: 0;
  color: #495057;
  text-align: inherit;
  position: relative;
  display: block;
  padding: 0.5rem 1rem;
  margin-top: -1px;
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  // border: 1px solid rgba(0, 0, 0, 0.25);
}

.option:last-child {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  margin-bottom: -1px;
}

.option.selected,
.option:hover {
  background-color: #aaa;
}

.option:hover,
.option:focus {
  color: #495057;
  text-decoration: none;
  background-color: #f8f9fa;
}

.option:active {
  color: #212529;
  background-color: #e9ecef;
}

.option.active {
  z-index: 2;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
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
