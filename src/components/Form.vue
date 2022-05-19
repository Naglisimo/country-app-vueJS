<template>
    <div class="container">

    <form>

        <div class="flex">
            <input class="border-shadow" type="text" v-model="text">
            <input class="border-shadow" type="date" v-model="date">
        </div>
    </form>

 

    <Display-data v-bind:countries='data' v-bind:atCountries='atCountries' />
    <div class="flex"><button v-for="(page, index) in avaliablePages" v-bind:key="index">{{page}}</button></div>
    
    </div>

</template>

<script>
import DisplayData from "./DisplayData.vue"


export default {

    props: [
        'data', 'atCountries'
            ]
    ,

    components: {
        DisplayData
    },

    data: () => {
        return {
            text: "",
            date: "",
            currentPage: '',
            maxPages: '',
            avaliablePages: [],
            // atCountries: true,
            
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