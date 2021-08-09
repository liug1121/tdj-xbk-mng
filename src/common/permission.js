import Vue from 'vue'
Vue.directive('permission', {
    inserted: function(el, binding){ 
        let indentity = binding.value.indentity
        let authOpts = JSON.parse(window.sessionStorage.getItem('AuthOpts'))
        let filteredAuthOpts = authOpts.filter(opt=>{
            if(opt.indentity === indentity)
                return true
            return false
        })
        if(filteredAuthOpts.length < 1){
            el.parentNode.removeChild(el)
        }
        // if(currentRight) {
        //     if(currentRight.indexOf(action) == -1) {
        //         const type = binding.value.effect 
        //         if(type === 'disabled') {
        //             el.disabled = true 
        //             el.classList.add('is-disabled')         
        //         } else { 
        //             el.parentNode.removeChild(el)
        //         }
        //     }
        // }
    }
})