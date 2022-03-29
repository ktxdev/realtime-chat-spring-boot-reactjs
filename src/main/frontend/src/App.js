import { useState } from "react";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import ChatRoom from "./ChatRoom.jsx";

let stompClient= null;

function App() {

  const [userData, setUserData] = useState({
    username: "",
    receiverName: "",
    connected: false,
    message: ""
  })

  const handleUsernameChange = ({ target }) => {
    setUserData({ ...userData, username: target.value })
  }

  const connectUser = () => {
    const sock = new SockJS("http://localhost:8080/ws");

  }

  return (
    <div>
      <ChatRoom />
    </div>
  );
}

export default App;
