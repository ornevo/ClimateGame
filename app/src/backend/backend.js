import db from "../components/db.json";
import Constants from "../constants";


var state = {
    active_events: [],
    deleted_events: [],
    options: [],
    effects: [],
    emmisions: Constants.INITIAL_EMISSIONS,
    money: Constants.INITIAL_MONEY,
    quality_of_life: Constants.INIITIAL_QUALITY_OF_LIFE,
    year: Constants.INITIAL_YEAR,
    tick: Constants.INITIAL_TICK
}

function getOption(optionId)
{
    for (let i = 0; i < db.options.length; i++) {
        if (db.options[i].ID === optionId)
        {
            return db.options[i] 
        }
    }
    return NaN;
}

function getEvent(eventId)
{
    for (let i = 0; i < db.events.length; i++) {
        if (db.events[i].ID === eventId)
        {
            return db.events[i] 
        }
    }
    return NaN;
}

function effectMeasuresByOption()
{

}

function updateStateByOption(chosenOptionId)
{
    var option = getOption(chosenOptionId)
    state.options.push(chosenOptionId)
}

function getUpdatedState()
{

}

function deleteEvent(eventId){
    this.state.active_events.filter(function(e) {return e!=eventId});
    this.state.deleted_events.push(eventId);


}

export default {
    state,
    updateStateByOption,
    getUpdatedState,
    deleteEvent,
    getOption,
    getEvent
}       