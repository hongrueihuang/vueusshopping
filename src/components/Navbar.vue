<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <router-link class="navbar-brand" to="/">
        <div class="bg-cover" style="backgroundImage: url('https://i.imgur.com/jN5frCW.png');
        width: 120px;
        height: 80px;"></div>
      </router-link>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <router-link class="btn btn-user ml-auto btn-lg btn-circle" :to="{'name': 'Login'}">
          <i class="fas fa-user"></i>
        </router-link>
        <div class="dropdown ml-4">
          <button
            class="btn btn-cart btn-lg"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-shopping-cart"></i>
            <span class="badge badge-danger badge-rounded">{{cartNum}}</span>
          </button>
          <div
            class="dropdown-menu dropdown-menu-right py-0"
            style="min-width: 350px"
            aria-labelledby="dropdownMenuButton"
          >
            <!-- <pre>{{sth}}</pre> -->
            <h4 class="p-2 mb-0">已選擇商品</h4>
            <table class="table table-sm p-3">
              <tbody>
                <tr v-for="item in carts" :key="item.id">
                  <td>
                    <button class="btn btn-sm" @click="openDelModal(item)">
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="text-center align-middle">{{item.product.title}}</td>
                  <td class="text-center align-middle">{{item.qty + item.product.unit}}</td>
                  <td class="text-right align-middle">{{item.final_total | currency}}</td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn-block btn-primary" @click="goCheckout">結帳去</button>
          </div>
        </div>
      </div>
    </nav>
    <!-- delCartModal -->
    <div
      class="modal fade"
      id="delCartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delCartModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5
              class="modal-title"
              id="delCartModalLabel"
              v-if="tempCart.product"
            >{{tempCart.product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-if="tempCart.product">
              確定要刪除
              <span
                class="text-danger text-bold"
              >{{tempCart.product.title + tempCart.qty + tempCart.product.unit}}</span>？
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" @click="removeCart(tempCart)">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: [],
      tempCart: {}
    };
  },
  methods: {
    getCarts() {
        const vm = this;
        const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/cart`;
        vm.$http.get(api).then(response => {
          console.log(response);
          vm.carts = response.data.data.carts;
        });
    },
    openDelModal(item) {
      $("#delCartModal").modal("show");
      this.tempCart = item;
    },
    removeCart(item) {
      const vm = this;
      const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/cart/${item.id}`;
      vm.$http.delete(api).then(response => {
        console.log(response.data);
        vm.getCarts();
        $("#delCartModal").modal("hide");
        vm.$bus.$emit('updateCart')
      });
    },
    goCheckout() {
      const vm = this;
      
      vm.$router.push('checkout')
      
    }
  },
  computed: {
    cartNum() {
      return this.carts.length;
    }
  },
  created() {
    const vm = this;
    const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/cart`;
    vm.$http.get(api).then(response => {
      console.log(response);
      vm.carts = response.data.data.carts;
    });
    this.$bus.$on('updateCart',() => {
      this.getCarts();
    })
  }
};
</script>

<style lang="scss">
.btn-cart {
  position: relative;
  background-color: transparent;
  color: #fff;
  .badge-rounded {
    position: absolute;
    right: 3px;
    top: 3px;
  }
}

.btn-circle {
  border-radius: 50%;
}
</style>