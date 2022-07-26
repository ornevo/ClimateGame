import db from "./db.json";
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


function getOption(optionId) {
    for (let i = 0; i < db.options.length; i++) {
        if (db.options[i].ID === optionId) {
            return db.options[i]
        }
    }
    return NaN;
}


function getEvent(eventId) {
    for (let i = 0; i < db.events.length; i++) {
        if (db.events[i]._id === eventId) {
            return db.events[i]
        }
    }
    return NaN;
}


function effectMeasuresByOption() {

}


function updateStateByOption(chosenOptionId) {
    var option = getOption(chosenOptionId)
    state.options.push(chosenOptionId)
}


function isMeasureCrossingThreshold(isMeasureMax, measureThreshold, measureState) {
    // what if measurethreshold doesnt exist
    console.log(measureState, isMeasureMax, measureThreshold)
    if (isMeasureMax) {
        if (measureThreshold < measureState) {
            return false;
        }
    }
    else if (measureThreshold > measureState) {
        return false;
    }
    return true
}


function isCrossingThreshold(eventId) {
    // Try to cancel the event and if not return true
    let event = getEvent(eventId)
    console.log(isMeasureCrossingThreshold(event.threshold.is_year_max, event.threshold.year, state.year))
    if (isMeasureCrossingThreshold(event.threshold.is_year_max, event.threshold.year, state.year)
        && isMeasureCrossingThreshold(event.threshold.is_money_max, event.threshold.money, state.money)
        && isMeasureCrossingThreshold(event.threshold.is_emissions_max, event.threshold.emmisions, state.emmisions)
        && isMeasureCrossingThreshold(event.threshold.is_life_quality_max, event.threshold.life_quality, state.quality_of_life)) {
        return true;
    }
    return false;
}


function getState() {
    var relevantEvents = [];
    for (let i = 0; i < db.events.length; i++) {
        let eventId = db.events[i]._id
        if (isCrossingThreshold(eventId)) {
            relevantEvents.push(eventId)
        }
    }
    // console.log("love u")
    // console.log(relevantEvents)

    // randomly choose event 
    var newEventId = relevantEvents[Math.floor(Math.random()*relevantEvents.length)];

    
    if (!state.active_events.includes(newEventId))
    {
        state.active_events.push(newEventId)
    }
    else
    {
        
    }
    // optional - decide how to return the new event
    // remember to update the year every x ticks 
    // make the ticks amount const
    // check if it didnt happen yet
}


function deleteEvent(eventId) {
    state.active_events = state.active_events.filter(function(e) {return e != eventId});
    state.deleted_events.push(eventId);
}


function applyOptionMeasures(optionId){

}


function applyEventMeasures(eventId, isSurprise){
    var eventJson;
    if(isSurprise)
    {
        
    }
    else
    {
        eventJson = getEvent(eventId);
    }
}


export default {
    state,
    updateStateByOption,
    getState,
    deleteEvent,
    getOption,
    getEvent
}