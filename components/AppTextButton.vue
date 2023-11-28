<template>
  <button type="button" @click="$emit('btn-clicked')" :style="{color:color}">{{text}}</button>
</template>

<script>
export default {
  props: {
    text: { type: String, default: 'Mon button' },
    color: { type: String, default: '#039be5' }
  }
}
</script>

<style lang="scss" scoped>
  button {
    border: 0;
    background: none;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
