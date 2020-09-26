<template>
    <div>
        <h1>Scegli la scuola</h1>
        <div v-for="(school, index) in schools" :key="index">
            <div>
                <router-link :to="getSchoolLink(school._id)">
                    {{ school.name }}
                </router-link>
            </div>
        </div>
    </div>
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
