<template>
  <div>
    <div class="container mt-2">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent">
          <li class="breadcrumb-item">
            <router-link to="/">首頁</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{single.title}}</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-4">
          <div class="card border-0">
            <div class="card-body">
              <div class="card-title h3">{{single.title}}</div>
              <p class="card-text d-flex justify-content-between align-items-center">
                <del class="text-secondary text-through">原價{{single.origin_price|currency}}</del>
                <span class="text-danger h5">售價{{single.price|currency}}</span>
              </p>
              <hr />
              <div class="input-group">
                <select class="custom-select" v-model="productNum">
                  <option value default disabled>請選擇數量</option>
                  <option :value="num" v-for="num in 99" :key="num">{{num + single.unit}}</option>
                </select>
                <div class="input-group-append">
                  <button class="btn btn-primary ml-2 btn-sm" @click="addCart(single.id)">
                    <i class="fas fa-cart-plus mr-2"></i>加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <h3>{{single.description}}</h3>
          <sub>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam quae officia porro vero, repellendus fugit, accusantium necessitatibus est beatae autem quibusdam nulla excepturi libero harum eligendi, quia voluptas. Et, illo.</sub>
          <div class="text-center my-3 h4">{{single.content}}</div>
          <div class="bg-cover" :style="`background-image: url(${single.imageUrl})`"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singleId: "",
      single: {},
      productNum: ""
    };
  },
  methods: {
    getSingle() {
      const vm = this;
      const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/product/${vm.singleId}`;
      vm.$http.get(api).then(response => {
        console.log(response.data);
        vm.single = response.data.product;
      });
    },
    
    addCart (id) {
        const vm = this;
        const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/cart`;
        const cart = {
            product_id: id,
            qty: vm.productNum
        };
        if(!vm.productNum){
            alert('請選擇數量')
            return
        }
        vm.$http.post(api, {data: cart}).then((response) => {
            console.log(response);
            vm.$bus.$emit('updateCart')
        })
        vm.productNum =""
    },
  },
  created() {
    this.singleId = this.$route.params.id;
    this.getSingle();
  }
};
</script>