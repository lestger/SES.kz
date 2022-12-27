import React from 'react';
import {Map, Panorama, SearchControl, YMaps, ZoomControl} from "@pbe/react-yandex-maps";


const Maps = ({place, zoom, style,children}) => {
    const defaultState = {
        center: place,
        zoom: zoom,
    };
    return (<>
            {/*<div id={'maps'} style={style||{width:500,height:300}}></div>*/}
            <YMaps query={{apikey:'3e4df121-c983-41ae-bf69-5f94c39f948d'}} >
                <Map defaultState={defaultState} style={style}>
                    {children}
                    <SearchControl options={{ float: "right" }} />
                    <ZoomControl/>

                </Map>
            </YMaps>
    </>

    );
};

export default Maps;