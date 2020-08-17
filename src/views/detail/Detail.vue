<template>
  <div>{{iid}}</div>
</template>

<script>
export default {
  data() {
    return {
      iid: null
    }
  },
  created() {
    this.iid = this.$route.params.iid
  },
}
</script>

<style scoped>

</style>