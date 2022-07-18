import Constants from './constants'


export default {
    getDilemma: id => Constants.DILEMMAS.find(d => d.ID === id)
}