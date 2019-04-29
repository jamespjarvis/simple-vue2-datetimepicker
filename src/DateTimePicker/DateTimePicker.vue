<template>
  <div
    class="date-time-picker"
    :style="{ maxWidth: `${maxWidth}px` }"
    :class="editing ? 'is-active' : ''"
  >
    <DateTime
      :date="selectedDate"
      :options="options"
      :editing="editing"
      :formatOptions="mergedOptions"
      @update="editing = !editing"
    />
    <div class="inputs">
      <DatePicker
        v-if="options.date"
        :value="selectedDate"
        :currentDate="currentDate"
        :start-day="startDay"
        :locale="mergedOptions.locale"
        @update:daterange="d => updateDateRange(d)"
        @input="d => updateDate(d)"
      />
      <TimePicker
        v-if="options.time"
        :value="currentDate"
        :military-time="!mergedOptions.hour12"
        @input="d => updateTime(d)"
      />
    </div>
  </div>
</template>
<script>
import { hours, minutes } from "./utils/index.js";

import DateTime from "./DateTime.vue";
import TimePicker from "./TimePicker.vue";
import DatePicker from "./DatePicker.vue";

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
    maxWidth: {
      type: Number,
      required: false,
      default: 400
    },
    formatOptions: {
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
        locale: "en-US",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
      },
      mergedOptions: {},
      options: {
        date: this.date,
        time: this.time
      }
    };
  },
  created() {
    this.handleOutClick = window.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.editing = false;
      }
    });
  },
  mounted() {
    this.mergedOptions = { ...this.defaultOptions, ...this.formatOptions };
  },
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
      this.currentDate = d;
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
    .inputs {
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

  .inputs {
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
 * DATE TIME
 *
 */

  .date-time {
    display: flex;
    user-select: none;
  }

  .date-time.open > * {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .input-group > .form-control {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;
  }

  .form-control {
    padding: 0.375rem 0.75rem;
    display: block;
    width: 100%;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .form-control:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  svg,
  .form-control {
    cursor: pointer;
    fill: #252525;
  }

  .input-group-append {
    display: flex;
    margin-left: -1px;
    svg {
      fill: #495057;
    }
  }

  .input-group-text {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }

  .input-group-append > .input-group-text {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
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
