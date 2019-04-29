<template>
  <div :class="classList" @click="$emit('select')">{{ day }}</div>
</template>

<script>
import { nextMonth, isSameDay } from "../utils";

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

<style></style>
