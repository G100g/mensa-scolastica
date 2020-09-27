<template>
    <section class="section">
        <h2 class="title">Scegli la scuola</h2>
        <div v-for="(school, index) in schools" :key="index">
            <div>
                <router-link :to="getSchoolLink(school._id)" class="is-size-4">
                    {{ school.name }}
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Schools",
    data() {
        return {
            schools: [],
        };
    },
    methods: {
        getSchoolLink(_id) {
            return `/city/${this.$route.params.city}/school/${_id}`;
        },
    },
    mounted: async function() {
        const result = await fetch(
            `/data/cities/${this.$route.params.city}.json`
        )
            .then((res) => res.json())
            .then((data) => data);
        console.log(result);
        this.schools = result.schools;
    },
};
</script>

<style></style>
