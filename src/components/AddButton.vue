<template>

        <div v-if="atCountries" class="container flex" >
        <h2>Šalys</h2><button @click="changeState"><img src="../assets/icons/AddButton.svg"></button>
    </div>
        <div v-else class="container flex" >
        <h2>Miestai</h2><button @click="changeState"><img src="../assets/icons/AddButton.svg"></button>
    </div>
</template>

<script>


export default {
    props:['atCountries', 'show'],

    data () {
        return {
            info: "informacija",
            id: this.$route.params.id
    }
    },

    methods: {
        changeState(){
            this.$emit('toggleState')
            this.$emit('isEditing', false)
        },
    }
}

</script>

<style scoped>
div {
 height: 125px;
}

button {
    border: none;
}

h2 {
    font-family: oswald, sans-serif;
    font-size: 64px;
    font-weight: 400;
}

img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    cursor: pointer;
    border-radius: 50%;
}

.flex {
    justify-content: flex-start;
}
</style>