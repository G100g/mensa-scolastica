<template>
    <div class="container">
        <WeekCalculator :selected-date="selectedDate" />
        <Meal v-bind:date="selectedDate" :calendar="calendar" />
        <DateSelector
            v-on:select="updateDate"
            v-bind:init-date="selectedDate"
        />
    </div>
</template>

<script>
import { format } from "../helpers/date";

import WeekCalculator from "./WeekCalculator.vue";
import Meal from "./Meal.vue";
import DateSelector from "./DateSelector.vue";

export default {
    name: "DayNavigator",
    props: ["menu"],
    data: () => ({
        selectedDate: new Date(),
        calendar: null,
    }),
    methods: {
        updateDate: function(selectedDate) {
            this.selectedDate = selectedDate;
        },
        getCalendar: async function(menuId) {
            try {
                const result = await fetch(`/data/menus/${menuId}.json`)
                    .then((res) => res.json())
                    .then((data) => data);
                console.log(result);
                this.calendar = result;
            } catch (e) {
                return null;
            }
        },
        getSchool: async function(schoolId) {
            try {
                const result = await fetch(`/data/school/${schoolId}.json`)
                    .then((res) => res.json())
                    .then((data) => data);
                console.log(result);
                return result;
            } catch (e) {
                return null;
            }
        },
    },
    watch: {
        menu: function(newValue) {
            console.log(newValue);
            this.getCalendar(newValue);
        },
    },
    computed: {
        selectedDateHuman: function() {
            return format(this.selectedDate, "EEEE d MMMM");
        },
    },
    components: {
        WeekCalculator,
        Meal,
        DateSelector,
    },
    async mounted() {
        // get shcool data
        const school = await this.getSchool(this.$route.params.school);

        // get menu data
        await this.getCalendar(school.menu);

        // const menuId = this.$route.params.menu

        // this.getCalendar(this.menu);
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
}

.dateNavigator {
    position: fixed;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    bottom: 0;
    left: 0;
    right: 0;

    padding: 2rem;
}

button {
    border: 1px solid #999;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
}
</style>
