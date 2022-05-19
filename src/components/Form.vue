<template>
    <div class="container">

    <form>
        <div class="flex">
            <input class="border-shadow" type="text" v-model="text">
            <input class="border-shadow" type="date" v-model="date">
        </div>
    </form>

 <div class="container table"> 

     <Table-header v-bind:atCountries='atCountries'/>
    <div class="flex"><button v-for="(page, index) in avaliablePages" v-bind:key="index">{{page}}</button></div>
    
    </div>
 </div>

</template>

<script>
// import DisplayData from "./DisplayData.vue"
import TableHeader from './TableHeader.vue'

export default {

    props: ['atCountries' ],

    components: {
        // DisplayData,
        TableHeader
    },

    data: () => {
        return {
            text: "",
            date: "",
            currentPage: '',
            maxPages: '',
            avaliablePages: [],
        }
    },
    

        // computed: {

        //         computedAvaliablePages: () => {return this.avaliablePages.splice(0, 5)}
        // },




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