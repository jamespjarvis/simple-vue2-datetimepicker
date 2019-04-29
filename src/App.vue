<template>
  <div id="app">
    <DateTimePicker></DateTimePicker>
  </div>
</template>

<script>
import DateTimePicker from "./DateTimePicker/DateTimePicker.vue";

export default {
  name: "app",
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
