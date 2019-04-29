<template>
  <div 
    :class="editing ? 'open' : 'closed'" 
    class="date-time input-group" 
    @click="$emit('update')">
    <div class="form-control">
      {{ displayDateTime }}
    </div>
    <div class="input-group-append">
      <div class="input-group-text">
        <svg 
          v-if="options.date" 
          height="24" 
          viewBox="0 0 24 24" 
          width="24" 
          xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
          <path 
            d="M0 0h24v24H0z" 
            fill="none"/>
        </svg>
        <svg 
          v-else 
          height="24" 
          viewBox="0 0 24 24" 
          width="24" 
          xmlns="http://www.w3.org/2000/svg">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          <path 
            d="M0 0h24v24H0z" 
            fill="none"/>
          <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DateTime",
  props: {
    date: {
      type: Date,
      default: () => new Date()
    },
    options: {
      type: Object,
      default: () => ({ date: true, time: true })
    },
    editing: {
      type: Boolean,
      required: true
    },
    locale: {
      type: String,
      required: true
    },
    militaryTime: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    displayDateTime() {
      const date = this.date.toLocaleDateString(this.locale, {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
      });
      const time = this.date.toLocaleTimeString(this.locale, {
        hour: "numeric",
        minute: "numeric",
        hour12: !this.militaryTime
      });
      if (this.options.date && this.options.time) {
        return `${date}, ${time}`;
      } else if (this.options.date && !this.options.time) {
        return `${date}`;
      } else if (!this.options.date && this.options.time) {
        return `${time}`;
      } else {
        return `Beep Boop`;
      }
    }
  }
};
</script>
