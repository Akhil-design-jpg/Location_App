import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Location = () => {
    const [locate, setLocate] = useState(null);

    async function getPhonelocation() {
        let phoneNumber = "7876832723";
        let apikey = import.meta.env.VITE_API_KEY; // Updated API key

        let url = `https://api.apilayer.com/number_verification/validate?access_key=${apikey}&number=${phoneNumber}`;

        try {
            let response = await fetch(url);
            let data = await response.json();
            console.log(data);

            if (data.valid) {
                alert(`Country: ${data.country_name}, Carrier: ${data.carrier}`);
                getCountryCoords(data.country_name); // Get country coordinates
            } else {
                alert("Invalid phone number!");
            }
        } catch (error) {
            alert("Error fetching phone location. Please try again later.");
            console.error("Fetch Error:", error);
        }
    }

    async function getCountryCoords(countryName) {
        let geoCodeApiKey = import.meta.env.VITE_GEO_CODE_API; // Updated API key
        let geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${countryName}&key=${geoCodeApiKey}`;

        try {
            let response = await fetch(geoUrl);
            let data = await response.json();
            console.log(data);

            if (data.results.length > 0) {
                let { lat, lng } = data.results[0].geometry; // Destructuring
                setLocate([lat, lng]); // Set coordinates in state
            } else {
                alert("Unable to find location for this country");
            }
        } catch (error) {
            console.error("Error fetching country location:", error);
        }
    }

    useEffect(() => {
        getPhonelocation();
    }, []); // Run once when the component mounts

    return (
        <div>
            <button onClick={getPhonelocation}>Get phone location</button>

            {locate && (
                <MapContainer center={locate} zoom={6} style={{ height: "480px", width: "480px" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={locate}>
                        <Popup>You are here!</Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
};

export default Location;
