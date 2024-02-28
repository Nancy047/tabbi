import React from "react";
import "../Analytics/trip.css";
import truck from "../../assets/Truck.png";
import cross from "../../assets/cross.svg";
import tripblack from "../../assets/tripblack.svg";
import { useState } from "react";

// import Compass from '../../Assets/Analytics.png'

const UserInput = () => {
  const [show, setshow] = useState(false);

  const handleclick = () => {
    setshow(true);
  };

  const accordionData = [
    {
      title: "CUSTOMER INFORMATION",
      devices: "6 Connected device",
      name: "Arnav Rattan (10 yrs)",
      number: "Ph no:+913553154712",
      listno: "Lis no. TN70 22022465581",
      drivername: "Arnav Rattan",
      LicenseNumber: "39775",
      driverid: "1",
      truckid: "87",
      distance: "1475.0265752106384",
      avgfuel: "4.34",
      truckcapacity: "12 ton",
      fueltype: "Petrol",
      trucklocation: "",
      availabity: "true",
      address: "18553 S Holly Ln, Oregon City, Oregon",
      status: "IN Active",
      agenttype: "Ambassador",
      cbr: "503 - 720 - 8850",
      type: "Residential",
      dtn: "1000348931",
      market: "CRIS",
      digital: "NO",
      sfaccount: "0107856",
    },
  ];
  return (
    <div className="user-container">
      <div className="analytics-header">
        <img src={tripblack}></img>
        <div className="desc-header">Vehicle Analytics</div>
      </div>
      <div style={{ color: "#454545" }}>
        Each project should have a clickable card that leads to a detailed view
        of the project.
      </div>

      <div className="userinput">
        <div className="alluser">
          <div>
            <div>Starting Point</div>
            <input
              class="input-elevated"
              type="text"
              placeholder="Enter Pickup Location"
            />
          </div>
          <div>
            <div>Ending Point</div>
            <input
              class="input-elevated"
              type="text"
              placeholder="Enter Drop Location"
            />
          </div>
          <div>
            <div>Vehicle Capacity</div>
            <input class="input-elevated" type="text" placeholder="Load" />
          </div>
          <div className="two-button">
            <div style={{ paddingTop: "24px" }}></div>
            <button className="Reset-button">Reset</button>
            <button className="Submit-button" onClick={handleclick}>
              Submit
            </button>
          </div>
        </div>
        {show && (
          <div>
            {accordionData.map((item, index) => (
              <div className="user-info">
                <div className="row" style={{ width: "100%" }}>
                  <div className="col-5" style={{ width: "35%" }}>
                    <div className="row">
                      <div
                        className="col-8 cust-info"
                        style={{ textAlign: "left" }}
                      >
                        {" "}
                        <div></div>
                        <span>
                          <p className="p-nametag">{item.name}</p>
                          <p className="p-numbertag">{item.number}</p>
                          <p className="p-addresstag">{item.address}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="linemy"></div>
                  <div className="col-7 secondary-content">
                    <div className="row">
                      <div className="col-3 status-info right-line">
                        <h className="rowinfo-header">Driver Id</h>
                        <p className="rowinfo-content" style={{}}>
                          {item.driverid}
                        </p>
                      </div>
                      <div className="col-3 agenttype-info right-line">
                        <h className="rowinfo-header">Truck Id</h>
                        <p className="rowinfo-content">{item.truckid}</p>
                      </div>
                      <div className="col-3 cbr-info right-line">
                        <h className="rowinfo-header">Distance</h>
                        <p className="rowinfo-content">{item.distance}</p>
                      </div>
                      <div className="col-3 type-info right-line">
                        <h className="rowinfo-header">Avg Fuel Consumption</h>
                        <p className="rowinfo-content">{item.avgfuel}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3 dtn-info right-line">
                        <h className="rowinfo-header">Truck Capacity</h>
                        <p className="rowinfo-content">{item.truckcapacity}</p>
                      </div>
                      <div className="col-3 market-info right-line">
                        <h className="rowinfo-header">Fuel Type</h>
                        <p className="rowinfo-content">{item.fueltype}</p>
                      </div>
                      <div className="col-3 digital-info right-line">
                        <h className="rowinfo-header">LicenseNumber</h>
                        <p className="rowinfo-content">{item.LicenseNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="recommed">
              <div>Recommended Route</div>
              <div className="recommend-card">
                <div className="recom-card">
                  <h1 className="rec-header">4 hrs (36 km)</h1>
                  <div style={{ display: "flex" }}>
                    <div>
                      <p className="p-para">Heavy traffic, as usual</p>
                      <p>This route has restricted area or road</p>
                    </div>
                    <div className="arrow-img">
                      <img src={cross} alt="logo"></img>
                    </div>
                  </div>
                </div>
                <div className="recom-card">
                  <h1 className="rec-header" style={{ color: "#F74D2F" }}>
                    4 hr 24 min (36 km)
                  </h1>
                  <div style={{ display: "flex" }}>
                    <div>
                      <p className="p-para">Heavy traffic, as usual</p>
                      <p>This route has restricted area or road</p>
                    </div>
                    <div className="arrow-img">
                      <img src={cross} alt="logo"></img>
                    </div>
                  </div>
                </div>
                <div className="recom-card">
                  <h1 className="rec-header" style={{ color: "#F74D2F" }}>
                    4 hr 40 min (36 km)
                  </h1>
                  <div style={{ display: "flex" }}>
                    <div>
                      <p className="p-para">Heavy traffic, as usual</p>
                      <p>This route has restricted area or road</p>
                    </div>
                    <div className="arrow-img">
                      <img src={cross} alt="logo"></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserInput;
