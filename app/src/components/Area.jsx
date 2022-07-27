import React from 'react'

export default function Area(props) {
    let newBox = {
        x: props.area.x * props.scale + props.rightOffset,
        y: props.area.y * props.scale + props.topOffset,
        h: props.area.h * props.scale,
        w: props.area.w * props.scale
    }
    return (
        <div className="area" style={{
            top: newBox.y + "px",
            left: newBox.x + "px",
            height: newBox.h + "px",
            width: newBox.w + "px"
        }}>
            { props.children }
        </div>
    )
}