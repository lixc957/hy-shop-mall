<template>
  <div
    class="check-button"
    :class="{ 'checked': isChecked }"
  >
    <img src="~/assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      
    }
  },
}
</script>

<style scoped>
.check-button {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check-button img {
  width: 100%;
}

.checked {
  background-color: #ff0000;
  border-color: #ff0000;
}
</style>
