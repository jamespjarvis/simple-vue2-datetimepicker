<template>
  <div
    :class="editing ? 'open' : 'closed'"
    class="date-time input-group"
    @click="$emit('update')"
  >
    <div class="form-control">
      {{ displayDateTime }}
    </div>
    <div class="input-group-append">
      <div class="input-group-text">
        <CalendarIcon v-if="options.date" />
        <ClockIcon v-else />
      </div>
    </div>
  </div>
</template>
<script>
import CalendarIcon from "./icons/calendar.svg";
import ClockIcon from "./icons/clock.svg";

export default {
  name: "DateTime",
  components: {
    CalendarIcon,
    ClockIcon
  },
  props: {
    date: {
      type: Date,
      required: true
    },
    options: {
      type: Object,
      default: () => ({ date: true, time: true })
    },
    editing: {
      type: Boolean,
      required: true
    },
    formatOptions: {
      type: Object,
      required: true
    }
  },
  computed: {
    displayDateTime() {
      return this.date.toLocaleString(
        this.formatOptions.locale,
        this.formatOptions
      );

      // if (this.options.date && this.options.time) {
      //   return `${date} at ${time}`;
      // } else if (this.options.date && !this.options.time) {
      //   return `${date}`;
      // } else if (!this.options.date && this.options.time) {
      //   return `${time}`;
      // } else {
      //   return `Beep Boop`;
      // }
    }
  }
};
</script>
<style lang="scss">
.date-time {
  text-align: center;
}
</style>
