<template>
<v-app>
    <v-main>
        <v-container fluid>
            <v-row>
                <Menu></Menu>
            </v-row>
            <router-view></router-view>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
import Menu from "./components/Menu";
export default {
    name: "App",
    components: {
        Menu,
    },
    data: () => ({
        //
    }),
};
</script>

<style>
.fs-40 {
    font-size: 40px;
}

.fs-18 {
    font-size: 18px;
}
</style>
