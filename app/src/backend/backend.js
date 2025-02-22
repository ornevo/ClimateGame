import db from "./db.json"
import Constants from "../constants"

const DEBUG_BACKEND = false

let state = {
    active_events: [],
    deleted_events: [],
    chosen_options: [],
    // effects: [],
    emissions: Constants.INITIAL_EMISSIONS,
    money: Constants.INITIAL_MONEY,
    quality_of_life: Constants.INITIAL_QUALITY_OF_LIFE,
    year: Constants.INITIAL_YEAR,
    ticks: Constants.INITIAL_TICKS,
    popupOpen: false
}

function getOption(optionId) {
    for (let i = 0; i < db.options.length; i++) {
        if (db.options[i].ID === optionId) {
            return db.options[i]
        }
    }
    return NaN
}

function getEvent(eventId) {
    for (let i = 0; i < db.events.length; i++) {
        if (db.events[i].ID === eventId) {
            return db.events[i]
        }
    }
    return NaN
}

function applyEffectByOption(optionId){
    let optionEffectJson = getOption(optionId)["effect"]
    state.emissions += optionEffectJson["emissions_delta"]
    state.money += optionEffectJson["money_delta"]
    state.quality_of_life += optionEffectJson["life_quality_delta"]
}

function applyEffectByEvent(eventId){
    let eventJson = getEvent(eventId)
    state.money += eventJson["unhandled_money_delta"]
    state.emissions += eventJson["unhandled_emissions_delta"]
    state.quality_of_life += eventJson["unhandled_life_quality_delta"]
}

function updateStateByOption(chosenOptionId) {
    let option = getOption(chosenOptionId)
    state.chosen_options.push(chosenOptionId)
    // TODO effects?
}

function isMeasureCrossingThreshold(isMeasureMax, measureThreshold, measureState) {
    // what if measurethreshold doesnt exist
    if(DEBUG_BACKEND) console.log(measureState, isMeasureMax, measureThreshold)

    if (isMeasureMax) {
        if (measureThreshold < measureState) {
            return false
        }
    }
    else if (measureThreshold > measureState) {
        return false
    }
    return true
}

function isCrossingThreshold(eventId) {
    // Try to cancel the event and if not return true
    let event = getEvent(eventId)
    // Currently, only thresholds are the year and previous answer
    if (isMeasureCrossingThreshold(event.threshold.is_year_max, event.threshold.year, state.year)) {
        if(event.threshold.necessary_previous_choice === '' || state.chosen_options.includes(event.threshold.necessary_previous_choice))
            return true
    }
    return false
}

// Returns an event id if want to add a new event, else undefined
function getEventToAdd() {
    let relevantEvents = []
    for (let i = 0; i < db.events.length; i++) {
        let eventId = db.events[i].ID
        // Already deleted
        if(state.deleted_events.includes(eventId))
            continue

        // Already actove
        if(state.active_events.includes(eventId))
            continue

        // Don't allow surprise events when popup open
        if(state.popupOpen && isEventSurprise(eventId))
            continue

        if (isCrossingThreshold(eventId)) {
            relevantEvents.push(eventId)
        }
    }

    if(relevantEvents.length === 0)
        return undefined

    // randomly choose event 
    // TODO NOTE somehow give more chance to surprises maybe?
    let newEventId = relevantEvents[Math.floor(Math.random()*relevantEvents.length)]

    return newEventId
    // optional - decide how to return the new event
    // remember to update the year every x ticks 
    // make the ticks amount const
    // check if it didnt happen yet
}

function getState() {
    // First of all, advance ticks and year.
    state.ticks += 1
    state.year = Constants.INITIAL_YEAR + Math.floor(state.ticks / Constants.TICKS_PER_YEAR)

    // Do logic processing once in a while
    if(state.ticks % Constants.GAME_TICKS_PER_LOGICAL_TICK === 0) {
        // Choose if should add event at all
        if(state.active_events.length === 0){
            if(Math.random() > 1-(Constants.NEW_EVENT_RANDOM_THRESHOLD)) {
                const eventIdToAdd = getEventToAdd()
                if(eventIdToAdd !== undefined)
                    state.active_events.push(eventIdToAdd)
            }
        }
        else{
            if(Math.random() > Constants.NEW_EVENT_RANDOM_THRESHOLD) {
                const eventIdToAdd = getEventToAdd()
                if(eventIdToAdd !== undefined)
                    state.active_events.push(eventIdToAdd)
            }
        }
    }

    // Advance effects
    return state
}

function deleteEvent(eventId) {
    state.active_events = state.active_events.filter(function(e) {return e != eventId})
    if(!state.deleted_events.includes(eventId))
        state.deleted_events.push(eventId)
    // console.log("deleted events", eventId)
}

function applyOptionMeasures(optionId){

}

function setPopupOpen(isPopupOpen){
    state.popupOpen = isPopupOpen
}

function isEventSurprise(eId) {
    return getEvent(eId).option_ids.length === 0
}

function applyEventMeasures(eventId, isSurprise){
    let eventJson
    if(isSurprise)
    {
    }
    else
    {
        eventJson = getEvent(eventId)
    }
}

export default {
    state,
    updateStateByOption,
    getState,
    deleteEvent,
    getOption,
    getEvent,
    setPopupOpen,
    isEventSurprise,
    applyEffectByOption,
    applyEffectByEvent
}
