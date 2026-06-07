// // import { useEffect, useState } from "react";
// // import { getToken, onMessage } from "firebase/messaging";
// // import { messaging } from "./firebase";

// // function App() {
// //   const [token, setToken] = useState("");
// //   const [status, setStatus] = useState("");

// //   useEffect(() => {
// //     const unsubscribe = onMessage(
// //       messaging,
// //       (payload) => {
// //         console.log(
// //           "Foreground Message:",
// //           payload
// //         );

// //         const title =
// //           payload.notification?.title ??
// //           "Amber Alert";

// //         const body =
// //           payload.notification?.body ??
// //           "";

// //         alert(`${title}\n\n${body}`);
// //       }
// //     );

// //     return () => {
// //       unsubscribe();
// //     };
// //   }, []);

// //   const enableNotifications = async () => {
// //     try {
// //       setStatus(
// //         "Requesting notification permission..."
// //       );

// //       const permission =
// //         await Notification.requestPermission();

// //       if (permission !== "granted") {
// //         setStatus(
// //           "Notification permission denied"
// //         );
// //         return;
// //       }

// //       setStatus(
// //         "Registering service worker..."
// //       );

// //       const registration =
// //         await navigator.serviceWorker.register(
// //           "/firebase-messaging-sw.js"
// //         );

// //       setStatus(
// //         "Getting FCM token..."
// //       );

// //       const currentToken =
// //         await getToken(
// //           messaging,
// //           {
// //             vapidKey:
// //               "BCAc7FMddHlq8zrCvexY7pk_2xeYiJraiDWRhq2elLAoAzrjKT-kjBBkLG7SEWKyrnRiet5Jh7fQnttE8AZMJ9M",
// //             serviceWorkerRegistration:
// //               registration
// //           }
// //         );

// //       if (!currentToken) {
// //         setStatus(
// //           "Unable to generate token"
// //         );
// //         return;
// //       }

// //       setToken(currentToken);

// //       console.log(
// //         "FCM Token:",
// //         currentToken
// //       );

// //       setStatus(
// //         "Device registered successfully"
// //       );

// //       alert(
// //         "Device registered successfully"
// //       );

// //       /*
// //       TODO:
// //       Send token to backend

// //       await fetch(
// //         "https://your-api/register",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type":
// //               "application/json"
// //           },
// //           body: JSON.stringify({
// //             token: currentToken
// //           })
// //         }
// //       );
// //       */
// //     } catch (error) {
// //       console.error(error);

// //       setStatus(
// //         "Registration failed"
// //       );

// //       alert(
// //         "Registration failed. Check console."
// //       );
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         padding: 20,
// //         maxWidth: 600,
// //         margin: "0 auto",
// //         textAlign: "center"
// //       }}
// //     >
// //       <h1>
// //         🚨 Amber Alert Admin
// //       </h1>

// //       <button
// //         onClick={
// //           enableNotifications
// //         }
// //       >
// //         Register Device
// //       </button>

// //       <p>
// //         <strong>Status:</strong>{" "}
// //         {status}
// //       </p>

// //       <textarea
// //         value={token}
// //         rows={10}
// //         readOnly
// //         style={{
// //           width: "100%"
// //         }}
// //       />
// //     </div>
// //   );
// // }

// // export default App;
// import { useEffect, useState } from "react";
// import {
//   getToken,
//   onMessage,
// } from "firebase/messaging";
// import { messaging } from "./firebase";

// const VAPID_KEY =
//   "BCAc7FMddHlq8zrCvexY7pk_2xeYiJraiDWRhq2elLAoAzrjKT-kjBBkLG7SEWKyrnRiet5Jh7fQnttE8AZMJ9M";

// function App() {
//   const [token, setToken] =
//     useState("");

//   const [status, setStatus] =
//     useState("Initializing...");

//   useEffect(() => {
//     registerDevice();

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

//     return () => unsubscribe();
//   }, []);

//   const registerDevice =
//     async (): Promise<void> => {
//       try {
//         const existingToken =
//           localStorage.getItem(
//             "amber_fcm_token"
//           );

//         if (existingToken) {
//           setToken(existingToken);

//           setStatus(
//             "Device already registered"
//           );

//           return;
//         }

//         let permission:
//           | "default"
//           | "granted"
//           | "denied" =
//           Notification.permission;

//         if (
//           permission !== "granted"
//         ) {
//           permission =
//             await Notification.requestPermission();
//         }

//         if (
//           permission !== "granted"
//         ) {
//           setStatus(
//             "Notification permission denied"
//           );

//           return;
//         }

//         setStatus(
//           "Registering service worker..."
//         );

//         const registration =
//           await navigator.serviceWorker.register(
//             "/firebase-messaging-sw.js"
//           );

//         setStatus(
//           "Getting FCM token..."
//         );

//         const currentToken =
//           await getToken(
//             messaging,
//             {
//               vapidKey:
//                 VAPID_KEY,
//               serviceWorkerRegistration:
//                 registration,
//             }
//           );

//         if (!currentToken) {
//           setStatus(
//             "Unable to generate token"
//           );

//           return;
//         }

//         localStorage.setItem(
//           "amber_fcm_token",
//           currentToken
//         );

//         setToken(currentToken);

//         console.log(
//           "FCM Token:",
//           currentToken
//         );

//         setStatus(
//           "Device registered successfully"
//         );

//         /*
//         Future:
//         Send token to backend

//         await fetch(
//           "/api/register-device",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type":
//                 "application/json",
//             },
//             body: JSON.stringify({
//               token:
//                 currentToken,
//             }),
//           }
//         );
//         */
//       } catch (error) {
//         console.error(
//           "Registration Error:",
//           error
//         );

//         setStatus(
//           "Registration failed"
//         );
//       }
//     };

//   const clearRegistration =
//     () => {
//       localStorage.removeItem(
//         "amber_fcm_token"
//       );

//       setToken("");

//       setStatus(
//         "Registration cleared"
//       );
//     };

//   return (
//     <div
//       style={{
//         padding: "20px",
//         maxWidth: "700px",
//         margin: "0 auto",
//         textAlign: "center",
//       }}
//     >
//       <h1>
//         🚨 Emergency Alert System
//       </h1>

//       <p>
//         <strong>Status:</strong>{" "}
//         {status}
//       </p>

//       <button
//         onClick={
//           clearRegistration
//         }
//       >
//         Clear Registration
//       </button>

//       <br />
//       <br />

//       <textarea
//         value={token}
//         rows={8}
//         readOnly
//         style={{
//           width: "100%",
//         }}
//       />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  getToken,
  onMessage,
} from "firebase/messaging";
import { messaging } from "./firebase";

const VAPID_KEY =
  "BCAc7FMddHlq8zrCvexY7pk_2xeYiJraiDWRhq2elLAoAzrjKT-kjBBkLG7SEWKyrnRiet5Jh7fQnttE8AZMJ9M";

function App() {
  const [status, setStatus] =
    useState("Initializing...");

  const [alertData, setAlertData] =
    useState({
      title: "No Active Alert",
      message:
        "Waiting for alerts..."
    });

  useEffect(() => {
    const savedAlert =
      localStorage.getItem(
        "latestAlert"
      );

    if (savedAlert) {
      setAlertData(
        JSON.parse(savedAlert)
      );
    }

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

        const message =
          payload.notification?.body ??
          "";

        setAlertData({
          title,
          message,
        });

        localStorage.setItem(
          "latestAlert",
          JSON.stringify({
            title,
            message,
          })
        );

        alert(
          `${title}\n\n${message}`
        );
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
          setStatus(
            "✓ Device Registered"
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
            "Notification Permission Denied"
          );
          return;
        }

        const registration =
          await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
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
            "Unable to Register Device"
          );
          return;
        }

        localStorage.setItem(
          "amber_fcm_token",
          currentToken
        );

        setStatus(
          "✓ Device Registered"
        );
      } catch (error) {
        console.error(error);

        setStatus(
          "Registration Failed"
        );
      }
    };

  const clearRegistration =
    () => {
      localStorage.removeItem(
        "amber_fcm_token"
      );

      localStorage.removeItem(
        "latestAlert"
      );

      setStatus(
        "Registration Cleared"
      );

      setAlertData({
        title: "No Active Alert",
        message:
          "Waiting for alerts...",
      });
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "#f4f6f9",
        padding: "20px",
        fontFamily:
          "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background:
              "#ffffff",
            borderRadius:
              "16px",
            padding: "24px",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              margin: 0,
              color:
                "#d32f2f",
              fontSize:
                "28px",
            }}
          >
            🚨 AMBER ALERT
            NIGERIA
          </h1>

          <p
            style={{
              color:
                "#666",
              fontSize:
                "14px",
            }}
          >
            National Child
            Recovery &
            Emergency
            Notification
            System
          </p>

          <div
            style={{
              marginTop:
                "20px",
              padding:
                "16px",
              background:
                "#f8fafc",
              borderRadius:
                "12px",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                fontSize:
                  "18px",
              }}
            >
              Device Status
            </h3>

            <p
              style={{
                color:
                  "#2e7d32",
                fontWeight:
                  600,
              }}
            >
              {status}
            </p>
          </div>

          <div
            style={{
              marginTop:
                "20px",
              padding:
                "16px",
              background:
                "#fff5f5",
              border:
                "1px solid #ffcdd2",
              borderRadius:
                "12px",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color:
                  "#d32f2f",
              }}
            >
              ACTIVE ALERT
            </h3>

            <p
              style={{
                fontWeight:
                  "bold",
                fontSize:
                  "18px",
              }}
            >
              {
                alertData.title
              }
            </p>

            <p>
              {
                alertData.message
              }
            </p>
          </div>

          <button
            onClick={
              clearRegistration
            }
            style={{
              marginTop:
                "20px",
              width: "100%",
              padding:
                "12px",
              border: "none",
              borderRadius:
                "10px",
              background:
                "#d32f2f",
              color:
                "white",
              cursor:
                "pointer",
            }}
          >
            Reset
            Registration
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;