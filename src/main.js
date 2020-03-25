// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
//http://mint-ui.github.io/docs/#/zh-cn2/header
import 'mint-ui/lib/style.css'
import './assets/style/reset.css'
import './assets/style/border.css'
import './assets/style/components.css'
import './assets/icon/iconfont.css'
Vue.config.productionTip = false

Vue.use(MintUI)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})