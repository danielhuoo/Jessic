export default {
    install(Vue) {
        console.log(Vue)
        Vue.prototype.log4Test = function (method) {
            console.log(method)
        }
    }
}