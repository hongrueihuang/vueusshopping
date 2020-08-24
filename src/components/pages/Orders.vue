<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-2">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ formatTime(item.create_at)}}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul>
              <li v-for="product in item.products" :key="product.id">{{product.product.title}}</li>
            </ul>
          </td>
          <td>{{ formatTotal(item.total) | currency }}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">是</span>
            <span v-else class="text-danger">否</span>
          </td>
          <td>
            <button class="btn btn-primary" @click="openEditModal(item)">修改</button>
          </td>
        </tr>
      </tbody>
    </table>
  <!-- Pagination -->
  <Pagination :page="pagination" @changePageNum="getOrders" />
    <!-- Modal -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="editModalLabel">修改訂單</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>訂購人資訊</h5>
            <div class="form-row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="name">姓名</label>
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    v-if="tempOrder.user"
                    v-model="tempOrder.user.name"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="tel">電話</label>
                  <input
                    type="tel"
                    id="tel"
                    class="form-control"
                    v-if="tempOrder.user"
                    v-model="tempOrder.user.tel"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    class="form-control"
                    v-if="tempOrder.user"
                    v-model="tempOrder.user.email"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="address">地址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    v-if="tempOrder.user"
                    v-model="tempOrder.user.address"
                  />
                </div>
              </div>
              <div class="col-md-6 d-flex align-items-center justify-content-center">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="tempOrder.is_paid" id="is_paid" />
                  <label class="form-check-label" for="is_paid">是否付款？</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="editOrder">確認修改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../Pagination';
export default {
  data() {
    return {
      isLoading: false,
      orders: [],
      tempOrder: {},
      pagination: {}
    };
  },
  components: {
    Pagination
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/admin/orders?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        console.log(response);
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    formatTime(time) {
      const orderTime = new Date(time * 1000);
      let yyyy = orderTime.getFullYear();
      let mm = orderTime.getMonth() + 1;
      if (mm < 10) {
        mm = `0${mm}`;
      }
      let dd = orderTime.getDate();
      if (dd < 10) {
        dd = `0${dd}`;
      }
      let hh = orderTime.getHours();
      if (hh < 10) {
        hh = `0${hh}`;
      }
      let min = orderTime.getMinutes();
      if (min < 10) {
        min = `0${min}`;
      }
      let ss = orderTime.getSeconds();
      if (ss < 10) {
        ss = `0${ss}`;
      }

      return `${yyyy}/${mm}/${dd} ${hh}:${min}:${ss}`;
    },
    formatTotal(money) {
      const finalMoney = Math.round(money);
      return finalMoney;
    },
    openEditModal(item) {
      const vm = this;
      vm.tempOrder = item;
      $("#editModal").modal("show");
    },
    editOrder() {
        const vm = this;
        const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/admin/order/${vm.tempOrder.id}`;
        const newOrder = vm.tempOrder;
        vm.isLoading = true;
        vm.$http.put(api,{data:newOrder}).then((response) => {
            if(response.data.success) {
                $('#editModal').modal('hide');
                vm.isLoading = false;
            } else {
                console.log(response.data.message);
                $('#editModal').modal('hide');
                vm.isLoading = false;
            }
        })
    }
  },
  created() {
    this.getOrders();
  }
};
</script>