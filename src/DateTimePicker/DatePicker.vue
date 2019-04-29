<template>
  <div class="date-picker">
    <header>
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        @click="setMonth(-1)"
      >
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
      <span
        >{{ currentMonth }}&nbsp;<b>{{ value.getFullYear() }}</b></span
      >
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        @click="setMonth(1)"
      >
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </header>
    <Calendar
      :days="displayRows"
      :value="currentDate"
      :selected="value"
      @select="onSelect"
    />
  </div>
</template>
<script>
import {
  getMonthName,
  getFirstDateOfMonth,
  getLastDateOfMonth,
  nextDate,
  getClearHoursTime,
  initialize2DArray,
  deepFlatten,
  weekdays,
  weekdaysShort
} from "./utils";

import Calendar from "./Calendar/Calendar.vue";
export default {
  name: "DatePicker",
  components: {
    Calendar
  },
  props: {
    value: {
      type: Date,
      default: () => new Date()
    },
    startDay: {
      type: String,
      required: true
    },
    locale: {
      type: String,
      required: true
    },
    currentDate: {
      type: Date,
      required: true
    }
  },
  data() {
    return {
      weekdaysShort
    };
  },
  computed: {
    currentMonth() {
      return getMonthName(this.currentDate, this.locale);
    },
    displayRows() {
      return this.init();
    },
    selectedDate() {
      return new Date(getClearHoursTime(Date.parse(this.value)));
    }
  },
  watch: {
    value() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const date = this.currentDate;
      const currentYear = date.getFullYear();
      const currentMonth = date.getMonth();

      const firstDateOfMonth = getFirstDateOfMonth(date);
      const firstWeekday = firstDateOfMonth.getDay();

      const lastDateOfMonth = getLastDateOfMonth(date);

      const mod = (firstWeekday + 7) % 7;

      const startDay = weekdays.findIndex(
        d => d.toUpperCase() === this.startDay.toUpperCase()
      );

      const startIndex = startDay < 0 ? 0 : startDay;

      this.weekdaysShort = [
        ...weekdaysShort.slice(startIndex),
        ...weekdaysShort.slice(0, startIndex)
      ];

      const displayStartDate = new Date(
        currentYear,
        currentMonth,
        firstDateOfMonth.getDate() - (mod - startIndex)
      );

      const minTime = firstDateOfMonth.getTime();
      const maxTime = lastDateOfMonth.getTime();

      const rows = initialize2DArray(7, 7);
      const displayRows = rows
        .map((r, i) => {
          return r.map((c, j) => {
            const index = i * 7 + j;
            const d = nextDate(displayStartDate, index);
            const time = d.getTime();
            const isToday = time === getClearHoursTime(Date.now());
            const selected =
              getClearHoursTime(this.currentDate.getTime()) ===
              getClearHoursTime(d.getTime())
                ? "selected"
                : "";
            return {
              date: d,
              text: d.getDate(),
              selected,
              type:
                time < minTime
                  ? "prev-month"
                  : time > maxTime
                  ? "next-month"
                  : "current-month",
              isToday
            };
          });
        })
        .filter(
          r => !r.every(c => c.type === "next-month" || c.type === "prev-month")
        );

      return deepFlatten(displayRows);
    },
    setMonth(offset) {
      const d = new Date();
      const day = this.currentDate.getDate();
      d.setMonth(this.currentDate.getMonth() + offset, day);
      this.$emit("update:daterange", d);
    },
    onSelect(d) {
      this.$emit("input", d);
    }
  }
};
</script>
