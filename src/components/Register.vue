<template>
<v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">
            Play now
        </span>
    </template>
    <v-card>
        <v-card-title>
            <span class="headline">Register</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="username" label="Username" required></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="registerUser">
                Start
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    name: "Register",
    data: () => ({
        dialog: false,
        username: "",
    }),
    methods: {
        ...mapActions(["login"]),
        registerUser() {
            // make sure user entered value
            if (this.username.length) {
                this.login(this.username);

                this.dialog = false;
                this.username = "";
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
