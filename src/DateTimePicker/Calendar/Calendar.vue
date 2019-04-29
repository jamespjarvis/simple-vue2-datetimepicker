<template>
  <div class="calendar">
    <small v-for="d in weekdays" :key="d" class="weekday">{{ d }}</small>
    <Day
      v-for="(day, j) in days"
      :key="`day-${j}`"
      :date="day.date"
      :currentDate="value"
      :selected="selected"
      @select="d => $emit('select', d)"
    />
  </div>
</template>

<script>
import Day from "./Day.vue";
import { weekdaysShort } from "../utils/index.js";

export default {
  name: "Calendar",
  components: {
    Day
  },
  data() {
    return {
      weekdays: weekdaysShort
    };
  },
  props: {
    value: {
      type: Date,
      required: true
    },
    selected: {
      type: Date,
      required: true
    },
    days: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss">
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  background-color: #fff;
  // border: 1px solid red;
  // border-left: 1px solid #ced4da;
  // border-right: 1px solid #ced4da;
  // overflow: hidden;
  .weekday {
    text-align: center;
    padding: 0.15rem;
    background-color: #f4f4f4;
    border-bottom: 1px solid #ced4da;
    &:not(:last-child) {
      border-right: 1px solid #ced4da;
    }
  }
}
</style>
