<template>
    <div class="container ">

    <form >
        <div class="flex">
            <input @keyup="filterData" class="border-shadow" type="text" v-model="text">
            <input @change="filterData" class="border-shadow" type="date" v-model="date">
        </div>
    </form>
 </div>

</template>

<script>
import { urlAPI } from "../../vue.config"


export default {

    props: ['atCountries', 'url', 'id'],


    data: () => {
        return {
            text: "",
            date: "",
            currentPage: '',
            maxPages: '',
            avaliablePages: [],
        }
    },
    methods: {
        sortAsc(e) {
            this.$emit('sortAsc', e)
        },
        sortDesc(e) {
            this.$emit('sortDesc', e)
        },
        filterData() {
            this.$emit('filterData', `${this.requestURL}?search=${this.text}&start_date=${this.date}`)
        }
    },
    

    computed: {
        requestURL() {
            if(this.atCountries){
                return  urlAPI
            } else {
                return  `${urlAPI}/${this.id}/cities`
            }
        },
    },




}



</script>




<style scoped>

input {
    height: 49px;
    width: 100%;
    border: none;
}


.flex input:last-child {
    width: 161px;
    margin-left: 16px;
}

</style>