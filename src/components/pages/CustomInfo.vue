<template>
  <div>
    <div class="container">
      <!-- 購物車內容 -->
      <section class="row justify-content-center my-4">
        <div class="col-md-8">
          <div class="card border-0">
            <div class="card-header">
              <h6 class="d-flex mb-0 align-items-center">
                <a href="#" data-toggle="collapse" @click.prevent="cartDetails = !cartDetails">
                  <i class="fas fa-chevron-down"></i>顯示購物車細節
                </a>
              </h6>
            </div>
            <div class="card-body" v-if="cartDetails">
              <table class="table">
                <thead>
                  <tr>
                    <th width="30"></th>
                    <th width="100"></th>
                    <th>商品名稱</th>
                    <th width="100">數量</th>
                    <th width="80">小計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in carts" :key="item.id">
                    <td class="align-middle">
                      <button class="btn">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                    <td class="align-middle">
                      <img
                        :src="item.product.imageUrl"
                        style="maxHeight: 60px"
                        alt
                        class="img-fluid img-thumbnail"
                      />
                    </td>
                    <td class="align-middle">{{item.product.title}}</td>
                    <td class="align-middle">{{item.qty}}{{item.product.unit}}</td>
                    <td class="align-middle text-right">{{item.total | currency}}</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-right text-danger">原價</td>
                    <td class="text-right font-weight-bold text-danger">{{total | currency}}</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-right text-success">合計</td>
                    <td class="text-right font-weight-bold text-success">{{finalTotal | currency}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="input-group my-2">
              <input
                type="text"
                aria-label="First name"
                class="form-control"
                placeholder="請輸入優惠券代碼"
                v-model="code"
              />
              <div class="input-group-append">
                <button class="btn btn-secondary border-0" @click="useCoupon">送出</button>
              </div>
            </div>
            <div
              class="text-success"
              v-if="couponMessage"
              :class="{'text-danger': !couponSuccess}"
            >{{couponMessage}}</div>
          </div>
        </div>
      </section>
      <!-- 購物車內容 -->
      <!-- 訂購人資訊 -->
      <section class="row justify-content-center">
        <div class="col-md-8">
          <h5 class="text-center bg-light py-3">訂購人資訊</h5>
          <ValidationObserver v-slot="{ invalid }">
            <form class="form-row" @submit.prevent="createOrder">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="customName">姓名</label>
                  <ValidationProvider rules="required|length" v-slot="{ errors, classes }">
                    <input
                      type="text"
                      class="form-control"
                      id="customName"
                      name="姓名欄位"
                      v-model="form.user.name"
                      :class="classes"
                    />
                    <span class="text-danger">{{errors[0]}}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="customEmail">Email</label>
                  <ValidationProvider rules="email|required" v-slot="{ errors, classes }">
                    <input
                      type="email"
                      class="form-control"
                      id="customEmail"
                      name="email欄位"
                      v-model="form.user.email"
                      :class="classes"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="customTel">電話</label>
                  <ValidationProvider rules="required" v-slot="{ errors, classes}">
                    <input type="tel"
                    class="form-control"
                    id="customTel"
                    name="電話欄位"
                    v-model="form.user.tel"
                    :class="classes">
                  <span class="text-danger">{{ errors[0] }}</span>  
                  </ValidationProvider>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="customCountry">國家</label>
                  <select id="customCountry" class="custom-select">
                    <option value="Taiwan" selected>台灣</option>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="customCounty">縣市</label>
                  <select id="customCounty" class="custom-select">
                    <option value="Taipei">台北市</option>
                    <option value="NewTaipei">新北市</option>
                    <option value="Taichung">台中市</option>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="customZipcode">郵遞區號</label>
                  <input type="number" class="form-control" id="customZipcode" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="customAddress">地址</label>
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <input
                      type="text"
                      id="customAddress"
                      class="form-control"
                      v-model="form.user.address"
                      name="地址欄位"
                      :class="classes"
                    />
                    <span class="text-danger">{{ errors[0]}}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="customMessage">留言</label>
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <textarea
                      id="customMessage"
                      class="form-control"
                      v-model="form.message"
                      name="留言區"
                      :class="classes"
                    ></textarea>
                    <span class="text-danger">{{ errors[0]}}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="col-md-12 text-right my-3">
                <router-link to="/">
                  <button class="btn btn-secondary">繼續選購</button>
                </router-link>
                <button type="submit" class="btn btn-primary" :disabled="invalid">確認付款</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </section>
      <!-- 訂購人資訊 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartDetails: false,
      carts: [],
      total: "",
      finalTotal: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      code: "",
      couponMessage: "",
      couponSuccess: false
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/cart`;
      vm.$http.get(api).then(response => {
        vm.carts = response.data.data.carts;
        vm.total = response.data.data.total;
        vm.finalTotal = response.data.data.final_total;
      });
    },
    useCoupon() {
      const vm = this;
      let couponCode = {
        code: vm.code
      };
      const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/coupon`;
      vm.$http.post(api, { data: couponCode }).then(response => {
        console.log(response.data);
        vm.couponMessage = response.data.message;
        vm.couponSuccess = response.data.success;
        vm.getCart();
      });
      vm.code = "";
      
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/order`;
      const order = vm.form;
      vm.$http.post(api, { data: order }).then(response => {
        console.log("訂單已建立", response);
        if(response.data.success) {
          vm.$router.push(`/pay/${response.data.orderId}`)
        } else {
          console.log('訂單建立失敗')
        }
      });
      
    }
  },
  created() {
    this.getCart();
  }
};
</script>