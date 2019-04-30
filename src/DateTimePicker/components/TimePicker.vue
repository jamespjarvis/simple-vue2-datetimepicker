<template>
  <div class="time-picker">
    <SelectDropdown
      :value="hour12Format"
      :options="hours"
      @input="val => updateHours(val)"
    />
    <SelectDropdown
      :value="minute"
      :options="minutes"
      @input="val => updateValue('minute', val)"
    />
    <SelectDropdown v-show="!militaryTime" v-model="ampm" :options="period" />
  </div>
</template>
<script>
import SelectDropdown from "./SelectDropdown.vue";

import { militaryHours, hours, minutes } from "../utils/index.js";

const generateOptions = arr => {
  return arr.map(i => ({
    text:
      typeof i === "string" ? i.padStart(2, "0") : String(i).padStart(2, "0"),
    value: i
  }));
};

export default {
  name: "TimePicker",
  components: {
    SelectDropdown
  },
  props: {
    value: {
      type: Date,
      default: new Date()
    },
    militaryTime: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const minute = Math.round(this.value.getMinutes() / 5) * 5;

    return {
      hour: this.value.getHours(),
      minute,
      ampm: this.value.getHours() > 12 ? "PM" : "AM",
      minutes: generateOptions(minutes),
      hours: generateOptions(this.militaryTime ? militaryHours : hours),
      period: generateOptions(["AM", "PM"])
    };
  },
  computed: {
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
        const h = typeof hour === "number" ? hour : parseInt(hour);

        if (this.ampm === "PM") {
          this.hour = h < 12 ? h + 12 : h;
        }

        if (this.ampm === "AM") {
          this.hour = h >= 12 ? h - 12 : h;
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

<style lang="scss">
.time-picker {
  display: flex;
  align-items: stretch;
}
</style>
