// import { useEffect, useState } from "react";
// import { getToken, onMessage } from "firebase/messaging";
// import { messaging } from "./firebase";

// function App() {
//   const [token, setToken] = useState("");
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     const unsubscribe = onMessage(
//       messaging,
//       (payload) => {
//         console.log(
//           "Foreground Message:",
//           payload
//         );

//         const title =
//           payload.notification?.title ??
//           "Amber Alert";

//         const body =
//           payload.notification?.body ??
//           "";

//         alert(`${title}\n\n${body}`);
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const enableNotifications = async () => {
//     try {
//       setStatus(
//         "Requesting notification permission..."
//       );

//       const permission =
//         await Notification.requestPermission();

//       if (permission !== "granted") {
//         setStatus(
//           "Notification permission denied"
//         );
//         return;
//       }

//       setStatus(
//         "Registering service worker..."
//       );

//       const registration =
//         await navigator.serviceWorker.register(
//           "/firebase-messaging-sw.js"
//         );

//       setStatus(
//         "Getting FCM token..."
//       );

//       const currentToken =
//         await getToken(
//           messaging,
//           {
//             vapidKey:
//               "BCAc7FMddHlq8zrCvexY7pk_2xeYiJraiDWRhq2elLAoAzrjKT-kjBBkLG7SEWKyrnRiet5Jh7fQnttE8AZMJ9M",
//             serviceWorkerRegistration:
//               registration
//           }
//         );

//       if (!currentToken) {
//         setStatus(
//           "Unable to generate token"
//         );
//         return;
//       }

//       setToken(currentToken);

//       console.log(
//         "FCM Token:",
//         currentToken
//       );

//       setStatus(
//         "Device registered successfully"
//       );

//       alert(
//         "Device registered successfully"
//       );

//       /*
//       TODO:
//       Send token to backend

//       await fetch(
//         "https://your-api/register",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type":
//               "application/json"
//           },
//           body: JSON.stringify({
//             token: currentToken
//           })
//         }
//       );
//       */
//     } catch (error) {
//       console.error(error);

//       setStatus(
//         "Registration failed"
//       );

//       alert(
//         "Registration failed. Check console."
//       );
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: 20,
//         maxWidth: 600,
//         margin: "0 auto",
//         textAlign: "center"
//       }}
//     >
//       <h1>
//         🚨 Amber Alert Admin
//       </h1>

//       <button
//         onClick={
//           enableNotifications
//         }
//       >
//         Register Device
//       </button>

//       <p>
//         <strong>Status:</strong>{" "}
//         {status}
//       </p>

//       <textarea
//         value={token}
//         rows={10}
//         readOnly
//         style={{
//           width: "100%"
//         }}
//       />
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import {
  getToken,
  onMessage,
} from "firebase/messaging";
import { messaging } from "./firebase";

const VAPID_KEY =
  "BCAc7FMddHlq8zrCvexY7pk_2xeYiJraiDWRhq2elLAoAzrjKT-kjBBkLG7SEWKyrnRiet5Jh7fQnttE8AZMJ9M";

function App() {
  const [token, setToken] =
    useState("");

  const [status, setStatus] =
    useState("Initializing...");

  useEffect(() => {
    registerDevice();

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

    return () => unsubscribe();
  }, []);

  const registerDevice =
    async (): Promise<void> => {
      try {
        const existingToken =
          localStorage.getItem(
            "amber_fcm_token"
          );

        if (existingToken) {
          setToken(existingToken);

          setStatus(
            "Device already registered"
          );

          return;
        }

        let permission:
          | "default"
          | "granted"
          | "denied" =
          Notification.permission;

        if (
          permission !== "granted"
        ) {
          permission =
            await Notification.requestPermission();
        }

        if (
          permission !== "granted"
        ) {
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
                VAPID_KEY,
              serviceWorkerRegistration:
                registration,
            }
          );

        if (!currentToken) {
          setStatus(
            "Unable to generate token"
          );

          return;
        }

        localStorage.setItem(
          "amber_fcm_token",
          currentToken
        );

        setToken(currentToken);

        console.log(
          "FCM Token:",
          currentToken
        );

        setStatus(
          "Device registered successfully"
        );

        /*
        Future:
        Send token to backend

        await fetch(
          "/api/register-device",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              token:
                currentToken,
            }),
          }
        );
        */
      } catch (error) {
        console.error(
          "Registration Error:",
          error
        );

        setStatus(
          "Registration failed"
        );
      }
    };

  const clearRegistration =
    () => {
      localStorage.removeItem(
        "amber_fcm_token"
      );

      setToken("");

      setStatus(
        "Registration cleared"
      );
    };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "700px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1>
        🚨 Amber Alert Admin
      </h1>

      <p>
        <strong>Status:</strong>{" "}
        {status}
      </p>

      <button
        onClick={
          clearRegistration
        }
      >
        Clear Registration
      </button>

      <br />
      <br />

      <textarea
        value={token}
        rows={8}
        readOnly
        style={{
          width: "100%",
        }}
      />
    </div>
  );
}

export default App;