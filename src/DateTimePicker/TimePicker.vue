<template>
  <div class="time-picker">
    <SelectDropdown
      :value="hour12Format"
      :options="hours"
      @input="val => updateHours(val)"
    />
    <SelectDropdown
      :value="minute"
      :options="minutes"
      @input="val => updateValue('minute', val)"
    />
    <SelectDropdown
      v-show="!militaryTime"
      v-model="ampm"
      :options="['AM', 'PM']"
    />
  </div>
</template>
<script>
import SelectDropdown from "./SelectDropdown.vue";
import { militaryHours, hours, minutes } from "./utils";

export default {
  name: "TimePicker",
  components: {
    SelectDropdown
  },
  props: {
    value: {
      type: Date,
      default: new Date()
    },
    militaryTime: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const minute = Math.round(this.value.getMinutes() / 5) * 5;
    return {
      hour: this.value.getHours(),
      minute,
      ampm: this.value.getHours() > 12 ? "PM" : "AM",
      minutes
    };
  },
  computed: {
    hours() {
      return this.militaryTime ? militaryHours : hours;
    },
    hour12Format() {
      return this.getHours();
    },
    internalAMPM() {
      return this.hour > 12 ? "PM" : "AM";
    }
  },
  watch: {
    ampm() {
      this.updateHours(this.hour);
    }
  },
  methods: {
    getHours() {
      return this.militaryTime ? this.hour : this.getHour12Format(this.hour);
    },
    getHour12Format(hour) {
      return hour > 12 ? hour - 12 : hour ? hour : 12;
    },
    updateHours(hour) {
      if (this.militaryTime) {
        this.hour = hour;
      } else {
        if (this.ampm === "PM") {
          this.hour = hour < 12 ? hour + 12 : hour;
        }

        if (this.ampm === "AM") {
          this.hour = hour >= 12 ? hour - 12 : hour;
        }
      }

      this.updateValue("hour", this.hour);
    },
    updateValue(key, value) {
      this[key] = value;
      const d = new Date(this.value.getTime());
      d.setHours(this.hour, this.minute);
      this.$emit("input", d);
    }
  }
};
</script>

<style lang="scss">
/*
 *
 * TIME PICKER
 *
 */

.time-picker {
  display: flex;
  align-items: stretch;

  // border-right: 1px solid #ced4da;
  // border-left: 1px solid #ced4da;
  // border-right: 1px solid #ced4da;
  // border-bottom: 1px solid #ced4da;
}

/*
 *
 * SELECT
 *
 */

.select-dropdown {
  position: relative;
  margin-bottom: -1px;
  flex: 1;
  background-color: #f4f4f4;
  border: 1px solid #ced4da;
  & + .datetimepicker-select {
    margin-left: -1px;
  }

  .selected {
    cursor: pointer;
    user-select: none;
    // border: 1px solid rgba(0, 0, 0, 0.125);
    // border-top: 1px solid #ced4da;
    // border-radius: 0.25rem;
    color: #495057;
    text-align: inherit;
    padding: 0.25rem 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    position: relative;
    transition: 0.2s cubic-bezier(1, -0.115, 0.975, 0.855);
    span {
      flex: 1;
    }
    svg {
      transition: 0.2s cubic-bezier(1, -0.115, 0.975, 0.855);
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
  &:first-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0.25rem;
  }
  &:last-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0.25rem;
  }
  &:not(:first-child):not(:last-child) {
    border-radius: 0;
  }
}

.option {
  color: #333;
  background-color: #f0f0f0;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 250px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  visibility: hidden;
  filter: alpha(opacity=0);
  opacity: 0;
  transition: opacity 200ms ease;
  &.is-active {
    visibility: visible;
    opacity: 1;
    filter: alpha(opacity=100);
  }
}

.option {
  cursor: pointer;
  border-radius: 0;
  color: #495057;
  text-align: inherit;
  position: relative;
  display: block;
  padding: 0.5rem 1rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.option:first-child {
  border-top: none;
}

.option:last-child {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.option:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
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
