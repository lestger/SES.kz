import Maps from "../components/Map/Maps";
import React from "react";
import {Placemark} from "@pbe/react-yandex-maps";
import {useDocData} from "../hooks/useDocData";
import {ContentLoader} from "../components/UI/Loader/ContentLoader";

export const SearchOnMap = () => {
const [centers,loader]=useDocData('b_center','all');


    return (
        <>
            <div className={'container'}>
                <h3>Карта</h3>
                {loader?
                    <ContentLoader />
                    :
                    <div className="d-flex">
                    <Maps place={[43.238949, 76.889709]} zoom={12} style={{width:900,height:500}}>
                        {centers.map((g)=><Placemark geometry={g.geo} properties={{
                            balloonContent: `<h6><a href="/"><b>${g.name}</b></a></h6>`+
                                `<b>${g.address}</b>`+
                                `<p><i>${g.geo}</i></p>`
                        }}/>)}

                    </Maps>

                </div>}

        </div></>

    )
}