<template>
  <div id="app">
    <DateTimePicker v-model="myDate"></DateTimePicker>
  </div>
</template>

<script>
import DateTimePicker from "./DateTimePicker/DateTimePicker.vue";

export default {
  name: "app",
  data() {
    return {
      myDate: new Date("June 28, 2019, 5:00 PM")
    };
  },
  components: {
    DateTimePicker
  }
};
</script>
<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
