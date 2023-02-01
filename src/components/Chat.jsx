import React from "react";
import { useState, useContext, useEffect } from "react";
import "./Chat.css";
import { AuthContext } from "../context/auth.context";
import io from "socket.io-client";
import axios from "axios";
const socket = io.connect("http://localhost:5005");
const Chat = () => {
  const [message, setMessage] = useState("");
  const [list, setMessageList] = useState([]);
  const { user } = useContext(AuthContext);
  const [room, setRoom] = useState("");
  const [time, setTime] = useState("");
  const [messages, setMessages] = useState([]);
  // async so it waits for our message to be sent to update our array
  const [show, setShow] = useState(false);
  //   console.log(messages[0].message);
  const sendMessage = () => {
    if (message !== "")
      socket.emit("send_message", {
        room: "main",
        message,
        username: user.name,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      });
    console.log(room);

    setMessageList([...list, { room, message, time }]);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/chat`).then((response) => {
      setMessages(response.data.findAllofChat);
      console.log(response.data.findAllofChat);
    });
  }, []);
  useEffect(() => {
    // setRoom("main");
    // setTime(
    //   new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    // );

    socket.on("receive_message", (data) => {
      console.log(data);
      setTime(data.time);
      setMessages([...messages, data]);
      setMessageList([...list, data]);
      console.log(list);
      console.log(messages);
      //   setMessage(data.message);
    });
    console.log([...messages]);
  }, [socket]);
  console.log(list);
  console.log(socket);
  return (
    <>
      {show ? (
        <div className="chatPage">
          <div className="chatContainer">
            <div
              className="chat-header"
              onClick={() => {
                setShow(!show);
              }}
            >
              <div className="chatP">
                <p style={{ color: "white" }}>Numinous</p>
              </div>
            </div>
            <div className="chat-body">
              {messages.map((el) => {
                return (
                  <>
                    <p
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        marginLeft: "15px",
                      }}
                    >
                      {el.message}
                    </p>
                    <p
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        marginLeft: "15px",
                      }}
                    >
                      {el.username}
                    </p>
                  </>
                );
              })}
            </div>
            <div className="footerContainer">
              <div className="chat-footer">
                <input
                  type="text"
                  placeholder="Send Message..."
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                  class="sendMessage"
                />
                <button class="sendButton" onClick={sendMessage}>
                  &#9658;
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="chatPage2">
          <div
            className="chatContainer2"
            onClick={() => {
              setShow(!show);
              axios
                .get(`${process.env.REACT_APP_SERVER_URL}/chat`)
                .then((response) => {
                  setMessages(response.data.findAllofChat);
                  console.log(response.data.findAllofChat);
                });
            }}
          >
            <div className="chat-header2">
              <div className="chatP2">
                <p>Numinous</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Chat;
