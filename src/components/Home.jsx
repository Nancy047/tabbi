import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "../components/Sidebar";
import Chat from "./Chat";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const Home = ({ senddatatomain }) => {
  const [conversation, setConversation] = useState([]);
  const [webSocket, setWebSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataFromChild, setDataFromChild] = useState(null);

  const [allData, setAllData] = useState([
    {
      title: "Part Number",
      question: ["test"],
      answer: ["test"],
    },
  ]);
  const [currentData, setCurrentData] = useState({});
  useEffect(() => {
    if (webSocket) {
      return;
    }
    const socket = new W3CWebSocket("ws://34.31.101.6:8762/");
    socket.onopen = function (event) {
      console.log('Connected to server. Start chatting! Type "quit" to exit.');
      setWebSocket(socket);
    };

    socket.onmessage = function (event) {
      const message = event.data;
      handleUserInput(message);
    };

    socket.onerror = function (error) {
      console.error("WebSocket error:", error);
    };

    socket.onclose = function (event) {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (webSocket) {
        socket.close();
        setWebSocket();
      }
    };
  }, [webSocket]);

  useEffect(() => {
    console.log("con ", conversation);
  }, [conversation]);

  const handleUserInput = (data) => {
    setConversation((prev) => [
      ...prev,
      {
        type: "bot",
        text: data,
      },
    ]);
    setLoading(false);
  };

  const handleSendMessage = (message, truckD) => {
    console.log("comeHere", message);

    if (truckD && truckD === "truckDetail") {
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            text: message,
            messageType: "truckDetail",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (message?.toLowerCase() === "trip analytics") {
      console.log("dadad", message);
      setConversation((prev) => [
        ...prev,
        {
          type: "user",
          text: message,
        },
      ]);
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            text: "",
            messageType: "customMessage0",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (message?.toLowerCase() === "trip-yes") {
      console.log("dadad", message);

      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            text: "",
            messageType: "customMessage0",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (message?.toLowerCase() === "efficiency metrics") {
      console.log("dadad", message);
      setConversation((prev) => [
        ...prev,
        {
          type: "user",
          text: message,
        },
      ]);
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            text: "",
            messageType: "id-ask",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (message?.toLowerCase() === "dl-2922") {
      console.log("dadad", message);
      setConversation((prev) => [
        ...prev,
        {
          type: "user",
          text: message,
        },
      ]);
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            text: "",
            messageType: "metrics",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (truckD && truckD === "running-time") {
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "user",
            text: message,
            messageType: "",
          },
          {
            type: "bot",
            text: "",
            messageType: "running-time",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (truckD && truckD === "fuel-capacity") {
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "user",
            text: message,
            messageType: "",
          },
          {
            type: "bot",
            text: "",
            messageType: "fuel",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (truckD && truckD === "idiling-time") {
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "user",
            text: message,
            messageType: "",
          },
          {
            type: "bot",
            text: "",
            messageType: "idiling",
          },
        ]);
        setLoading(false);
      }, 2000);
    }

    else if (truckD && truckD === "pilferage") {
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "user",
            text: message,
            messageType: "",
          },
          {
            type: "bot",
            text: "",
            messageType: "theft",
          },
        ]);
        setLoading(false);
      }, 2000);
    }
    
    else if (truckD && truckD === "mapdetails") {
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,

          {
            type: "bot",
            text: "",
            messageType: "mapdetails",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (truckD && truckD === "trip-yes") {
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,

          {
            type: "bot",
            text: "",
            messageType: "end",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (truckD && truckD === "trip-no") {
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,

          {
            type: "bot",
            text: "",
            messageType: "no",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (truckD && truckD === "other-metrics") {
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "user",
            text: message,
            messageType: "",
          },
          {
            type: "bot",
            text: "",
            messageType: "others",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (truckD && truckD === "driverdetail") {
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "user",
            text: message,
            messageType: "driverdetail",
          },

          {
            type: "bot",
            text: "",
            messageType: "driverdetailDropdown",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (truckD && truckD === "recommand-trucks") {
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            text: message,
            messageType: "recommand-trucks",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (
      message.toLowerCase() === "mat code" ||
      message.toLowerCase().includes("Trip analytics")
    ) {
      setConversation((prev) => [
        ...prev,
        {
          type: "user",
          text: message,
        },
      ]);
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            text: "",
            messageType: "customMessage",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (
      message
        .toLowerCase()
        .includes(
          "Planning a trip from Chennai to Mumbai. Can you estimate the fuel consumption for the journey?"
        )
    ) {
      console.log("part", message);
      setConversation((prev) => [
        ...prev,
        {
          type: "user",
          text: message,
        },
      ]);
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Planning a trip from Chennai to Mumbai. Can you estimate the fuel consumption for the journey?",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else if (message === "Corning and Commscope") {
      console.log("dadad", message);
      setConversation((prev) => [
        ...prev,
        {
          type: "user",
          text: message,
        },
      ]);
      setLoading(true);
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            text: "",
            messageType: "customMessage2",
          },
        ]);
        setLoading(false);
      }, 2000);
    } else {
      console.log("dass", message);
      if (
        webSocket &&
        webSocket.readyState === WebSocket.OPEN &&
        message.trim() !== ""
      ) {
        if (conversation.length === 0) {
          console.log(message, conversation);
          webSocket.send(new Date().valueOf());
        }
        webSocket.send(message);
        if (message.toLowerCase() === "quit") {
          webSocket.close();
        } else {
          setConversation((prev) => [
            ...prev,
            {
              type: "user",
              text: message,
            },
          ]);
        }
        setLoading(true);
      } else {
        setConversation((prev) => [
          ...prev,
          {
            type: "user",
            text: message,
          },
        ]);
        setLoading(true);
        setTimeout(() => {
          setConversation((prev) => [
            ...prev,
            {
              type: "bot",
              text: "Connetion Issue",
            },
          ]);
          setLoading(false);
        }, 2000);
      }
    }
  };

  const handleChildData = (data) => {
    setDataFromChild(data);
    senddatatomain(data);
    console.log(data, "recievcechild");
  };

  return (
    <>
      <Chat
        submitData={handleSendMessage}
        loading={loading}
        data={currentData}
        listData={conversation}
        onDataFromChild={handleChildData}
      />
    </>
  );
};
export default Home;
