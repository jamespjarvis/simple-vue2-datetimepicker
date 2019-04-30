<template>
  <div :class="classList" @click="$emit('select', date)">
    <div class="day__inner">
      {{ day }}
    </div>
  </div>
</template>

<script>
import { nextMonth, isSameDay } from "../utils/index.js";

export default {
  name: "Day",
  props: {
    date: {
      type: Date,
      required: true
    },
    currentDate: {
      type: Date,
      required: true
    },
    selected: {
      type: Date,
      required: true
    }
  },
  computed: {
    day() {
      return this.date.getDate();
    },
    classList() {
      const today = new Date();
      const isToday = isSameDay(today, this.date);
      return [
        "day",
        `${this.getType()}-month`,
        isToday ? "today" : "",
        isSameDay(this.selected, this.date) ? "selected" : ""
      ].join(" ");
    }
  },
  methods: {
    getType() {
      return nextMonth(this.currentDate, -1).getMonth() === this.date.getMonth()
        ? "prev"
        : nextMonth(this.currentDate, 1).getMonth() === this.date.getMonth()
        ? "next"
        : "current";
    }
  }
};
</script>

<style lang="scss">
.day {
  user-select: none;
  height: 0;
  padding-top: 80%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: all 50ms ease-out;

  .day__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.selected,
  &.today {
    box-shadow: none;
  }
  &.prev-month,
  &.next-month {
    color: rgb(201, 201, 201);
  }

  &.today {
    z-index: 2;
    background-color: hsl(0, 96%, 92%);
  }
  &.selected {
    z-index: 3;
    background-color: #f4f4f4;
    outline: 2px solid #ced4ce;
  }
}
</style>
