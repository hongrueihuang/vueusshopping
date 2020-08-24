<template>
  <div>
    <div class="container">
      <section class="row">
        <div class="col-md-4">
          <div
            class="alert alert-secondary text-center"
            role="alert"
            :class="{'alert-success' : nowProcess === 'CustomInfo'}"
          >1. 輸入訂單資料</div>
        </div>
        <div class="col-md-4">
          <div class="alert alert-secondary text-center" role="alert":class="{'alert-success' : nowProcess === 'Pay'}">2. 金流付款</div>
        </div>
        <div class="col-md-4">
          <div
            class="alert alert-secondary text-center"
            role="alert"
            :class="{'alert-success' : nowProcess === 'ShoppingDetail'}"
          >3. 完成</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    nowProcess() {
      const vm = this;
      let page = vm.$route.name;
      return page
    }
  },
  created() {}
};
</script>