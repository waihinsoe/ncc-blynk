import { useState, useEffect } from "react";
import "./App.css";
import { Switch } from "antd";
import { config } from "./config/config";

const App = () => {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  useEffect(() => {
    const websocket = new WebSocket(config.apiBaseUrl);
    websocket.onmessage = (event) => {
      const data = event.data;

      // Handle Blob data appropriately
      if (data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result;
          const lightStatus = JSON.parse(text as string);
          setStatus(lightStatus.status);
          setMessage(text as string);
        };
        reader.readAsText(data);
      } else {
        setMessage(data);
      }
    };

    setWs(websocket);

    // Cleanup function
    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ status: checked }));
    }
    setStatus(!status);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React WebSocket Client</h1>
        <Switch checked={status} onChange={onChange} />
        <p>Received Message: {message}</p>
      </header>
    </div>
  );
};

export default App;
