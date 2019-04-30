<template>
  <div
    class="datetimepicker__option"
    :class="selected ? 'is-active' : ''"
    @click="$emit('select', option)"
  >
    <div class="option__inner">
      {{ option | pad }}
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownItem",
  props: {
    option: {
      type: [String, Number],
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.datetimepicker__option {
  cursor: pointer;
  border-radius: 0;
  color: #495057;
  text-align: inherit;
  position: relative;
  display: block;
  padding: 0.5rem 1rem;
  margin-top: -1px;
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.25);

  &:last-child {
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    margin-bottom: -1px;
  }

  &.selected,
  &:hover {
    background-color: #aaa;
  }

  &:hover,
  &:focus {
    color: #495057;
    text-decoration: none;
    background-color: #f8f9fa;
  }

  &:active {
    color: #212529;
    background-color: #e9ecef;
  }

  &.is-active {
    // z-index: 2;
    // color: #fff;
    background-color: #f4f4f4;

    // border-color: #e9ecef;
  }
}
</style>
