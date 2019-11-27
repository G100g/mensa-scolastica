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

function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return [d.getUTCFullYear(), weekNo];
}

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

function parseWeekRange(weekNumberKey, weekrange) {
  if (!weekrange) return {};
  const weeks = weekrange.reduce((weeks, range) => {
    const [weekYear, weekNumber] = getWeekNumber(new Date(range.from));

    weeks[weekYear] = {
      ...weeks[weekYear],
      ...{ [weekNumber]: weekNumberKey }
    };

    return weeks;
  }, {});

  return weeks;
}

function createWeeksNumberByMenu(menu) {
  return ["week1", "week2", "week3", "week4", "week5"]
    .map(weekNumberKey => {
      return parseWeekRange(
        weekNumberKey,
        menu[weekNumberKey] && menu[weekNumberKey].weeksrange
      );
    })
    .reduce((weeks, week) => {
      Object.keys(week).forEach(year => {
        weeks[year] = {
          ...weeks[year],
          ...week[year]
        };
      });

      return weeks;
    }, {});

  // return {
  //   ...parseWeekRange("week1", menu.week1 && menu.week1.weeksrange),
  //   ...parseWeekRange("week2", menu.week2 && menu.week2.weeksrange),
  //   ...parseWeekRange("week3", menu.week3 && menu.week3.weeksrange),
  //   ...parseWeekRange("week4", menu.week4 && menu.week4.weeksrange),
  //   ...parseWeekRange("week5", menu.week5 && menu.week5.weeksrange)
  // };
}

async function createMenu(_ref, name, menu, meals) {
  const weeks = createWeeksNumberByMenu(menu);

  await fs.outputJSON(
    path.join(destFolder, `${menu._id}.json`),
    {
      weeks,
      meals,
      weeksmeal: menu
    },
    {
      spaces: 2
    }
  );
}

createMenus();
