import db from "../components/db.json";
import {INITIAL_EMISSIONS, INITIAL_MONEY, INIITIAL_QUALITY_OF_LIFE,
    INITIAL_YEAR}
     from '../constants'
     state = {
        active_events: [],
        deleted_events: [],
        options: [],
        effects: [],
        emmisions: INITIAL_EMISSIONS,
        money: INITIAL_MONEY,
        quality_of_life: INIITIAL_QUALITY_OF_LIFE,
    
    }



function updateStateByOption(chosenOptionId)
{

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
    deleteEvent
}       