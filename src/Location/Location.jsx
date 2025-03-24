import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Location = () => {
  const [position, setPosition] = useState(null);
  const [phoneinfo, setPhoneInfo] = useState(null);

  const geolocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          let latitude = pos.coords.latitude;
          let longitude = pos.coords.longitude;
          setPosition([latitude, longitude]), { enableHighAccuracy: true };

          // leaflet requries array format
          // latitude and then longitude default syntax
        },
        (error) => {
          console.error("Not supported ", error);
          // getIplocation()
        }
      );
    } else {
      console.error("Something went wrong , please try again");
      // getIplocation(); // runs only when gps doesnot work properly
    }
  };

  const getIplocation = async () => {
    let apiKey = "c0f5ce5239c24a4c9790726f55ade21b";
    let response = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`
    );
    let data = await response.json();
    setPosition([data.latitude, data.longitude]);
  };

  const shareLocation = async() =>{
    if(position){
        try {
            const googleMapsLink = `https://www.google.com/maps?q=${position[0]},${position[1]}`;
            navigator.clipboard.writeText(googleMapsLink)         
                alert("location copied to clipboard")

        } catch (error) {
                console.log("Some error occured",error);
                throw error
        }
       
    }else{
        alert("Error copying location")
        shareViaWhatsapp()
    }
  }

  const shareViaWhatsapp = async() =>{
        if(position){
            try {
                const message = `https://www.google.com/maps?q=${position[0]},${position[1]}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank")
            } catch (error) {
                console.error("Error fetching",error);
                alert("Error fetching")
                
            }
        }
        else{
            console.log("Error copying location");
            
        }
  }

  const getPhonelocation = async () => {
    let phoneNumber = "+917876832723";
    let apilayer2 = "f46d0a34dd686d56d39e161ff21c2140";
    try {
      let response2 = await fetch(
        `https://apilayer.net/api/validate?access_key=${apilayer2}&number=${phoneNumber}`
      );
      let data2 = await response2.json();
      console.log(data2);
      setPhoneInfo(data2);
    } catch (error) {
      console.log("Some error occured", error);
      geolocation(); // fallback to geolocation when Iplocation is not working
    }
  };

  return (
    <>
      <div>
        <button onClick={getIplocation}>Get location</button>
        <button onClick={getPhonelocation}>get phone details</button>
        <button onClick={shareLocation}>Copy your location</button>

        {phoneinfo && (
          <div>
            <h2>Phone number info</h2>
            <p>
              <strong>Valid: </strong>
              {phoneinfo.valid ? "true" : "false"}
            </p>
            <p>
              <strong>Number </strong>
              {phoneinfo.number}
            </p>
            <p>
              <strong>Country: </strong>
              {phoneinfo.country_name}
            </p>
            <p>
              <strong>Carrier: </strong>
              {phoneinfo.carrier}
            </p>
          </div>
        )}

        {position && (
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "800px", width: "800px", marginTop: "20px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>You are here!</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </>
  );
};

export default Location;
