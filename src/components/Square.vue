<template>
<v-col cols="4" @click="handleClick(index)">
    <v-card outlined class="square">
        {{ square ? square : "" }}
    </v-card>
</v-col>
</template>

<script>
export default {
    name: "Square",
    props: {
        square: String,
        index: Number,
    },
    methods: {
        handleClick(index) {
            this.$emit("clickSquare", index);
        },
    },
};
</script>

<style scoped>
.square {
    display: flex;
    font-size: 40px;
    align-items: center;
    justify-content: center;
    height: 150px;
}
</style>
