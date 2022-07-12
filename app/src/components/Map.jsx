import React from 'react';


export default function Map() {
  return (
      <div>
        <img src="israel-map.png" id="map-img" usemap="#image-map" />

        <map name="image-map">
            <area target="" alt="negev" title="negev" href=""
                    coords="510,326,608,326,567,492" shape="poly" onclick={"alert"}/>
        </map>
      </div>
  );
}
