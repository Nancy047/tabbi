import React, { useEffect, useState, useRef } from "react";
import bot from "../assets/Virtual.png";
import send_icon from "../assets/send_icon.png";
import search from "../assets/search.png";
import drag from "../assets/drag.png";
import logo from "../assets/logo.png";
import qflogo from "../assets/QF Logo.png";
import Greylogo from "../assets/QF Logo (2).png";
import t1 from "../assets/t1.png";
import tt1 from "../assets/tt1.png";
import truck from "../assets/truckk.png";
import cap from "../assets/capacity icon.svg";
import capacity from "../assets/icon-1.png";
import location from "../assets/icon-2.png";
import mileage from "../assets/mileage.png";
import fueltype from "../assets/fueltype.png";
import distance from "../assets/distance.png";
import driverpic from "../assets/driverpic.png";
import mapboxgl from 'mapbox-gl'; // Import Mapbox GL JS library
import reset1 from "../assets/reset1.png";
import bg from "../assets/taabi-bg.png";
import driver1 from "../assets/driver1.png";
import map from "../assets/map.png";
import greylocation from "../assets/grey-location.png";
import prompt1 from "../assets/Graph.svg";
import prompt2 from "../assets/Password.svg";
import setting from "../assets/settings.png"
import userimg from "../assets/taabi-profil.png";
import tabbiimg from "../assets/tabbi_white.png";
import promticon from "../assets/prompt-icon.png"
import { FaPlus, FaSearch } from "react-icons/fa";
import prompt4 from "../assets/Star.svg";
import prompt3 from "../assets/Setting 4.svg";
import CableTable from "./CableTable";
import Tab from "./Tab";
import ProductCardList from "./PoductCard";
import Terminal1 from "../assets/image 1.png";
import Terminal2 from "../assets/image 2.png";
import Terminal3 from "../assets/image 3.png";
import decor1 from "../assets/Mask group.png";
import decor2 from "../assets/Mask group-1.png";
import decor3 from "../assets/Mask group-2.png";
import aiblack from "../assets/chatblackicon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PieChart from "../Dashboard/HighPie";
import Bargraph from "../Dashboard/bargraph";
import Behaviour from "../Dashboard/behaviour";
import Behaviour2 from "../Dashboard/behaviour2";
import Fuelgraph from "../Dashboard/fuel";




import {
  faChartBar,
  faComment,
  faMessage,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "react-burger-menu";
import { MainPage } from "./MainPage";




mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuamF5MjcwMiIsImEiOiJjbGZqOWs5eHMwaDRmM29wbmQxbDdiZDRkIn0.Z4RiNN4fyNubRADsNcNJ4w'; // Replace with your Mapbox access token

const Chat = ({ data, submitData, loading, listData, onDataFromChild }) => {
  const listConversationRef = useRef(null);


  useEffect(() => {
    // Scroll to the bottom of the list_conversation container whenever listData changes
    if (listConversationRef.current) {
      listConversationRef.current.scrollTop =
        listConversationRef.current.scrollHeight;
    }
  }, [listData]);

  const fuelCapacity = 1000; // example value
  const utilizedFuel = 500;
  const [isTruckData, setIsTruckData] = useState(false);

  const [focus, setFocus] = useState(false);

  const [isCardVisible, setCardVisible] = useState(false);
  const [isCloseCard, setCloseCard] = useState(false);
  const [tripStart, settripStart] = useState("");
  const [tripEnd, settripEnd] = useState("");
  const [tripCap, settripCap] = useState("");

  // const handleButtonClicks = () => {
  //   setCardVisible(!isCardVisible);
  // };

  const [inputText, setInputText] = useState("");
  const [defaultText, setDefaultText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState({});
  // const [isCardDetailsRequested, setIsCardDetailsRequested] = useState(false);
  const [selectedCable, setSelectedCable] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const [currentHoverIndex, setCurrentHoverIndex] = useState(null);
  const [currentFibreIndex, setCurrentFibreIndex] = useState(null);

  const [currentClickIndex, setCurrentClickIndex] = useState(null);
  const handleCableHover = (cable) => {
    setSelectedCable(cable);
  };

  const handleChange1 = (event) => {
    // Update the state variable "value" with the new value from the input
    settripStart(event.target.value);
  };
  const handleChange2 = (event) => {
    // Update the state variable "value" with the new value from the input
    settripEnd(event.target.value);
  };

  const handleChange3 = (event) => {
    // Update the state variable "value" with the new value from the input
    settripCap(event.target.value);
  };

  const [showMap, setShowMap] = useState(false); // State to manage whether to show the map overlay or not

  // Function to toggle the display of the map overlay
  const toggleMap = () => {
    setShowMap(!showMap);
  };

  async function fetchRouteCoordinates() {
    const response = await fetch(
      'https://api.mapbox.com/directions/v5/mapbox/driving/77.1025,28.7041;76.0856,29.0588?geometries=geojson&access_token=pk.eyJ1Ijoic2FuamF5MjcwMiIsImEiOiJjbGZqOWs5eHMwaDRmM29wbmQxbDdiZDRkIn0.Z4RiNN4fyNubRADsNcNJ4w'
    );
    const data = await response.json();
    return data.routes[0].geometry.coordinates;
  }

  useEffect(() => {
    if (showMap) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v11', // mapbox style url
        center: [77.1025, 28.7041], // Delhi coordinates
        zoom: 12, // Zoom level
        attributionControl: false
      });

      // Add navigation control (optional)
      map.addControl(new mapboxgl.NavigationControl());

      // Fetch route coordinates from Directions API
      fetchRouteCoordinates()
        .then(coordinates => {
          // Draw route line on the map
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: coordinates
                }
              }
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': 'blue', // Changed line color to white
              'line-width': 5 // Increased line width to 8
            }
          });


          map.on('load', () => {
            // Add source icon
            map.loadImage(
              'https://cdn.iconscout.com/icon/free/png-256/free-navigation-328-789835.png',
              (error, image) => {
                if (error) throw error;
                map.addImage('source-icon', image);
                map.addSource('source', {
                  type: 'geojson',
                  data: {
                    type: 'FeatureCollection',
                    features: [{
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: coordinates[0]
                      }
                    }]
                  }
                });
                map.addLayer({
                  id: 'start',
                  type: 'symbol',
                  source: {
                    type: 'geojson',
                    data: {
                      type: 'FeatureCollection',
                      features: [
                        {
                          type: 'Feature',
                          geometry: {
                            type: 'Point',
                            coordinates: coordinates[0] // Starting point coordinates
                          },
                          properties: {
                            // title: 'Starting Point',
                            // img:'source-icon'


                          }
                        },
                        {
                          type: 'Feature',
                          geometry: {
                            type: 'Point',
                            coordinates: coordinates[coordinates.length - 1] // Ending point coordinates
                          },
                          properties: {
                            // title: 'Ending Point'
                          }
                        }
                      ]
                    }
                  },
                  layout: {
                    'icon-image': 'source-icon', // Set the icon image
                    'icon-size': 0.2, // Set the icon size
                    'text-field': ['get', 'title'], // Display title
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-offset': [0, 0.6], // Position text slightly above the icon
                    'text-anchor': 'top' // Anchor text to the top of the icon
                  }
                });
              }
            );

            // Add destination icon

          });


          // Add starting and ending markers
          // map.addLayer({
          //   id: 'start',
          //   type: 'symbol',
          //   source: {
          //     type: 'geojson',
          //     data: {
          //       type: 'FeatureCollection',
          //       features: [
          //         {
          //           type: 'Feature',
          //           geometry: {
          //             type: 'Point',
          //             coordinates: coordinates[0] // Starting point coordinates
          //           },
          //           properties: {
          //             // title: 'Starting Point',
          //             // img:{bot}


          //           }
          //         },
          //         {
          //           type: 'Feature',
          //           geometry: {
          //             type: 'Point',
          //             coordinates: coordinates[coordinates.length - 1] // Ending point coordinates
          //           },
          //           properties: {
          //             // title: 'Ending Point'
          //           }
          //         }
          //       ]
          //     }
          //   },
          //   layout: {
          //     // 'icon-image': 'circle-15', // Set the icon image
          //     'icon-size': 1.5, // Set the icon size
          //     'text-field': ['get', 'title'], // Display title
          //     'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          //     'text-offset': [0, 0.6], // Position text slightly above the icon
          //     'text-anchor': 'top' // Anchor text to the top of the icon
          //   }
          // });

          // Fit the map to the route bounds
          const bounds = coordinates.reduce((bounds, coord) => {
            return bounds.extend(coord);
          }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
          map.fitBounds(bounds, {
            padding: { top: 50, bottom: 50, left: 50, right: 50 }
          });
        })
        .catch(error => {
          console.error('Error fetching route:', error);
        });

      // Clean up function to remove map on unmount
      return () => map.remove();
    }
  }, [showMap]);


  const [prompt, setPrompt] = useState([
    {
      prompt: "Trip analytics",

      desc: "Crafting Efficient & successful Trips, Empowering Trucks for Seamless Deliveries.",
      follow: true,
      image: prompt1,
    },
    {
      prompt: "Efficiency metrics",
      desc: "Optimize success with Efficiency Metrics, analyzing data for peak performance.",
      follow: true,
      image: prompt2,
    },
  ]);



  const MockData = [
    { date: '2024-02-20', Starttime: '8:00am', Endtime: '7:00pm', Duration: '8hrs', Distance: 5000, AvgSpeed: 50 },
    { date: '2024-02-19', Starttime: '6:00am', Endtime: '10:00pm', Duration: '14hrs', Distance: 2000, AvgSpeed: 80 },
    { date: '2024-02-18', Starttime: '5:00am', Endtime: '9:00pm', Duration: '10hrs', Distance: 4000, AvgSpeed: 60 },
    { date: '2024-02-17', Starttime: '8:00am', Endtime: '5:00pm', Duration: '7hrs', Distance: 3500, AvgSpeed: 90 },
    { date: '2024-02-16', Starttime: '6:00am', Endtime: '10:00pm', Duration: '8hrs', Distance: 7000, AvgSpeed: 80 }
  ];

  const Pilferage = [
    { date: '2024-02-20', location: 'pune', value: '26L', latitude: '787878.1', longitude: '3456789.87' },
    { date: '2024-02-20', location: 'Uttra-pradesh', value: '20L', latitude: '787878.1', longitude: '3456789.87' },
    { date: '2024-02-20', location: 'Maharastra', value: '15L', latitude: '787878.1', longitude: '3456789.87' },
    { date: '2024-02-20', location: 'Haryana', value: '8L', latitude: '787878.1', longitude: '3456789.87' },
    { date: '2024-02-20', location: 'Punjab', value: '46L', latitude: '787878.1', longitude: '3456789.87' },
  ];

  const FuelData = [
    { date: '2024-02-20', location: 'pune', value: '26L', latitude: '787878.1', longitude: '3456789.87' },
    { date: '2024-02-20', location: 'Uttra-pradesh', value: '20L', latitude: '787878.1', longitude: '3456789.87' },
    { date: '2024-02-20', location: 'Maharastra', value: '15L', latitude: '787878.1', longitude: '3456789.87' },
    { date: '2024-02-20', location: 'Haryana', value: '8L', latitude: '787878.1', longitude: '3456789.87' },
    { date: '2024-02-20', location: 'Punjab', value: '46L', latitude: '787878.1', longitude: '3456789.87' },
  ];

  const handleCardClick = (pr) => {
    setIsTyping(true);
    setSelectedCard(pr);
    submitData(pr);
    sendDataToParent(true);
    setSelectedPrompt(pr);

    if (pr.follow) {
      setDefaultText(pr);
      setInputText("");
    } else {
      setDefaultText("");
      setInputText("");
    }
    // handlePromptClick();
  }

  useEffect(()=>{
    if(selectedCard){
     
     
    }


  },[listData])


  const handlePromptClick = (pr) =>{
    console.log("Clicked on card:", pr.prompt);
    setIsTyping(true);
    setSelectedCard(pr.prompt);
    submitData(pr.prompt);
    sendDataToParent(true);
    setSelectedPrompt(pr);

    if (pr.follow) {
      // setDefaultText(pr.prompt);
      setInputText("");
    } else {
      setDefaultText("");
      setInputText("");
    }
  }
  
  const sendDataToParent = (data) => {
    // Call the callback function passed from the parent with the data
    onDataFromChild(data);
  };

  const [isPrSelected, setIsPrSelected] = useState(false);

  


  return (
    <div style={{width:"100%",display:"flex"}}>
      {listData?.length > 0 ? <>
      <div className="sidebar-nav" >
        <div className="sidebarnav-content">
        <div className="top-content">
          <div className="top-img">
            <img src={tabbiimg}></img>

          </div>
         
          {/* <div className="h-line"></div> */}
        
          <div className="top-newchat">
            <div className="newchat-icon">
              <FaPlus/>
            </div>
            <div className="newchat-content">
              New Chat

            </div>

          </div>

        </div>
        <div className="down-content">
          <div className="setting-icon">
            <img src={setting} style={{ width: '24px', height: '24px'}}></img>
          </div>
          <div className="user-icon">
            <img src={userimg} style={{ width: '36px', height: '36px'}}></img>

          </div>

        </div>
        </div>
      </div>
      <div className="sidemenu">
        <div className="sidemenu-button">
          <div className="sidemenu-btn-1">
            Prompt
          </div>
          <div className="sidemenu-btn-2">
          History
          </div>
          
          </div>
          <div className="cards">
          <div className={`card1 ${selectedCard === 'Trip analytics' ? 'selected' : ''}`} onClick={() => handleCardClick("Trip analytics")
        }>
            <div className="cardicon-header">
            <img src={promticon} style={{ width: '24px', height: '22px'}}></img>
            <div className="card1-content">
                Trip Analytics           
            </div>           
            </div> 
            <div className="card1-description">
              Crafting Efficient Trips, Empowering Trucks for Seamless Deliveries
              </div>
          </div>
          <div className={`card2 ${selectedCard === 'Efficiency metrics' ? 'selected' : ''}`} onClick={() => handleCardClick( "Efficiency metrics")}>
          <div className="cardicon-header">
            <img src={promticon} style={{ width: '24px', height: '22px'}}></img>
            <div className="card1-content">
            Efficiency Metrics          
            </div>           
            </div> 
            <div className="card1-description">
            Optimize success with Efficiency Metrics, analyzing data for peak performance
              </div>
          </div>
          </div>
           </div> 
           </>: null}
      

      <div className="chatdata_container" style={{width:listData?.length > 0 ? "75%" : "100%"}}>
        <div className="conversation">
          <>
            {/* prompt container */}

            {!isTyping && (
              <div className="heading-part">
                {/* <div>
                  <div className="desc-header  ai-header">
                    <img src={aiblack}></img>
                    AI Companion
                  </div>
                  <div className="description">
                    Your Vehicle Companion – Effortless Insights at Your
                    Fingertips!
                  </div>
                </div> */}
                <div className="prompt_container">
      {prompt.map((pr) => (
        <div
          key={pr.prompt}
          className={`prompt ${selectedCard === pr.prompt ? 'selected' : ''}`}
          onClick={() => handlePromptClick(pr)}
        >
          <div style={{ display: "flex" }}>
            <img src={pr.image} style={{ paddingRight: "10px" }} alt={pr.prompt} />
            <h3 style={{ margin: "0px" }}>{pr.prompt}</h3>
          </div>
          <div>
            <p className="pr_desc">{pr.desc}</p>
          </div>
        </div>
      ))}
    </div>
              </div>
            )}
          </>

          {listData?.length > 0 ? (
            <div className="list_conversation" ref={listConversationRef}>
              {console.log("coming", listData)}
              {listData?.map((item, index) => {
                return (
                  <>
                    {item.type === "user" ? (
                      <>
                        {item.messageType === "unknow" ? (
                          <div key={index} className={`chat-${item.type}`}>
                            <div>
                              <img src={bot}></img>
                            </div>
                            <div>
                              <div>
                                <div className="bot_text">
                                  <div
                                    key={index}
                                    className={`chat-${item.type}`}
                                  >
                                    <div>
                                      <div className="card-suggestion">
                                        we're happy to instruct you please enter
                                        the below details
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* {selectedCable &&
                                  currentFibreIndex === index && (
                                    <CableTable cable={selectedCable} />
                                  )} */}
                            </div>
                          </div>
                        ) : (
                          <div key={index} className={`chat-${item.type}`}>
                            <div className="chaticon-user">
                              <div className="user-text">{item.text}</div>
                              <div className="user_profile">SJ</div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {item.messageType === "truckDetail" ? (
                          <div>
                            <div style={{ display: "flex" }}>
                              <div>
                                <img src={bot}></img>
                              </div>
                              <div>
                                <div>
                                  <div className="bot_text">
                                    <div
                                      key={index}
                                      className={`chat-${item.type}`}
                                    >
                                      <div>
                                        <div className="card-suggestion">
                                          Thank you for providing the details.
                                          Let me analyze the trip for you.
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="recommand-heading">
                                    Recommanded vechiles
                                  </div>

                                  {/* Recommanded-1 */}
                                  <div className="truck-detail-card">
                                    <div className="card-top">
                                      <img
                                        style={{ width: "20%" }}
                                        src={driver1}
                                      ></img>

                                      <div className="card-details">
                                        <p className="d-name">PETAKAR KUMAR</p>
                                        <p className="d-phn">
                                          Ph no:+91 9585964857
                                        </p>
                                        <p className="d-lic">
                                          Lis no. TN70 22022465581
                                        </p>
                                      </div>
                                    </div>

                                    <div className="card-mid">
                                      <div className="Driver_id_no">
                                        <h4>Driver ID</h4>
                                        <p>AD2010</p>
                                      </div>
                                      <div className="Driver_id_no">
                                        <h4>Truck ID</h4>
                                        <p>1269981</p>
                                      </div>
                                      <div className="Driver_id_no">
                                        <h4>Distance</h4>
                                        <p>15000 km/hr</p>
                                      </div>
                                      <div className="Driver_id_no">
                                        <h4>Avg Fuel consumption</h4>
                                        <p>10km/Liter</p>
                                      </div>

                                      <div className="Driver_id_no">
                                        <h4>Truck Capacity </h4>
                                        <p>8 Ton</p>
                                      </div>
                                      <div className="Driver_id_no">
                                        <h4>Fuel type</h4>
                                        <p>Diesel</p>
                                      </div>
                                      <div className="Driver_id_no">
                                        <h4>Truck location</h4>
                                        <p>Haryana</p>
                                      </div>
                                      <div className="choos-button">
                                        <button
                                          class=""
                                          role="button"
                                          onClick={() => {
                                            setIsTyping(true);
                                            submitData(
                                              `your are choosen the driver.`,
                                              "mapdetails"
                                            );
                                          }}
                                        >
                                          Choose truck
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Recommanded-2 */}

                                  <div className="truck-detail-card">
                                    <div className="card-top">
                                      <img
                                        style={{ width: "20%" }}
                                        src={driverpic}
                                      ></img>

                                      <div className="card-details">
                                        <p className="d-name">SURESH CHANDRA</p>
                                        <p className="d-phn">
                                          Ph no:+91 958596234
                                        </p>
                                        <p className="d-lic">
                                          Lis no. TN70 220224653233
                                        </p>
                                      </div>
                                    </div>

                                    <div className="card-mid">
                                      <div className="Driver_id_no">
                                        <h4>Driver ID</h4>
                                        <p>AD20112</p>
                                      </div>
                                      <div className="Driver_id_no">
                                        <h4>Truck ID</h4>
                                        <p>213445</p>
                                      </div>
                                      <div className="Driver_id_no">
                                        <h4>Distance</h4>
                                        <p>20,000 km/hr</p>
                                      </div>
                                      <div className="Driver_id_no">
                                        <h4>Avg Fuel consumption</h4>
                                        <p>15km/Liter</p>
                                      </div>

                                      <div className="Driver_id_no">
                                        <h4>Truck Capacity </h4>
                                        <p>16 Ton</p>
                                      </div>
                                      <div className="Driver_id_no">
                                        <h4>Fuel type</h4>
                                        <p>Diesel</p>
                                      </div>
                                      <div className="Driver_id_no">
                                        <h4>Truck location</h4>
                                        <p>Delhi</p>
                                      </div>

                                      <div className="choos-button">
                                        <button
                                          class=""
                                          role="button"
                                          onClick={() => {
                                            setIsTyping(true);
                                            submitData(
                                              `your are choosen the driver.`,
                                              "mapdetails"
                                            );
                                          }}
                                        >
                                          Choose truck
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* </div> */}
                                </div>
                                {/* {selectedCable &&
                                  currentFibreIndex === index && (
                                    <CableTable cable={selectedCable} />
                                  )} */}
                              </div>
                            </div>
                          </div>
                        ) : item.messageType === "customMessage0" ? (
                          <div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <div>
                                  <img src={bot}></img>
                                </div>
                                <div className="chat-bot">
                                  <div className="bot_text">
                                    <div
                                      key={index}
                                      className={`chat-${item.type}`}
                                    >
                                      <div>
                                        <div className="card-suggestion">
                                           Let's get started. Please
                                          select an Start point , End Point and
                                          vehicle capacity to start with trip.
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="trip-card">
                                    <div class="input-field">
                                      <select
                                        className="select-dp"
                                        id="dropdown1"
                                        name="dropdown1"
                                        onChange={handleChange1}
                                      >
                                        <option value="starting">
                                          starting point
                                        </option>

                                        <option value="chennai">Delhi</option>
                                        <option value="madurai">Chennai</option>
                                        <option value="trichy">Banglore</option>
                                      </select>
                                    </div>

                                    <div class="input-field">
                                      <select
                                        id="dropdown2"
                                        name="dropdown2"
                                        onChange={handleChange2}
                                      >
                                        <option value="starting">
                                          Ending point
                                        </option>
                                        <option value="madurai">Haryana</option>
                                        <option value="salem">Hydrabad</option>
                                        <option value="ramand">Kolkata</option>
                                      </select>
                                    </div>
                                    <div class="input-field">
                                      <select
                                        id="dropdown3"
                                        name="dropdown3"
                                        onChange={handleChange3}
                                      >
                                        <option value="starting">
                                          Truck capacity
                                        </option>

                                        <option value="10">10</option>
                                        <option value="12">12</option>
                                        <option value="14">14</option>
                                      </select>
                                    </div>

                                    <div>
                                      <button
                                        class="submit-button"
                                        role="button"
                                        onClick={() => {
                                          setIsTyping(true);
                                          submitData(
                                            `congrats your starting point${tripStart} & ending point ${tripEnd}, truck capacity ${tripCap}`,
                                            "truckDetail"
                                          );
                                        }}
                                      >
                                        submit
                                      </button>
                                    </div>

                                    <div>
                                      <button
                                        role="button"
                                            className="reset-button"
                                      >
                                        reset
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        ) : item.messageType === "id-ask" ? (
                          <div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <div>
                                  <img src={bot}></img>
                                </div>
                                <div>
                                  <div className="bot_text">
                                    <div
                                      key={index}
                                      className={`chat-${item.type}`}
                                    >
                                      <div>
                                        <div className="card-suggestion">
                                           Let's get started. Please
                                          enter truck id to get efficiency
                                          metrics.
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        ) : item.messageType === "metrics" ? (
                          <div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <div>
                                  <img src={bot}></img>
                                </div>
                                <div>
                                  <div className="bot_text">
                                    <div
                                      key={index}
                                      className={`chat-${item.type}`}
                                    >
                                      <div>
                                        <div className="card-suggestion">
                                           Let's get started. the
                                          efficiency metrics for your choosen
                                          truck id: 2922
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="efficiency-container">
                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on vechile fuel capacity`,
                                          "fuel-capacity"
                                        );
                                      }}
                                      className="eff-button1"
                                    >
                                      Fuel Capacity vs Utilization
                                    </button>

                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "running-time"
                                        );
                                      }}
                                      className="eff-button1"
                                    >
                                      Total running time per day
                                    </button>

                                    <button className="eff-button1">
                                      Total hrs travelled in a day
                                    </button>

                                    <button className="eff-button1">
                                      Idling time per day
                                    </button>
                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "pilferage"
                                        );
                                      }}

                                      className="eff-button1">
                                      Pilferage
                                    </button>

                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "idiling-time"
                                        );
                                      }}

                                      className="eff-button1">
                                      Driver behavior alert count
                                    </button>
                                    <button className="eff-button1">
                                      Other Information
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {/* {selectedDevice &&
                                currentClickIndex === index && (
                                  <ProductCardList
                                    device={selectedDevice.data}
                                  />
                                )} */}
                            </div>
                          </div>
                        ) : item.messageType === "mapdetails" ? (
                          <div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <div>
                                  <img src={bot}></img>
                                </div>
                                <div>
                                  <div className="bot_text">
                                    <div
                                      key={index}
                                      className={`chat-${item.type}`}
                                    >
                                      <div>
                                        Thank you for providing the details. Let
                                        me analyze the best route for you.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="recommand-heading">
                                    Recommanded route
                                  </div>
                                  <div className="route-container">

                                    <div className="route-card" onClick={toggleMap}>
                                      <div className="route-card-top">
                                        <div className="route-hours">
                                          <img
                                            style={{ width: "20px" }}
                                            src={greylocation}
                                          ></img>
                                          <h3> 4hrs 36mins</h3>
                                        </div>

                                      </div>
                                      <div className="route-card-mid">
                                        <div className="">
                                          <p>mild traffic, as usual</p>
                                        </div>
                                        <div>
                                          <img
                                            style={{ width: "45px" }}
                                            src={map}
                                          ></img>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="route-card" onClick={toggleMap}>
                                      <div className="route-card-top">
                                        <div className="route-hours">
                                          <img
                                            style={{ width: "20px" }}
                                            src={greylocation}
                                          ></img>
                                          <h3 style={{ color: "red" }}>
                                            {" "}
                                            5hrs 36mins
                                          </h3>
                                        </div>
                                        {/* <div className="checkbox">
                                          <label class="checkbox-container">
                                            <input type="checkbox"></input>
                                            <span class="checkmark"></span>
                                          </label>
                                        </div> */}
                                      </div>
                                      <div className="route-card-mid">
                                        <div className="">
                                          <p>Heavy traffic, as usual</p>
                                        </div>
                                        <div>
                                          <img
                                            style={{ width: "45px" }}
                                            src={map}
                                          ></img>
                                        </div>
                                      </div>
                                    </div>



                                    <div className="route-card" onClick={toggleMap}>
                                      <div className="route-card-top">
                                        <div className="route-hours">
                                          <img
                                            style={{ width: "20px" }}
                                            src={greylocation}
                                          ></img>
                                          <h3 style={{ color: "red" }}>
                                            {" "}
                                            6hrs 36mins
                                          </h3>
                                        </div>
                                        {/* <div className="checkbox">
                                          <label class="checkbox-container">
                                            <input type="checkbox"></input>
                                            <span class="checkmark"></span>
                                          </label>
                                        </div> */}
                                      </div>
                                      <div className="route-card-mid">
                                        <div className="">
                                          <p>Heavier traffic, not advisable</p>
                                        </div>
                                        <div>
                                          <img
                                            style={{ width: "45px" }}
                                            src={map}
                                          ></img>
                                        </div>
                                      </div>
                                    </div>

                                    {showMap && (
                                      <div className="map-overlay">
                                        <span className="close-btn" onClick={toggleMap}>×</span>
                                        <div id="map" style={{ width: "93%", height: "93%", position: "absolute", margin: '2%' }}></div>
                                      </div>
                                    )}
                                  </div>


                                  <div className="trip-endflow-suggestion">
                                    <div className="msg">
                                      Are you sure with above given details.
                                    </div>
                                    <div className="suggest-button-container">
                                      <button
                                        onClick={() => {
                                          setIsTyping(true);
                                          submitData(
                                            `congrats your starting point${tripStart} & ending point ${tripEnd}, truck capacity ${tripCap}`,
                                            "trip-yes"
                                          );
                                        }}
                                        className="suggest-button"
                                      >
                                        yes
                                      </button>
                                      <button
                                        onClick={() => {
                                          setIsTyping(true);
                                          submitData(
                                            `congrats your starting point${tripStart} & ending point ${tripEnd}, truck capacity ${tripCap}`,
                                            "trip-no"
                                          );
                                        }}
                                        className="suggest-button"
                                      >
                                        no
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : item.messageType === "running-time" ? (
                          <div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <div>
                                  <img src={bot}></img>
                                </div>
                                <div>
                                  <div className="bot_text">
                                    <div
                                      key={index}
                                      className={`chat-${item.type}`}
                                    >
                                      <div>
                                        Here's a graph displaying the total
                                        running time per day over the past
                                        month.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="t-g">
                                    <div style={{ margin: 10, width: "100%" }}>
                                      <Bargraph
                                        fuelCapacity={fuelCapacity}
                                        utilizedFuel={utilizedFuel}
                                      />
                                    </div>
                                    <table>
                                      <thead style={{ background: "blue" }}>
                                        <tr>
                                          <th>Date</th>
                                          <th>Start time</th>
                                          <th>End time</th>
                                          <th>Duration</th>
                                          <th>Distance travelled(Km/miles)</th>
                                          <th>Average speed(km/hr)</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {MockData.map((data, index) => (
                                          <tr key={index}>
                                            <td>{data.date}</td>
                                            <td>{data.Starttime}</td>
                                            <td>{data.Endtime}</td>
                                            <td>{data.Duration}</td>
                                            <td>{data.Distance}</td>
                                            <td>{data.AvgSpeed}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>

                                </div>
                              </div>
                              <div className="suggest-metrics">
                                <div className="msg">
                                  do you like look for other Efficiency metrics
                                </div>
                                <div className="fuel-efficiency-container">
                                  <div className="f1">
                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on vechile fuel capacity`,
                                          "fuel-capacity"
                                        );
                                      }}
                                      className="eff-button1"
                                    >
                                      Fuel Capacity vs Utilization
                                    </button>

                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "running-time"
                                        );
                                      }}
                                      className="eff-button1"
                                    >
                                      Total running time per day
                                    </button>

                                    <button className="eff-button1">
                                      Total hrs travelled in a day
                                    </button>
                                  </div>
                                  <div className="f2">
                                    <button className="eff-button1">
                                      Idling time per day
                                    </button>
                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "pilferage"
                                        );
                                      }}

                                      className="eff-button1">
                                      Pilferage
                                    </button>

                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "idiling-time"
                                        );
                                      }}


                                      className="eff-button1">
                                      Driver behavior alert count
                                    </button>
                                    <button className="eff-button1">
                                      Other Information
                                    </button>
                                  </div>
                                </div>

                                {/* <div className="suggest-button-container">
                                  <button
                                    onClick={() => {
                                      setIsTyping(true);
                                      submitData(
                                        `congrats your starting point${tripStart} & endi  ng point ${tripEnd}, truck capacity ${tripCap}`,
                                        "other-metrics"
                                      );
                                    }}
                                    className="suggest-button"
                                  >
                                    yes
                                  </button>
                                  <button className="suggest-button">no</button>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        ) : item.messageType === "end" ? (
                          <div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <div>
                                  <img src={bot}></img>
                                </div>
                                <div>
                                  <div className="bot_text">
                                    <div
                                      key={index}
                                      className={`chat-${item.type}`}
                                    >
                                      <div>
                                        Thank for choosing your trip here.
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : item.messageType === "no" ? (
                          <div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <div>
                                  <img src={bot}></img>
                                </div>
                                <div>
                                  <div className="bot_text">
                                    <div
                                      key={index}
                                      className={`chat-${item.type}`}
                                    >
                                      <div>
                                        <div className="card-suggestion">
                                          Absolutely! Let's get started. Please
                                          select an Start point , End Point and
                                          vehicle capacity to start with trip.
                                        </div>
                                        <div class="trip-card">
                                    <div class="input-field">
                                      <select
                                        className="select-dp"
                                        id="dropdown1"
                                        name="dropdown1"
                                        onChange={handleChange1}
                                      >
                                        <option value="starting">
                                          starting point
                                        </option>

                                        <option value="chennai">chennai</option>
                                        <option value="madurai">madurai</option>
                                        <option value="trichy">trichy</option>
                                      </select>
                                    </div>

                                    <div class="input-field">
                                      <select
                                        id="dropdown2"
                                        name="dropdown2"
                                        onChange={handleChange2}
                                      >
                                        <option value="starting">
                                          Ending point
                                        </option>
                                        <option value="madurai">madurai</option>
                                        <option value="salem">salem</option>
                                        <option value="ramand">ramanad</option>
                                      </select>
                                    </div>
                                    <div class="input-field">
                                      <select
                                        id="dropdown3"
                                        name="dropdown3"
                                        onChange={handleChange3}
                                      >
                                        <option value="starting">
                                          Truck capacity
                                        </option>

                                        <option value="10">10</option>
                                        <option value="12">12</option>
                                        <option value="14">14</option>
                                      </select>
                                    </div>

                                    <div>
                                      <button
                                        class="submit-button"
                                        role="button"
                                        onClick={() => {
                                          setIsTyping(true);
                                          submitData(
                                            `congrats your starting point${tripStart} & ending point ${tripEnd}, truck capacity ${tripCap}`,
                                            "truckDetail"
                                          );
                                        }}
                                      >
                                        submit
                                      </button>
                                    </div>

                                    <div>
                                      <button
                                        class="reset-button"
                                        role="button"
                                      >
                                        reset
                                      </button>
                                    </div>
                                  </div>
                                      </div>
                                    </div>
                                  </div>

                                  
                                </div>
                              </div>
                              {/* {selectedDevice &&
                                currentClickIndex === index && (
                                  <ProductCardList
                                    device={selectedDevice.data}
                                  />
                                )} */}
                            </div>
                          </div>
                        ) : item.messageType === "fuel" ? (
                          <div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <div>
                                  <img src={bot}></img>
                                </div>
                                <div>
                                  <div className="bot_text">
                                    <div
                                      key={index}
                                      className={`chat-${item.type}`}
                                    >
                                      <div>
                                        Here's a graph displaying total fuel and
                                        fuel utlization.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="t-g">
                                    <div style={{ margin: 10, width: "100%" }}>
                                      <Fuelgraph
                                        fuelCapacity={fuelCapacity}
                                        utilizedFuel={utilizedFuel}
                                      />
                                    </div>
                                    <table>
                                      <thead style={{ background: "blue" }}>
                                        <tr>
                                          <th>Date</th>
                                          <th>Start time</th>
                                          <th>End time</th>
                                          <th>Duration</th>
                                          <th>Distance travelled(Km/miles)</th>
                                          <th>Average speed(km/hr)</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {MockData.map((data, index) => (
                                          <tr key={index}>
                                            <td>{data.date}</td>
                                            <td>{data.Starttime}</td>
                                            <td>{data.Endtime}</td>
                                            <td>{data.Duration}</td>
                                            <td>{data.Distance}</td>
                                            <td>{data.AvgSpeed}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="suggest-metrics">
                                <div className="msg">
                                  do you like to look into other metrics
                                </div>

                                <div className="fuel-efficiency-container">
                                  <div className="f1">
                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on vechile fuel capacity`,
                                          "fuel-capacity"
                                        );
                                      }}
                                      className="eff-button1"
                                    >
                                      Fuel Capacity vs Utilization
                                    </button>

                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "running-time"
                                        );
                                      }}
                                      className="eff-button1"
                                    >
                                      Total running time per day
                                    </button>

                                    <button className="eff-button1">
                                      Total hrs travelled in a day
                                    </button>
                                  </div>
                                  <div className="f2">
                                    <button className="eff-button1">
                                      Idling time per day
                                    </button>
                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "pilferage"
                                        );
                                      }}

                                      className="eff-button1">
                                      Pilferage
                                    </button>

                                    <button className="eff-button1">
                                      Driver behavior alert count
                                    </button>
                                    <button className="eff-button1">
                                      Other Information
                                    </button>
                                  </div>
                                </div>

                                {/* <div className="suggest-button-container">
                                  <button
                                    onClick={() => {
                                      setIsTyping(true);
                                      submitData(
                                        `congrats your starting point${tripStart} & ending point ${tripEnd}, truck capacity ${tripCap}`,
                                        "other-metrics"
                                      );
                                    }}
                                    className="suggest-button"
                                  >
                                    yes
                                  </button>
                                  <button className="suggest-button">no</button>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        ) : item.messageType === "idiling" ? (
                          <div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <div>
                                  <img src={bot}></img>
                                </div>
                                <div>
                                  <div className="bot_text">
                                    <div
                                      key={index}
                                      className={`chat-${item.type}`}
                                    >
                                      <div>
                                        Here's a graph displaying total fuel and
                                        fuel utlization.
                                      </div>
                                    </div>
                                  </div>
                                  <div style={{ margin: 10, width: "100%" }}>
                                    <Behaviour

                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="suggest-metrics">
                                <div className="msg">
                                  do you like to look into other metrics
                                </div>

                                <div className="fuel-efficiency-container">
                                  <div className="f1">
                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on vechile fuel capacity`,
                                          "fuel-capacity"
                                        );
                                      }}
                                      className="eff-button1"
                                    >
                                      Fuel Capacity vs Utilization
                                    </button>

                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "running-time"
                                        );
                                      }}
                                      className="eff-button1"
                                    >
                                      Total running time per day
                                    </button>

                                    <button className="eff-button1">
                                      Total hrs travelled in a day
                                    </button>
                                  </div>
                                  <div className="f2">
                                    <button className="eff-button1">
                                      Idling time per day
                                    </button>

                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "idiling-time"
                                        );
                                      }}

                                      className="eff-button1">
                                      Driver behavior alert count
                                    </button>
                                    <button className="eff-button1">
                                      Other Information
                                    </button>
                                  </div>
                                </div>

                                {/* <div className="suggest-button-container">
                                  <button
                                    onClick={() => {
                                      setIsTyping(true);
                                      submitData(
                                        `congrats your starting point${tripStart} & ending point ${tripEnd}, truck capacity ${tripCap}`,
                                        "other-metrics"
                                      );
                                    }}
                                    className="suggest-button"
                                  >
                                    yes
                                  </button>
                                  <button className="suggest-button">no</button>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        ) : item.messageType === "theft" ? (
                          <div>
                            <div>
                              <div style={{ display: "flex" }}>
                                <div>
                                  <img src={bot}></img>
                                </div>
                                <div>
                                  <div className="bot_text">
                                    <div
                                      key={index}
                                      className={`chat-${item.type}`}
                                    >
                                      <div>
                                        Here's a graph displaying total fuel and
                                        fuel utlization.
                                      </div>
                                    </div>
                                  </div>

                                  <div className="t-g">
                                    <div style={{ margin: 10, width: "100%" }}>
                                      <Behaviour2
                                        fuelCapacity={fuelCapacity}
                                        utilizedFuel={utilizedFuel}
                                      />
                                    </div>
                                    <table>
                                      <thead style={{ background: "blue" }}>
                                        <tr>
                                          <th>Date</th>
                                          <th>Start time</th>
                                          <th>End time</th>
                                          <th>Duration</th>
                                          <th>Distance travelled(Km/miles)</th>
                                          <th>Average speed(km/hr)</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {MockData.map((data, index) => (
                                          <tr key={index}>
                                            <td>{data.date}</td>
                                            <td>{data.Starttime}</td>
                                            <td>{data.Endtime}</td>
                                            <td>{data.Duration}</td>
                                            <td>{data.Distance}</td>
                                            <td>{data.AvgSpeed}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="suggest-metrics">
                                <div className="msg">
                                  do you like to look into other metrics
                                </div>

                                <div className="fuel-efficiency-container">
                                  <div className="f1">
                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on vechile fuel capacity`,
                                          "fuel-capacity"
                                        );
                                      }}
                                      className="eff-button1"
                                    >
                                      Fuel Capacity vs Utilization
                                    </button>

                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "running-time"
                                        );
                                      }}
                                      className="eff-button1"
                                    >
                                      Total running time per day
                                    </button>

                                    <button className="eff-button1">
                                      Total hrs travelled in a day
                                    </button>
                                  </div>
                                  <div className="f2">
                                    <button className="eff-button1">
                                      Idling time per day
                                    </button>
                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "pilferage"
                                        );
                                      }}

                                      className="eff-button1">
                                      Pilferage
                                    </button>

                                    <button
                                      onClick={() => {
                                        setIsTyping(true);
                                        submitData(
                                          ` Can you provide insights based on total vechile running time`,
                                          "idiling-time"
                                        );
                                      }}

                                      className="eff-button1">
                                      Driver behavior alert count
                                    </button>
                                    <button className="eff-button1">
                                      Other Information
                                    </button>
                                  </div>
                                </div>

                                {/* <div className="suggest-button-container">
                                  <button
                                    onClick={() => {
                                      setIsTyping(true);
                                      submitData(
                                        `congrats your starting point${tripStart} & ending point ${tripEnd}, truck capacity ${tripCap}`,
                                        "other-metrics"
                                      );
                                    }}
                                    className="suggest-button"
                                  >
                                    yes
                                  </button>
                                  <button className="suggest-button">no</button>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        )


                          : item.messageType === "others" ? (
                            <div>
                              <div>
                                <div style={{ display: "flex" }}>
                                  <div>
                                    <img src={bot}></img>
                                  </div>
                                  <div>
                                    <div className="bot_text">
                                      <div
                                        key={index}
                                        className={`chat-${item.type}`}
                                      >
                                        <div>
                                          <div className="card-suggestion">
                                            Absolutely! Let's get started. Please
                                            select an efficiency metric you'd like
                                            to focus on:
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="efficiency-container">
                                      <button
                                        onClick={() => {
                                          setIsTyping(true);
                                          submitData(
                                            ` Can you provide insights based on vechile fuel capacity`,
                                            "fuel-capacity"
                                          );
                                        }}
                                        className="eff-button1"
                                      >
                                        Fuel Capacity vs Utilization
                                      </button>

                                      <button
                                        onClick={() => {
                                          setIsTyping(true);
                                          submitData(
                                            ` Can you provide insights based on total vechile running time`,
                                            "running-time"
                                          );
                                        }}
                                        className="eff-button1"
                                      >
                                        Total running time per day
                                      </button>

                                      <button className="eff-button1">
                                        Total hrs travelled in a day
                                      </button>

                                      <button className="eff-button1">
                                        Idling time per day
                                      </button>

                                      <button
                                        onClick={() => {
                                          setIsTyping(true);
                                          submitData(
                                            ` Can you provide insights based on total vechile running time`,
                                            "idiling-time"
                                          );
                                        }}
                                        className="eff-button1">
                                        Driver behavior alert count
                                      </button>
                                      <button className="eff-button1">
                                        Other Information
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                {/* {selectedDevice &&
                                currentClickIndex === index && (
                                  <ProductCardList
                                    device={selectedDevice.data}
                                  />
                                )} */}
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="bot_text">
                                <div key={index} className={`chat-${item.type}`}>
                                  <div>
                                    <div className="card-suggestion">
                                      {item.text}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                      </>
                    )}
                  </>
                );
              })}
              {loading && (
                <div className="bot_text">
                  <img src={bot} alt="" />
                  <div id="wave" className="chat-bot">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="list_conversation"></div>
          )}
        </div>
        <div
          className="text-outer"
          style={{
            width: isTyping ? "" : "",
          }}
        >
          <div className="textarea_container">
            <div className="input">
              {/* {defaultText && (
                <p className="default_question">{defaultText}  </p>
              )}   */}
              <input
                type="text"
                placeholder={defaultText ? "" : "Ask me anything..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setIsTyping(true);
                    sendDataToParent(true);
                    submitData(
                      defaultText ? `${defaultText} ${inputText}` : inputText
                    );
                    setDefaultText("");
                    setInputText("");
                  }
                }}
              />
            </div>
            <div className="send_button">
              <img
                className="search-icon"
                src={search}
                onClick={() => {
                  setIsTyping(true);
                  // submitData(
                  //   defaultText ? `${defaultText} ${inputText}` : inputText
                  // );

                  setDefaultText("");
                  setInputText("");
                }}
                alt=""
              />
            </div>
          </div>

          {/* <div onClick={handleButtonClicks}>
            <button class="button-43" role="button">
              Upload
            </button>

          
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
