// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './assets/all.scss';
import 'jquery';
import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import { ValidationObserver, ValidationProvider, extend, configure, localize } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import TW from 'vee-validate/dist/locale/zh_TW.json';



Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
localize('zh_TW', TW)
// Add a rule.
// No message specified.
extend('email', email);

// Override the default message.
extend('required', required);
extend('length', {
  validate: value => value.length < 15,
  message: '名字過長'
});

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})


// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const vm = this;
    const api = `${process.env.API_PATH}api/user/check`;
    axios.post(api).then((response) => {
      console.log(response)
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.name === 'CustomInfo') {
    const vm = this;
    const url = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/cart`;
    axios.get(url).then((response) => {
      if(response.data.data.carts.length === 0) {
        alert('您尚未購物！');
      } else {
        next();
      }
    })
  } else {
    next()
  }
})

