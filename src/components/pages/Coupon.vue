<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-2">
      <button class="btn btn-primary" @click="openCouponModal(true)">新增優惠券</button>
    </div>

    <table class="table mt-2">
      <thead>
        <th>名稱</th>
        <th>優惠碼</th>
        <th>折扣</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯與刪除</th>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.code}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.date +' '+ item.time}}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary" @click="openCouponModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger" @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Pagination -->
    <Pagination :page="pagination" @changePageNum="getCoupon" />
    <!-- couponModal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-dark text-light">
            <h5 class="modal-title" id="couponModalLabel">
                <span v-if="isNew">新增</span>
                <span v-else>修改</span>
                優惠券
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="title">名稱</label>
                  <input type="text" id="title" class="form-control" v-model="tempCoupon.title" />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="code">優惠碼</label>
                  <input type="text" id="code" class="form-control" v-model="tempCoupon.code" />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="date">到期日</label>
                  <input type="date" id="date" class="form-control" v-model="tempCoupon.date" />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="time">時間</label>
                  <input type="time" id="time" class="form-control" v-model="tempCoupon.time" />
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      id="is_enabled"
                      class="form-check-input"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="percent">折扣</label>
                  <input type="number" class="form-control" v-model="tempCoupon.percent" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delModal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delCouponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="delCouponModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="removeCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../Pagination";
export default {
  data() {
    return {
      isLoading: false,
      coupons: [],
      tempCoupon: {},
      isNew: false,
      pagination: {}
    };
  },
  components: {
    Pagination
  },
  methods: {
    openCouponModal(isNew, item) {
        if(isNew) {
            this.tempCoupon = {};
            this.isNew = true;
        } else {
            this.tempCoupon = item;
            this.isNew = false;
        }
      $("#couponModal").modal("show");
    },
    openDelModal(item){
        $('#delCouponModal').modal('show');
        this.tempCoupon = Object.assign({},item);
    },
    removeCoupon() {
        const vm = this;
        const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`;
        vm.$http.delete(api).then((response) => {
            if(response.data.success){
                $('#delCouponModal').modal('hide');
                vm.getCoupon();
            } else {
                $('#delCouponModal').modal('hide');
                vm.getCoupon();
                console.log('刪除失敗')
            }
            
        })
    },
    getDeadline() {
      const vm = this;
      let date = vm.tempCoupon.date;
      let formatDate = new Date(date);
      let y = formatDate.getFullYear();
      let m = formatDate.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = formatDate.getDate();
      d = d < 10 ? "0" + d : d;
      let formatTime = `${y}/${m}/${d} ${vm.tempCoupon.time}:00`;
      let timeStamp = new Date(formatTime).getTime() / 1000;
      vm.tempCoupon.due_date = timeStamp;
    },
    updateCoupon() {
      const vm = this;
      let api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/admin/coupon`;
      let httpMethod = 'post';
      if(!vm.isNew){
          api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`;
          httpMethod = 'put';
      }
      vm.getDeadline();
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        if (response.data.success) {
          $("#couponModal").modal("hide");
          vm.getCoupon();
        } else {
          $("#couponModal").modal("hide");
          vm.getCoupon();
          console.log("新增失敗");
        }
      });
    },
    getCoupon(page = 1) {
      const vm = this;
      const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/admin/coupons?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        console.log(response);
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.getCoupon();
  }
};
</script>