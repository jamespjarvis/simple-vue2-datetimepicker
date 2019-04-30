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
        <CalendarIcon />
      </div>
    </div>
  </div>
</template>
<script>
import CalendarIcon from "../icons/calendar.svg";

export default {
  name: "DateTime",
  components: {
    CalendarIcon
  },
  props: {
    date: {
      type: Date,
      required: true
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
    }
  }
};
</script>
<style lang="scss">
.date-time {
  text-align: center;
  display: flex;
  user-select: none;
  cursor: pointer;

  &.open {
    .form-control {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .form-control {
    padding: 0.375rem 0.75rem;
    display: block;
    width: 100%;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .input-group-append {
    display: flex;
    margin-left: -1px;
    svg {
      fill: #495057;
    }
  }

  .input-group-text {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #f4f4f4;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }

  .input-group-append > .input-group-text {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
