<template>


        <tr class="grid">
            <th class="flex">
                <h2>PAVADINIMAS</h2>
                <div class="flex-column">
                    <button @click="ascending"><img src='../assets/icons/vectorUp.svg'></button>
                    <button @click="descending"><img src="../assets/icons/vectorDown.svg"></button>
                </div></th>
            <th><h2>UZIMAMAS PLOTAS</h2></th>
            <th><h2>GYVENTOJU SKAICIUS</h2></th>
            <th v-if="atCountries"><h2>SALIES TEL. KODAS</h2></th>
            <th v-else><h2>SALIES PASTO KODAS</h2></th>
            <th><h2>VEIKSMAI</h2></th>
        </tr>
    
</template>   

<script>
    export default {
        props: ['atCountries', 'url'],
        data(){
            return {
            }
        },
        methods: {
            ascending() {
                console.log(`${this.url}?order=asc`)
                this.$emit("sortAsc", `${this.url}?order=asc`)
            },
            descending() {
                console.log(`${this.url}?order=desc`)
                this.$emit("sortDesc", `${this.url}?order=desc`)
            }
        }
    }
</script>

<style scoped>

.flex-column {
    margin-left: 8px;
}


</style>        