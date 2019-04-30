<template>
  <div class="calendar">
    <small v-for="d in weekdays" :key="d" class="weekday">{{ d }}</small>
    <Day
      v-for="(day, j) in days"
      :key="`day-${j}`"
      :date="day.date"
      :current-date="value"
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
  },
  data() {
    return {
      weekdays: weekdaysShort
    };
  }
};
</script>

<style lang="scss">
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: #ced4da;
  width: 100%;

  .weekday {
    text-align: center;
    padding: 0.15rem;
    background-color: #f4f4f4;
  }
}
</style>
