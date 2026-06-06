import { useState } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

function App() {

  const [token, setToken] = useState("");

  const enableNotifications = async () => {

    const permission =
      await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Notification permission denied");
      return;
    }

    const currentToken = await getToken(
      messaging,
      {
        vapidKey:
          "BCAc7FMddHlq8zrCvexY7pk_2xeYiJraiDWRhq2elLAoAzrjKT-kjBBkLG7SEWKyrnRiet5Jh7fQnttE8AZMJ9M"
      }
    );

    console.log(currentToken);

    setToken(currentToken);

    alert("Device Registered");
  };

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 500,
        margin: "0 auto"
      }}
    >
      <h1>🚨 Amber Alert Admin</h1>

      <button
        onClick={enableNotifications}
      >
        Register Device
      </button>

      <br />
      <br />

      <textarea
        value={token}
        rows={10}
        style={{
          width: "100%"
        }}
        readOnly
      />
    </div>
  );
}

export default App;