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

const destFolder = path.join(__dirname, "public", "data");

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

  return menus;
}

async function getCities() {
  const query = /* groq */ `
        *[_type == "city"] 
    `;

  return await client.fetch(query);
}

async function createMenus() {
  await fs.emptyDir(destFolder);

  const cities = await getCities();
  const meals = await getMeals();

  const citiesWithMenus = await Promise.all(
    cities.map(async city => {
      const menus = await getMenuByCity(city._id);

      await Promise.all(
        menus.map(async menu => {
          return await createMenu(city._id, city.name, menu, meals);
        })
      );

      return {
        _id: city._id,
        name: city.name,
        menus: menus.map(({ _id, title }) => ({
          _id,
          title
        }))
      };
    })
  );

  await fs.outputJSON(
    path.join(destFolder, `index.json`),
    {
      cities: citiesWithMenus
    },
    {
      spaces: 2
    }
  );
}

async function createMenu(_ref, name, menu, meals) {
  await fs.outputJSON(
    path.join(destFolder, `${menu._id}.json`),
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
