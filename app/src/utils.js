import Constants from './constants'


export default {
    getDilemma: id => Constants.DILEMMAS.find(d => d.ID === id),
    random: (min,max) => parseInt(min + (Math.random() * (max - min))), // min is inclusive, max exclusive
}