<template>
  <div class="date-picker">
    <header>
      <ChevronLeft @click="setMonth(-1)" />
      <span>
        {{ currentMonth }}
        <b>{{ currentYear }}</b>
      </span>
      <ChevronRight @click="setMonth(1)" />
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
import ChevronLeft from "../icons/chevron-left.svg";
import ChevronRight from "../icons/chevron-right.svg";

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
} from "../utils/index.js";

import Calendar from "./Calendar.vue";
export default {
  name: "DatePicker",
  components: {
    Calendar,
    ChevronRight,
    ChevronLeft
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
      default: "en-US"
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
    },
    currentYear() {
      return this.value.getFullYear();
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
      this.$emit("update:daterange", d);
      this.$emit("input", d);
    }
  }
};
</script>
