<template>
  <div class="calendar">
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
  }
};
</script>

<style lang="scss">
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  background-color: #fff;
}
</style>
