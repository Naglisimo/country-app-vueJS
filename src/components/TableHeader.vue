<template>
        <div class="grid">
            <div class="flex">
                <p>PAVADINIMAS</p>
                <div>
                    <button @click="ascending">up</button>
                    <button @click="descending">down</button>
                    </div></div>
            <div><p>UZIMAMAS PLOTAS</p></div>
            <div><p>GYVENTOJU SKAICIUS</p></div>
            <div v-if="atCountries"><p>SALIES TEL. KODAS</p></div>
            <div v-else><p>SALIES PASTO KODAS</p></div>
            <div><p>VEIKSMAI</p></div>
        </div>
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

<style>

</style>        