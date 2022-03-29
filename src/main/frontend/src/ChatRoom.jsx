import { useState } from "react";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

let stompClient= null;

const ChatRoom = () => {

  const [userData, setUserData] = useState({
    username: "",
    receiverName: "",
    connected: false,
    message: ""
  })

  const handleUsernameChange = ({ target }) => {
    setUserData({ ...userData, username: target.value })
  }

  const connect = () => {
    const sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(sock)
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    setUserData({...userData, connected: true});
    stompClient.subscribe('/chatroom/public', onPublicMessageReceived)
    stompClient.subscribe(`/user/${userData.username}/private`, onPrivateMessageReceived)
  }

  const onPublicMessageReceived = (payload) => {
      let payloadData = JSON.parse(payload.body)
      switch(payloadData.status) {
          case "JOIN":
              break;
      }
  }

  const onPrivateMessageReceived = (payload) => {

  }

  const onError = () => {

  }

  return (
    <div className="container">
      {
        userData.connected ? <div></div>
          :
          <div className="register">
            <input
              id="user-name"
              placeholder="Enter username"
              value={userData.username}
              onChange={handleUsernameChange} />
            <button type="button" onClick={connect}>
              Connect
            </button>
          </div>
      }
    </div>
  );
}

export default ChatRoom;
