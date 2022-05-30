import VueRouter from 'vue-router'

import DisplayCountries from '../views/DisplayCountries'
import DisplayCities from '../views/displayCities'

export const router = new VueRouter({
    routes: [
        { path: '/', component: DisplayCountries},
        { path: '/cities/:id', name: 'cities', component: DisplayCities, params: true }
    ]
  })

// export default [
//     { path: '/', component: DisplayCountries},
//     { path: '/cities/:id', name: 'cities', component: DisplayCities, params: true }
// ]