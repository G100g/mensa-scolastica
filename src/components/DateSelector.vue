<template>
    <div
        class="dateNavigator columns is-mobile is-vcentered is-centered has-text-centered has-background-warning"
    >
        <div class="column">
            <button class="button" @click="yesterday()">
                <font-awesome-icon icon="angle-left" />
            </button>
        </div>
        <div class="column is-half ">
            <div class="is-size-6 is-capitalized">
                <h3 class="has-text-weight-bold is-size-5 ">
                    {{ selectedWeekdayHuman }}
                </h3>
                {{ selectedDateHuman }}
            </div>
        </div>
        <div class="column">
            <button class="button" @click="tomorrow()">
                <font-awesome-icon icon="angle-right" />
            </button>
        </div>
    </div>
</template>

<script>
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import { format } from "../helpers/date";

export default {
    name: "DateSelector",
    data: function() {
        console.log(this.initDate);
        return { selectedDate: this.initDate };
    },

    props: ["init-date"],
    methods: {
        yesterday: function() {
            this.selectedDate = subDays(this.selectedDate, 1);
        },
        tomorrow: function() {
            this.selectedDate = addDays(this.selectedDate, 1);
        },
    },
    watch: {
        selectedDate: function() {
            this.$emit("select", this.selectedDate);
        },
    },
    computed: {
        selectedDateHuman: function() {
            return format(this.selectedDate, "d MMMM yyyy");
        },
        selectedWeekdayHuman: function() {
            return format(this.selectedDate, "EEEE");
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dateNavigator {
    position: fixed;
    bottom: 0.75em;
    left: 0;
    right: 0;

    /* display: flex;
    justify-content: space-evenly;
    align-items: center;
    

    color: #472d30;
    background-color: #ffe1a8;

    padding: 1rem 0.1rem; */
}

/* button {
    border: none;
    background-color: white;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    border-radius: 4px;
} */
</style>
