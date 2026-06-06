import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

function App() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const unsubscribe = onMessage(
      messaging,
      (payload) => {
        console.log(
          "Foreground Message:",
          payload
        );

        const title =
          payload.notification?.title ??
          "Amber Alert";

        const body =
          payload.notification?.body ??
          "";

        alert(`${title}\n\n${body}`);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const enableNotifications = async () => {
    try {
      setStatus(
        "Requesting notification permission..."
      );

      const permission =
        await Notification.requestPermission();

      if (permission !== "granted") {
        setStatus(
          "Notification permission denied"
        );
        return;
      }

      setStatus(
        "Registering service worker..."
      );

      const registration =
        await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );

      setStatus(
        "Getting FCM token..."
      );

      const currentToken =
        await getToken(
          messaging,
          {
            vapidKey:
              "BCAc7FMddHlq8zrCvexY7pk_2xeYiJraiDWRhq2elLAoAzrjKT-kjBBkLG7SEWKyrnRiet5Jh7fQnttE8AZMJ9M",
            serviceWorkerRegistration:
              registration
          }
        );

      if (!currentToken) {
        setStatus(
          "Unable to generate token"
        );
        return;
      }

      setToken(currentToken);

      console.log(
        "FCM Token:",
        currentToken
      );

      setStatus(
        "Device registered successfully"
      );

      alert(
        "Device registered successfully"
      );

      /*
      TODO:
      Send token to backend

      await fetch(
        "https://your-api/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            token: currentToken
          })
        }
      );
      */
    } catch (error) {
      console.error(error);

      setStatus(
        "Registration failed"
      );

      alert(
        "Registration failed. Check console."
      );
    }
  };

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 600,
        margin: "0 auto",
        textAlign: "center"
      }}
    >
      <h1>
        🚨 Amber Alert Admin
      </h1>

      <button
        onClick={
          enableNotifications
        }
      >
        Register Device
      </button>

      <p>
        <strong>Status:</strong>{" "}
        {status}
      </p>

      <textarea
        value={token}
        rows={10}
        readOnly
        style={{
          width: "100%"
        }}
      />
    </div>
  );
}

export default App;