<template>
    <section class="section">
        <h2 class="title">Scegli la città</h2>
        <div v-for="(city, index) in cities" :key="index">
            <div>
                <router-link :to="`/city/${city._id}`" class="is-size-4">
                    {{ city.name }}
                </router-link>
                <!-- <div
                        v-for="(menu, indexMenu) in city.menus"
                        :key="indexMenu"
                    >
                        <button type="button" @click="selectMenu(menu)">
                            {{ menu.title }}
                        </button>
                    </div> -->
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            cities: [],
        };
    },
    mounted: async function() {
        const result = await fetch("/data/cities.json")
            .then((res) => res.json())
            .then((data) => data);

        this.cities = result;
    },
};
</script>

<style></style>
