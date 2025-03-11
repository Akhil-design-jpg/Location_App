import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"


const Location = () => {

    const [locate, setLocate] = useState(null)


  
        async function LocateVia() {
            try {

                const loc = await new Promise((res, rej) => {
                    navigator.geolocation.getCurrentPosition((position) => {

                        const latitude = position.coords.latitude
                        const longitude = position.coords.longitude
                        res([latitude, longitude]),
                            (error) =>
                                rej(`Error occured in network ${error}`)


                    }
                    )

                })
                setLocate(loc)
            } catch (error) {
                console.error(`Error in geolocation please try again after some time ${error}`);
                alert(`Geolocation is not supported`)

            }
        }
        LocateVia()
  
    return (
        <div>
            <button onClick={LocateVia}>
                    get location 
            </button>
            {locate ? <p>Latitude: {locate[0]}, Longitude: {locate[1]}</p> : <p>Loading...</p>}

            {locate && (
                <MapContainer center={locate} zoom={26} style={{ height: "480px", width: "480px" }} preferCanvas={true} >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                        <Marker position={locate}>
                <div style={{color: 'black'}}>
                    located
                            <Popup >Your location !!!</Popup>
                </div>

                        </Marker>

                    </TileLayer>



                </MapContainer>
            )}

        </div>
    )
}

export default Location