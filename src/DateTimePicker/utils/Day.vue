<template>
  <div :class="classList" @click="$emit('select')">
    <div class="day__inner">
      {{ day }}
    </div>
  </div>
</template>

<script>
import { nextMonth, isSameDay } from "./utils/index.js";

export default {
  name: "Day",
  props: {
    date: {
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
      return nextMonth(this.selected, -1).getMonth() === this.date.getMonth()
        ? "prev"
        : nextMonth(this.selected, 1).getMonth() === this.date.getMonth()
        ? "next"
        : "current";
    }
  }
};
</script>

<style lang="scss">
// .day {
//   user-select: none;
//   height: 0;
//   padding-top: 80%;
//   font-size: 1rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   // box-shadow: inset 0 0 1px #ced4da;
//   border: 1px solid #ced4da;
//   cursor: pointer;
//   position: relative;
//   z-index: 1;

//   .day__inner {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }
//   $selected-color: #1e88e5;
//   &.selected {
//     background-color: $selected-color;
//     border-color: $selected-color;
//     color: #fff;
//   }
//   &.prev-month,
//   &.next-month {
//     color: rgb(201, 201, 201);
//   }
//   $today-color: hsl(0, 72%, 56%);
//   &.today {
//     background-color: $today-color;
//     border-color: $today-color;
//     color: #fff;
//   }
// }
</style>
