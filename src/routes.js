import Home from './views/Home'
import displayCities from './views/displayCities'

export default [
    { path: '/', component: Home},
    { path: '/cities/:id', name: 'cities', component: displayCities, params: true }
]