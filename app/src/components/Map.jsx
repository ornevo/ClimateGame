import React from 'react';
import PropTypes from 'prop-types';
import Area from './Area';
import DilemmaLocation from './DilemmaLocation';
import Effect from './Effect';


const AREAS = [
    {name: 'galil', x: 40, y: 130, w: 170, h: 170},
    {name: 'ramat-hagolan', x: 210, y: 70, w: 80, h: 200},
    {name: 'haifa-and-carmel', x: -20, y: 260, w: 100, h: 130},
    {name: 'yehuda-veshomron', x: 0, y: 400, w: 170, h: 380},
    {name: 'jerusalem', x: -60, y: 650, w: 120, h: 80},
    {name: 'coastline', x: -70, y: 430, w: 70, h: 200},
    {name: 'north-negev', x: -200, y: 860, w: 280, h: 300},
    {name: 'south-negev', x: -100, y: 1160, w: 140, h: 300},
    {name: 'dead-sea', x: 140, y: 670, w: 60, h: 190},
    {name: 'mediterranean', x: -300, y: 200, w: 220, h: 420},
    {name: 'eilat',  x: -60, y: 1560, w: 70, h: 60},
]
const baselineSize = {w:1307.22, h:1708};


class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 1,
            imageRightOffset: 0
        }
    }

    // If for some reason the user resizes the window, this will not be called and will not adjust
    componentDidMount() {
        const imgRect= document.getElementById('map-img').getBoundingClientRect();
        const imgHeight = imgRect.height;
        const imgOffset = imgRect.x;
        this.setState({
            scale: imgHeight / baselineSize.h,
            imageRightOffset: imgOffset,
            imageTopOffset: imgRect.y
        });
    }

    render() {
        // Create areas
        return (
            <div>
                <img src="israel-map.svg" id="map-img" useMap="#image-map" 
                    className={(this.props.popupOpen === true) ? "blurred" : ""}/>
                {
                    AREAS.map((area, areaI) => 
                        <Area key={'map-area-' + areaI} area={area} scale={this.state.scale}
                              rightOffset={this.state.imageRightOffset} topOffset={this.state.imageTopOffset}>
                                  {
                                      this.props.dilemmas.map((dilemma, dilI) => 
                                        dilemma.placement - 1 === areaI &&
                                        <DilemmaLocation key={'dilemma_' + dilI} x={10} y={10} lifetime={dilemma.lifetime} dilemmaId={dilemma._id}
                                                        isDeleted={dilemma.isDeleted} onClick={dId => this.props.onDilemmaLocationClick(dId)} />
                                        )
                                  }
                                  {
                                      this.props.effects.map((effect, eI) => 
                                        effect.placement - 1 === areaI &&
                                        <Effect key={'effect_' + eI} x={effect.x} y={effect.y} id={effect._id}
                                                        onFinish={this.props.onEffectDone} amount={effect.amount}
                                                        metric={effect.metric} delay={effect.delay} />
                                        )
                                  }

                        </Area>
                    )
                }
            </div>
        );
    }
}


Map.propTypes = {
    dilemmas: PropTypes.array.isRequired, // An array of dilemma objects
    onDilemmaLocationClick: PropTypes.func.isRequired, // receives the dilemma id as a param
    effects: PropTypes.array.isRequired,
    onEffectDone: PropTypes.func.isRequired,
    popupOpen: PropTypes.bool,
}

export default Map;