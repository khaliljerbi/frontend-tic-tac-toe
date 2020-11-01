<template>
<v-app-bar color="blue accent-4" dense dark>
    <v-btn icon>
        <v-icon size="30">mdi-close</v-icon>
        <v-icon size="23">mdi-checkbox-blank-circle-outline</v-icon>
    </v-btn>
    <v-toolbar-title>Tic tac toe</v-toolbar-title>
    <v-spacer></v-spacer>

    <div v-if="isLoggedIn">
        <div v-if="isMobile">
            <v-menu left bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-title>Create room</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <v-row v-else align="center" justify="end">
            <v-btn text>
                Create room
            </v-btn>
            <v-btn class="ma-2" color="info" @click="logout">
                Logout
            </v-btn>
        </v-row>
    </div>
</v-app-bar>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";

export default {
    name: "Menu",
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.xs;
        },
        ...mapGetters(["isLoggedIn"]),
    },
    methods: mapActions(["logout"]),
};
</script>

<style lang="scss" scoped></style>
