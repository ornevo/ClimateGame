const GAME_TICK_SECONDS = 0.5;
const DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME = 0.3;

const INITIAL_EMISSIONS = 50;
const INITIAL_MONEY = 50;
const INITIAL_QUALITY_OF_LIFE = 50;
const INITIAL_YEAR = 2042;

const MAX_EMISSIONS = 100;
const MAX_MONEY = 100;
const MAX_QOF = 100;
const MAX_YEAR = 2050;

const MIN_YEAR = 2022;
const MIN_QOF = 0;
const MIN_MONEY = 0;
const MIN_EMISSIONS = 0;

const YEAR_HEB_NAME = "שנה";
const QOF_HEB_NAME = "איכות חיים";
const MONEY_HEB_NAME = "כסף";
const EMISSIONS_HEB_NAME = "גזי חממה";

// To represent for effects which category
const YEAR_METRIC = 1;
const QOF_METRIC = 2;
const MONEY_METRIC = 3;
const EMISSIONS_METRIC = 4;

const METRIC_TO_COLOR = {
    [YEAR_METRIC]: "red",
    [QOF_METRIC]: "blue",
    [MONEY_METRIC]: "green",
    [EMISSIONS_METRIC]: "black",
}
const EFFECT_ANIMATINO_TIME = 1.5;

const NO_OPTIONS_CATEGORY = 0;
const TRANSPORT_CATEGORY = 1;
const AGRICULTURE_CATEGORY = 2;
const ENERGY_CATEGORY = 3;
const INDUSTRY_CATEGORY = 4;
const HOME_CATEGORY = 5;

const CATEGORY_TO_IMG = {
    [NO_OPTIONS_CATEGORY]: "/qmark-icon.png",
    [TRANSPORT_CATEGORY]: "/trans-icon.svg",
    [AGRICULTURE_CATEGORY]: "/agri-icon.svg",
    [ENERGY_CATEGORY]: "/elec-icon.svg",
    [INDUSTRY_CATEGORY]: "/manu-icon.svg",
    [HOME_CATEGORY]: "/home-icon.svg",
}

const DEMO_OPTION = {
    ID: '4',
    content: "תוכן האפשרות",
    effect: {
        money_delta: 100,
        emissions_delta: 10,
        life_quality_delta: 11,
        money_delta_per_tick: 2,
        emissions_delta_per_tick: 2,
        life_quality_delta_per_tick: 2,
        ticks_amount: 5
    }
};

const DILEMMAS = [
    {
        is_good: false,
        ID: '2',
        title: "כותרת השאלה",
        description: "תיאור תיאור תיאור",
        placement: 4,
        category: 4,
        lifetime: 5, // for now here but maybe constant
        unhandled_money_delta: 10,
        unhandled_emissions_delta: 12,
        unhandled_life_quality_delta: 14,
        options: [DEMO_OPTION, {...DEMO_OPTION, ID: '6'}, {...DEMO_OPTION, ID: '11'}]
    }
]

export default {
    GAME_TICK_SECONDS,
    DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME,
    INITIAL_EMISSIONS,
    INITIAL_MONEY,
    INITIAL_QUALITY_OF_LIFE,
    INITIAL_YEAR,
    MAX_EMISSIONS,
    MAX_MONEY,
    MAX_QOF,
    MAX_YEAR,
    MIN_YEAR,
    MIN_EMISSIONS,
    MIN_MONEY,
    MIN_QOF,
    YEAR_HEB_NAME,
    QOF_HEB_NAME,
    MONEY_HEB_NAME,
    EMISSIONS_HEB_NAME,
    YEAR_METRIC,
    QOF_METRIC,
    MONEY_METRIC,
    EMISSIONS_METRIC,
    METRIC_TO_COLOR,
    EFFECT_ANIMATINO_TIME,
    CATEGORY_TO_IMG,
    DILEMMAS
}