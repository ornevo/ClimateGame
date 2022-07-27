const INITIAL_EMISSIONS = 50;
const INITIAL_MONEY = 50;
const INITIAL_QUALITY_OF_LIFE = 50;
const INITIAL_YEAR = 2020;
const INITIAL_TICKS = 0;
const DILEMMA_LIFETIME = 10;

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

// TODO play around with it?
const NEW_EVENT_RANDOM_THRESHOLD = 0.8;
// TODO Play around with those?
const GAME_TICK_SECONDS = 0.1;
const MAX_GAME_TIME_IN_SECONDS = 3 * 60; 
const TICKS_PER_YEAR = Math.floor((MAX_GAME_TIME_IN_SECONDS / (MAX_YEAR - MIN_YEAR)) / GAME_TICK_SECONDS);
const DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME = 0.3;

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

const METRIC_TO_IMG = {
    [QOF_METRIC]: "/qof-icon.png",
    [MONEY_METRIC]: "/money-icon.png",
    [EMISSIONS_METRIC]: "/emissions-icon.png",
}

// const EFFECT_ANIMATINO_TIME = 1.5;
const EFFECT_ANIMATINO_TIME = 50;

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

const AREAS = [
    {name: 'galil', x: 50, y: 130, w: 210, h: 190},
    {name: 'ramat-hagolan', x: 290, y: 70, w: 80, h: 200},
    {name: 'haifa-and-carmel', x: -20, y: 260, w: 100, h: 130},
    {name: 'yehuda-veshomron', x: 0, y: 400, w: 200, h: 380},
    {name: 'jerusalem', x: -60, y: 650, w: 120, h: 80},
    {name: 'coastline', x: -70, y: 430, w: 70, h: 200},
    {name: 'north-negev', x: -180, y: 980, w: 320, h: 200},
    {name: 'south-negev', x: -100, y: 1160, w: 140, h: 350},
    {name: 'dead-sea', x: 200, y: 730, w: 80, h: 250},
    {name: 'mediterranean', x: -300, y: 200, w: 220, h: 420},
    {name: 'eilat',  x: -60, y: 1620, w: 70, h: 60},
]
const BASELINE_SIZE = {w:1307.22, h:1708};
const DILEMMA_LOCATION_H = 30;
const DILEMMA_LOCATION_W = 30;

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
        placement: 10,
        category: 4,
        lifetime: 10000, // for now here but maybe constant
        unhandled_money_delta: 10,
        unhandled_emissions_delta: 12,
        unhandled_life_quality_delta: 14,
        options: [DEMO_OPTION, {...DEMO_OPTION, ID: '6'}, {...DEMO_OPTION, ID: '11'}]
    },
    {
        is_good: true,
        ID: '3',
        title: "כותרת האירוע המתפרץ",
        description: "תיאור תיאור תיאור בלה בלה בלה",
        placement: 0,
        category: 2,
        lifetime: 10, // for now here but maybe constant
        unhandled_money_delta: 0,
        unhandled_emissions_delta: 12,
        unhandled_life_quality_delta: 14,
        options: []
    }
]

export default {
    GAME_TICK_SECONDS,
    DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME,
    INITIAL_EMISSIONS,
    INITIAL_MONEY,
    INITIAL_QUALITY_OF_LIFE,
    INITIAL_YEAR,
    INITIAL_TICKS,
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
    DILEMMAS,
    METRIC_TO_IMG,
    BASELINE_SIZE,
    AREAS,
    DILEMMA_LOCATION_H,
    DILEMMA_LOCATION_W,
    NEW_EVENT_RANDOM_THRESHOLD,
    TICKS_PER_YEAR,
    DILEMMA_LIFETIME,
}