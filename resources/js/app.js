import './bootstrap'

import Vue from 'vue'

Vue.component('hello', require('./components/Hello'))

new Vue({
    el: '#app'
})
