import frame from './frame.vue'

// var vm = new Vue({
//     el: '#app',
//     data(){
//         return{
//             test:"app"
//         }
//     }
// })

new Vue({
    render: h => h(frame),
  }).$mount('#app')
    