<template>
<div>
    <slot></slot>
    <v-dialog v-model="rematch" persistent max-width="600px">
        <v-card class="mx-auto" elevation="2">
            <v-card-title>
                <span class="headline">Rematch ?</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
                <v-avatar>
                    <v-img class="elevation-6" alt="" src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Side&eyebrowType=Default&mouthType=Serious&skinColor=Light"></v-img>
                </v-avatar>
                "As you can see you don't have a choice !"
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" @click="acceptRematch">Yes :D</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    name: "Rematch",
    props: {
        rematch: Boolean,
    },
    methods: {
        acceptRematch() {
            this.$socket.emit("rematchOn");
        },
    },
};
</script>

<style lang="scss" scoped></style>
