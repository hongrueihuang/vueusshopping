<template>
    <div>
        <div class="container">
            <h4 class="text-center py-3">購買資訊</h4>
            <div class="row justify-content-center">
                <div class="col-md-8 d-flex justify-content-center">
                    <table class="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>商品名稱</th>
                                <th>數量</th>
                                <th>小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in products" :key="item.id">
                                <td class="align-middle">
                                    <img :src="item.product.imageUrl" class="img-thumbnail" style="width: 100px; height:75px" alt="">
                                </td>
                                <td class="align-middle">{{ item.product.title }}</td>
                                <td class="align-middle">{{ item.qty + item.product.unit }}</td>
                                <td class="align-middle text-right">{{ item.final_total | currency}}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right">合計</td>
                                <td class="text-right font-weight-bold">{{ order.total |currency}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <h4 class="text-center py-3">個人資料</h4>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <table class="table">
                        <tbody>
                            <tr v-if="order.user">
                                <td class="font-weight-bold">Email</td>
                                <td>{{ order.user.email }}</td>
                            </tr>
                            <tr v-if="order.user">
                                <td class="font-weight-bold">姓名</td>
                                <td>{{ order.user.name }}</td>
                            </tr>
                            <tr v-if="order.user">
                                <td class="font-weight-bold">電話</td>
                                <td>{{ order.user.tel }}</td>
                            </tr>
                            <tr v-if="order.user">
                                <td class="font-weight-bold">地址</td>
                                <td>{{ order.user.address }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderId: '',
            order: {},
            products:{

            }
        }
    },
    methods: {
        getOrder() {
            const vm = this;
            const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/order/${vm.orderId}`;
            vm.$http.get(api).then((response) => {
                // console.log(response)
                if(response.data.success) {
                    vm.order = response.data.order;
                    vm.products = response.data.order.products;
                } else {
                    console.log('取得訂單失敗');
                }
            })
        }
    },
    created() {
        this.orderId = this.$route.params.id;
        this.getOrder();
    }
}
</script>