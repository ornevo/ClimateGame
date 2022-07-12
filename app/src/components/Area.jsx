import React from 'react';

export default function Area(props) {
    let newBox = {
        x: props.area.x * props.scale + props.rightOffset,
        y: props.area.y * props.scale,
        h: props.area.h * props.scale,
        w: props.area.w * props.scale
    }
    return (
        <div class="area" onClick={_ => alert(props.area.name)} style={{
            top: newBox.y + "px",
            left: newBox.x + "px",
            height: newBox.h + "px",
            width: newBox.w + "px"
        }}></div>
    )
}