# SIMPLE VUE 2 DATE TIME PICKER

Vue.js component for easy date and time picking.

![](usage.gif)

## Installation

```bash
# npm
npm i simple-vue2-datetimepicker
```

```bash
# yarn
yarn add simple-vue2-datetimepicker
```

```bash
# unpkg
https://unpkg.com/simple-vue2-datetimepicker
```

## Usage

### Component

```html
<template>
  <div id="app">
    <DateTimePicker v-model="myDate" :options="options"></DateTimePicker>
  </div>
</template>

<script>
  import DateTimePicker from "simple-vue2-datetimepicker";

  export default {
    name: "App",
    components: {
      DateTimePicker
    },
    data() {
      return {
        myDate: new Date(),
        options: {
            // defaults
          timeFormat: {
            locale: "en-US",
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true
          },
          display: {
            maxWidth: 400
          }
        }
      };
    }
  };
</script>
```
### Global

```javascript
import DateTimePicker from "simple-vue2-datetimepicker";
Vue.component('datetimepicker', DateTimePicker);
```

### Plugin

```javascript
import DateTimePicker from "simple-vue2-datetimepicker";
Vue.use(SimpleVue2DateTimePicker);
```


## Development

- clone this repository
- install dependencies
- start the webpack development server with `yarn serve` or `npm run serve`
- go to `http://localhost:8080` in your browser
