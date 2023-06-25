import React from "react";
import { useState, useEffect } from "react";
import { GetOrders } from "../services/OrderService";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Geocode from "react-geocode";
import { useLocation, useNavigate } from 'react-router-dom';

const ProductsMap = () => {
    const location = useLocation();

    Geocode.setApiKey(process.env.REACT_APP_GEOCODE_KEY);
    Geocode.setLanguage("en");
    Geocode.setRegion("rs");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

    const position = [44.804586472419314, 20.474730942252326];
    const [markersPositions, setMarkersPositions] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigator = useNavigate();

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
        setOrders(newOrders.data);

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

    // const handleAcceptOrder = async (orderId) => {
    //     try {
    //         await sellerService.acceptOrder(orderId);
    //         navigator("/my-orders");
    //     } catch (error) {
    //         if (error.response) {
    //             alert(error.response.data.Exception);
    //         }
    //     }
    // };

    return (
        <MapContainer
            center={position}
            zoom={10}
            style={{ width: "80vw", height: "80vh" }}
        >
            <TileLayer url={process.env.REACT_APP_URL_MT} />
            {markersPositions.map((marker) => (
                <div key={marker.id}>
                    <Marker position={[marker.lat, marker.lon]} icon={markerIcon}>
                        <Popup>
                            <p>Address: {marker.address}</p>
                            <p>Price: ${marker.price}</p>
                            {!orders.find((order) => order.id === marker.id).isAccepted && (
                                <div className="container">
                                    {/* <button
                                        className={classes.acceptButton}
                                        onClick={() => handleAcceptOrder(marker.id)}
                                    >
                                        Accept
                                    </button> */}
                                </div>
                            )}
                        </Popup>
                    </Marker>
                </div>
            ))}
        </MapContainer>
    );
};

export default ProductsMap;
