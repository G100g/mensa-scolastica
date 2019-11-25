require("dotenv").config();
const path = require("path");
const fs = require("fs-extra");
const sanityClient = require("@sanity/client");

const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN, // or leave blank to be anonymous user
    useCdn: false // `false` if you want to ensure fresh data
});

async function getMeals() {
    const query = /* groq */ `
        *[_type == "meal"] {
            _id,
            name
        }
    `;

    const meals = await client.fetch(query);

    const parsed = meals
        .map(({ _id, name }) => {
            return {
                [_id]: name
            };
        })
        .reduce((meal, meals) => {
            return { ...meal, ...meals };
        }, {});

    return parsed;
}

async function getMenuByCity(_ref) {
    const query = /* groq */ `
        *[_type == "menu" && city._ref == "${_ref}"] {
            _id,
            ...
        }
    `;

    const menus = await client.fetch(query);
    // console.log(menus);

    // const parsedMenu = menus.map(menu => {

    //     return {
    //         menu
    //     }
    // });

    return menus[0];
}

async function getCities() {
    const query = /* groq */ `
        *[_type == "city"] 
    `;

    return await client.fetch(query);
}

async function createMenus() {
    const cities = await getCities();

    cities.map(city => {
        createMenu(city._id, city.name);
    });
}

async function createMenu(_ref, name) {
    const meals = await getMeals();
    const menu = await getMenuByCity(_ref);
    console.log(menu);

    await fs.outputJSON(
        path.join(__dirname, "src", "_data", `${_ref}.json`),
        {
            name,
            meals,
            weeksmeal: menu
        },
        {
            spaces: 2
        }
    );
}

createMenus();
