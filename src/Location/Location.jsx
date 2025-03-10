import React, { useEffect, useState } from "react"


const Location = () => {

    const [locate, setLocate] = useState(null)


    useEffect(() => {
        async function LocateVia() {
            try {

                const loc = await new Promise((res, rej) => {
                    navigator.geolocation.getCurrentPosition((position) =>{

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

            }
        }
        LocateVia()
    }, [])
    return (
        <div>
            {locate ? <p>Latitude: {locate[0]}, Longitude: {locate[1]}</p> : <p>Loading...</p>}
        </div>
    )
}

export default Location