<template>
  <div id="app">
    <h1 style="font-size: 36px;">
      {{
        myDate.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        })
      }}
    </h1>
    <div style="max-width: 500px;">
      <DateTimePicker v-model="myDate"></DateTimePicker>
    </div>
  </div>
</template>

<script>
import DateTimePicker from "./DateTimePicker/DateTimePicker.vue";

export default {
  name: "App",
  components: {
    DateTimePicker
  },
  data() {
    return {
      myDate: new Date("June 28, 2019, 5:00 PM")
    };
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Open Sans";
  width: 500px;
  text-align: center;
  margin: 0 auto;
}
</style>
