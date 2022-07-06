import VueRouter from 'vue-router'
import DisplayCountries from '../views/DisplayCountries'
import DisplayCities from '../views/displayCities'

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'countries',
      component: DisplayCountries
    },
    {
      path: '/cities/:id',
      name: 'cities',
      component: DisplayCities,
      params: true
    }
  ]
})