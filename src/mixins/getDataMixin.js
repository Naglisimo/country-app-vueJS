import axios from "axios"

export const getDataMixin = {
    methods: {
        getData(url){
            this.avaliablePages = []
            if (url) {
            axios
            .get(url)
            .then( ({data}) => {
                this.fetchedData = data.data
                this.maxPages = data.meta.last_page
                this.currentPage = data.meta.current_page
                this.prevPage = data.links.prev
                this.nextPage = data.links.next
                this.paginationLoop(this.maxPages)
                })
            }
        },
        paginationLoop(maxPages){
            if (maxPages > 0) {
                for( let i = 1; this.avaliablePages.length +1 <= maxPages; i++) {
                        this.avaliablePages.push(i)
                }
            }
        },
    }
}