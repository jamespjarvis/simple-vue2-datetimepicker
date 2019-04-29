<template>
  <div class="time-picker">
    <Select
      :value="hour12Format"
      :options="hours"
      @input="val => updateHours(val)"
    />
    <Select
      :value="minute"
      :options="minutes"
      @input="val => updateValue('minute', val)"
    />
    <Select v-if="!militaryTime" v-model="ampm" :options="['AM', 'PM']" />
  </div>
</template>
<script>
import Select from "./Select.vue";
import { militaryHours, hours, minutes } from "./utils";

export default {
  name: "TimePicker",
  components: {
    Select
  },
  props: {
    value: {
      type: Date,
      default: new Date()
    },
    militaryTime: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const minute = Math.round(this.value.getMinutes() / 5) * 5;
    return {
      hour: this.value.getHours(),
      minute,
      ampm: this.value.getHours() > 12 ? "PM" : "AM",
      minutes
    };
  },
  computed: {
    hours() {
      return this.militaryTime ? militaryHours : hours;
    },
    hour12Format() {
      return this.getHours();
    },
    internalAMPM() {
      return this.hour > 12 ? "PM" : "AM";
    }
  },
  watch: {
    ampm() {
      this.updateHours(this.hour);
    }
  },
  methods: {
    getHours() {
      return this.militaryTime ? this.hour : this.getHour12Format(this.hour);
    },
    getHour12Format(hour) {
      return hour > 12 ? hour - 12 : hour ? hour : 12;
    },
    updateHours(hour) {
      if (this.militaryTime) {
        this.hour = hour;
      } else {
        if (this.ampm === "PM") {
          this.hour = hour < 12 ? hour + 12 : hour;
        }

        if (this.ampm === "AM") {
          this.hour = hour >= 12 ? hour - 12 : hour;
        }
      }

      this.updateValue("hour", this.hour);
    },
    updateValue(key, value) {
      this[key] = value;
      const d = new Date(this.value.getTime());
      d.setHours(this.hour, this.minute);
      this.$emit("input", d);
    }
  }
};
</script>
