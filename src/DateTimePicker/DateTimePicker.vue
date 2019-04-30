<template>
  <div class="date-time-picker" :class="editing ? 'is-active' : ''">
    <DateTime
      :date="selectedDate"
      :editing="editing"
      :format-options="mergedFormatOptions"
      @update="editing = !editing"
    />
    <div class="datetimepicker__inputs">
      <DatePicker
        :value="selectedDate"
        :current-date="currentDate"
        :start-day="startDay"
        :locale="mergedFormatOptions.locale"
        @update:daterange="d => updateDateRange(d)"
        @input="d => updateDate(d)"
      />
      <TimePicker
        :value="currentDate"
        :military-time="!mergedFormatOptions.hour12"
        @input="d => updateTime(d)"
      />
    </div>
  </div>
</template>
<script>
import { hours, minutes } from "./utils/index.js";

import DateTime from "./components/DateTime.vue";
import TimePicker from "./components/TimePicker.vue";
import DatePicker from "./components/DatePicker.vue";

export default {
  name: "DateTimePicker",
  components: {
    DateTime,
    DatePicker,
    TimePicker
  },
  props: {
    value: {
      type: Date,
      required: false,
      default: () => new Date()
    },
    date: {
      type: Boolean,
      default: true
    },
    time: {
      type: Boolean,
      default: true
    },
    startDay: {
      type: String,
      required: false,
      default: "Sunday"
    },
    formatOptions: {
      type: Object,
      default: () => ({})
    },
    displayOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      editing: false,
      selectedDate: this.value,
      currentDate: this.value,
      hours,
      minutes,
      defaultOptions: {
        timeFormat: {
          locale: "en-US",
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true
        }
      },
      mergedFormatOptions: {}
    };
  },
  created() {
    this.handleOutClick = window.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.editing = false;
      }
    });
    this.mergedFormatOptions = {
      ...this.defaultOptions.timeFormat,
      ...this.formatOptions
    };
  },
  mounted() {},
  destroyed() {
    window.removeEventListener("click", this.handleOutClick);
  },
  methods: {
    updateDate(d) {
      const hours = this.selectedDate.getHours();
      const minutes = this.selectedDate.getMinutes();
      d.setHours(hours, minutes);
      this.selectedDate = d;

      this.$emit("input", d);
    },
    updateDateRange(d) {
      const hours = this.currentDate.getHours();
      const minutes = this.currentDate.getMinutes();
      d.setHours(hours, minutes);
      this.currentDate = d;
    },
    updateTime(d) {
      this.selectedDate = d;
      this.$emit("input", d);
    }
  }
};
</script>
<style lang="scss">
.date-time-picker {
  position: relative;
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  &.is-active {
    .datetimepicker__inputs {
      // box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.125);
      opacity: 1;
      visibility: visible;
      opacity: 1;
      filter: alpha(opacity=100);
    }
    .input-group-text {
      border-bottom-right-radius: 0;
    }
  }

  /*
 *
 * DATE TIME PICKER
 *
 */

  .datetimepicker__inputs {
    z-index: 1;
    visibility: hidden;
    filter: alpha(opacity=0);
    opacity: 0;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: auto;
    z-index: 1000;

    transition: 200ms ease;
    display: flex;
    flex-direction: column;
    height: auto;
    margin-top: -1px;
    // border-bottom: 1px solid #ced4da;
    // border-left: 1px solid #ced4da;
    // border-right: 1px solid #ced4da;
    // border-bottom-left-radius: 0.25rem;
    // border-bottom-right-radius: 0.25rem;
    // overflow: hidden;
    border: none;
    // .datetimepicker-select {
    //   border-radius: 0;
    // }
    // .datetimepicker-select:last-child {
    //   // border-bottom-left-radius: 0.25rem;
    //   border-bottom-right-radius: 0.25rem;
    // }
    // .datetimepicker-select:first-child {
    //   border-bottom-left-radius: 0.25rem;
    //   // border-bottom-right-radius: 0.25rem;
    // }
  }

  /*
 *
 * DATE PICKER
 *
 */

  .date-picker {
    border-radius: 0;
    // border: none;
    border-right: 1px solid #ced4da;
    border-left: 1px solid #ced4da;
    // border-top: 1px solid #ced4da;
  }

  .date-picker header {
    background-color: #f4f4f4;
    padding: 0.375rem 0.75rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ced4da;
    border-top: 1px solid #ced4da;
    // border: 1px solid #ced4da;
    user-select: none;
  }

  .date-picker header svg {
    cursor: pointer;
  }

  .date-picker header span {
    height: 1.5rem;
    font-size: 1.25rem;
    line-height: 1.5rem;
  }
}
</style>
