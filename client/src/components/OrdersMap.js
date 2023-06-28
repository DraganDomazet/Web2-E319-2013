import React from "react";
import { useState, useEffect } from "react";
import { GetOrders, AcceptOrder } from "../services/OrderService";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Geocode from "react-geocode";
import { useLocation } from 'react-router-dom';

const ProductsMap = () => {
    const location = useLocation();

    Geocode.setApiKey(process.env.REACT_APP_GEOCODE_KEY);
    Geocode.setLanguage("en");
    Geocode.setRegion("rs");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

    const position = [45.264586472419314, 19.840730942252326];
    const [markersPositions, setMarkersPositions] = useState([]);

    const markerIcon = new L.Icon({
        iconUrl: "package.png",
        iconSize: [40, 40],
        popupAnchor: [0, -15],
    });

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token' + location.state.user.id), }
    };

    const fetchData = async () => {
        const newOrders = await GetOrders(location.state.user.id, config);

        const markersData = [];
        for (const o of newOrders.data) {
            try {
                const response = await Geocode.fromAddress(o.deliveryAddress);
                const { lat, lng } = response.results[0].geometry.location;
                markersData.push({ id: o.id, lat: lat, lon: lng, price: o.price.toFixed(2), address: o.deliveryAddress });
            } catch (error) {
                console.log(error);
            }
        }

        setMarkersPositions(markersData);
    };

    const handleAcceptOrder = async (orderId) => {
        try {
            const resp = await AcceptOrder(orderId);
            if (resp) {
                fetchData();
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.Exception);
            }
        }
    };

    return (
        <div>
            <h1 className="h-80 d-flex align-items-center justify-content-center">Select a package on map if you want to accept that order!</h1>
            <div className="h-80 d-flex align-items-center justify-content-center" style={{ marginTop: "50px" }}>
                <MapContainer
                    center={position}
                    zoom={13}
                    style={{ width: "80vw", height: "80vh" }}
                >
                    <TileLayer url={process.env.REACT_APP_URL_MT} />
                    {markersPositions.map((marker) => (
                        <div key={marker.id}>
                            <Marker position={[marker.lat, marker.lon]} icon={markerIcon}>
                                <Popup>
                                    <p>Address: {marker.address}</p>
                                    <p>Price: ${marker.price}</p>
                                    <div className="container">
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleAcceptOrder(marker.id)}
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </Popup>
                            </Marker>
                        </div>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default ProductsMap;
