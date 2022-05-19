import axios from 'axios'

export default {
    computed: {
        getData(url){
            axios
            .get(url)
            .then( ({data}) => {
                this.countries = data.data
                this.maxPages = data.meta.last_page
                this.currentPage = data.meta.current_page
                this.paginationLoop(this.maxPages)
                console.log(this.currentPage)
                                })

        }
    }
}