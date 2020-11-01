<template>
<v-container class="h-100" v-if="!isLoggedIn">
    <v-row justify="center" align="center">
        <v-col>
            <v-card class="mx-auto" color="#1976d2" dark max-width="400" elevation="2">
                <v-card-title>
                    <v-icon size="30" left>
                        mdi-close
                    </v-icon>
                    <v-icon size="23" left>
                        mdi-checkbox-blank-circle-outline
                    </v-icon>
                    <span class="title font-weight-light">Tic tac toe</span>
                </v-card-title>

                <v-card-text class="headline font-weight-bold">
                    "Can you really beat me ? i will give you a cookie if you do !"
                    <v-img class="mt-2" max-height="25" max-width="25" src="../assets/cookie.svg"></v-img>
                </v-card-text>

                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-avatar color="grey darken-3">
                            <v-img class="elevation-6" alt="" src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Side&eyebrowType=Default&mouthType=Serious&skinColor=Light"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Khalil</v-list-item-title>
                        </v-list-item-content>

                        <v-row align="center" justify="end" class="pointer">
                            <v-icon class="mr-1">
                                mdi-arrow-right
                            </v-icon>
                            <Register />
                        </v-row>
                    </v-list-item>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import {
    mapGetters
} from "vuex";

import Register from "./Register";
export default {
    name: "Welcome",
    computed: mapGetters(["isLoggedIn"]),
    components: {
        Register,
    },
};
</script>

<style lang="scss" scoped>
.h-100 {
    height: 60vh;
    display: flex;
    align-items: center;
}

.pointer {
    cursor: pointer;
}
</style>
