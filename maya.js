(function () {
  // Load Tailwind CSS
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css";
  document.head.appendChild(link);

  // Creation of modal HTML
  var modalHtml = `
    <style>

      :root {
        --color-blue: #0050ff;
        --color-white: #ffffff;
        --color-gray: #e5e7eb;
        --color-dark: #242426;
        --color-secondary: #2d2d2f;
        --color-light-border: rgba(0, 0, 255, 0.44);
        --color-light-ring: rgba(0, 80, 255, 0.2);
      }

      .btnOpen {
        background: var(--color-blue);
        color: var(--color-white);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        bottom: 4rem;
        right: 4rem;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
        line-height: 60px;
        font-size: 24px;
        transition: box-shadow 0.3s ease;
      }

      .btnOpen:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
      }

      .btnOpen img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .hidden {
        display: none !important;
      }
      
      .model-container {
        background: red;
      }

      .modal-content {
        position: relative;
        overflow-y: auto;
        height: 470px;
        width: 400px;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        background-color: var(--color-white);
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.5);
        overflow: hidden;
        border-radius: 1rem;
      }

      .modal-nav {
        padding: 0.45rem .8rem;
        background-color: var(--color-white);
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        height: fit-content;
      }

      .nav-left {
        display: flex;
        align-items: center;
        gap: 0.45rem;
      }

      .nav-img {
        width: 2rem;
        height: 2rem;
        object-fit: cover;
        border: 0.125rem solid var(--color-blue);
        border-radius: 50%;
      }

      .nav-title {
        display: flex;
        align-items: center;
        color: var(--color-dark);
        font-size: .8rem;
        font-family: 'Rubik', sans-serif;
        font-weight: 500;
      }

      .nav-status {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: var(--color-blue);
        margin-left: 0.375rem;
      }

      .nav-icon {
        font-size: 1.25rem;
        color: var(--color-dark);
        cursor: pointer;
      }

      .modal-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        overflow: auto;
      }

      .modal-image {
        height: 15rem;
        position: static;
      }

      .body-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: right top;
        border-radius: 0.5rem;
      }

      .modal-messages {
        overflow: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .message {
        display: flex;
        gap: 0.75rem;
        padding: 0.7rem;
        border-radius: 1.5rem .4rem 1.5rem 0;
      }

      .message-left {
        background-color: var(--color-gray);
      }

      .message-right {
        background-color: var(--color-blue);
      }

      .message-img {
        width: 1.5rem;
        height: 1.5rem;
        object-fit: cover;
        border-radius: 50%;
        border: 0.125rem solid var(--color-blue);
      }

      .message-text {
        font-size: 0.875rem;
        color: var(--color-dark);
        text-align: left;
      }

      .message-text-right {
        color: var(--color-white);
      }

      .modal-footer {
        padding: 0.75rem 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        border-top: 0.125rem solid var(--color-gray);
        height: fit-content;
        margin-top: auto;
      }

      .footer-icon {
        font-size: 1.25rem;
        color: var(--color-blue);
        cursor: pointer;
      }

      .footer-input {
        width: 100%;
        background-color: var(--color-gray);
        border-radius: 1.5rem;
        padding: 0.625rem 1rem;
        outline: none;
        font-size: 0.875rem;
        color: var(--color-secondary);
      }
    </style>
    <div id="app" class="p-4">
      <button class="btnOpen hidden" id="open-modal">
        <img src="https://res.cloudinary.com/cctlf-org/image/upload/v1721161715/maya-icon_hnxje6.png" alt="Maya" />
      </button>
    </div>
      <div class="modal-container">
        <div class="modal-center">
          <div class="modal-content" onclick="event.stopPropagation();">
            <nav class="modal-nav">
              <div class="nav-left">
                <img src="https://app.myaisells.com/assets/mayaframe.png" alt="Maya" class="nav-img">
                <div class="nav-title">
                  Maya AI
                  <span class="nav-status"></span>
                </div>
              </div>
              <ion-icon name="close" id="closeBtn" class="nav-icon"></ion-icon>
            </nav>
            <div class="modal-body">
              <div class="modal-image">
                <video
                  id='videoPlayer'
                  class='w-full h-full rounded-lg modal-video body-img'
                  autoplay
                  playsinline
                ></video>
                <img
                  id='placeholderImage'
                  class='w-full h-full rounded-lg modal-video body-img'
                  src='https://app.myaisells.com/assets/mayaframe.png'
                  alt='Video Placeholder'
                  style='display: none;'
                />
              </div>
              <div class="modal-messages" id="messageContainer">
                <!-- Messages will be dynamically added here -->
              </div>
            </div>
            <div class="modal-footer">
              <ion-icon name="mic" class="footer-icon" id="startListeningBtn"></ion-icon>
              <input type="text" name="message" class="footer-input" id="messageInput" placeholder="Aa">
              <ion-icon name="send" class="footer-icon" id="sendBtn"></ion-icon>
            </div>
          </div>
        </div>
      </div>


  `;

  // Inject the modal HTML into the document
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Load Ionicons
  var scriptModule = document.createElement("script");
  scriptModule.type = "module";
  scriptModule.src =
    "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
  document.body.appendChild(scriptModule);

  var scriptNoModule = document.createElement("script");
  scriptNoModule.noModule = true;
  scriptNoModule.src =
    "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
  document.body.appendChild(scriptNoModule);

  document.addEventListener("DOMContentLoaded", function () {
    // States
    const DID_API_KEY =
      "ZGV2ZWxvcG1lbnRAbXlhaXJvYm90aWNzLmNvbQ:zn-SRq3ykjKaqeboAjI-F";

    // Chat Maya States
    const openModalButton = document.querySelector(".btnOpen");
    const widgetContainer = document.querySelector(".modal-container");
    const closeBtn = document.getElementById("closeBtn");
    const sendBtn = document.getElementById("sendBtn");
    const messageInput = document.getElementById("messageInput");
    const startListeningBtn = document.getElementById("startListeningBtn");
    const messageContainer = document.getElementById("messageContainer");
    const streamVideoElement = document.getElementById("videoPlayer");
    const placeholderImage = document.getElementById("placeholderImage");

    let inputText = "";
    let streamId = null;
    let sessionId = null;
    let offer = null;
    let iceServers = null;
    let peerConnection = null;
    let streamVideoOpacity = 0;
    let videoStream = null;
    let previousInputText = inputText;
    let timerRef = null;
    let reminderCount = 0;
    let sessionExpired = false;

    let oldMessages = [];
    let isListening = false;
    let recognition;
    let pauseTimeoutRef = null;
    let chat_id;
    // const url = "https://mayaaibe.azurewebsites.net/api";
    const url = "https://maya-node-ai-sales-backend.onrender.com/api/v1";
    const mayaImg = "https://app.myaisells.com/assets/mayaframe.png";

    const token = JSON.parse(localStorage.getItem("data"))?.token;
    const token2 = "mLF8*\$4LwRfEzDYyDi!_0w";
    const bucket = JSON.parse(localStorage.getItem("data"))?.bucket;

    function onVideoStatusChange(videoIsPlaying, stream) {
      console.log(
        "StreamVideoElement from on video status change ",
        streamVideoElement.srcObject
      );

      if (videoIsPlaying) {
        streamVideoOpacity = 1;
        videoStream = stream;
        streamVideoElement.style.opacity = streamVideoOpacity;
        placeholderImage.style.display = "none";
        streamVideoElement.style.display = "block";

        if (streamVideoElement.srcObject !== stream) {
          streamVideoElement.srcObject = stream;
        }
        streamVideoElement.play();
      } else {
        streamVideoOpacity = 0;
        streamVideoElement.style.opacity = streamVideoOpacity;
        placeholderImage.style.display = "block";
        streamVideoElement.style.display = "none";

        if (streamVideoElement.srcObject) {
          streamVideoElement.srcObject.getTracks().forEach((track) => {
            track.stop();
          });
          streamVideoElement.srcObject = null;
        }
      }
    }

    // Function to create a new stream
    async function createStream() {
      try {
        const response = await fetch("https://api.d-id.com/talks/streams", {
          method: "POST",
          headers: {
            Authorization: `Basic ${DID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_url: mayaImg,
          }),
        });
        const data = await response.json();
        streamId = data.id;
        sessionId = data.session_id;
        offer = new RTCSessionDescription(data.offer);
        iceServers = data.ice_servers;

        createPeerConnection();
      } catch (error) {
        console.error("Error creating stream:", error);
      }
    }

    // Function to send answer to the remote peer
    async function sendAnswer(answer) {
      try {
        if (!sessionId) {
          console.warn("No valid session ID found. Cannot send answer.");
          return;
        }
        await fetch(`https://api.d-id.com/talks/streams/${streamId}/sdp`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${DID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answer: answer,
            session_id: sessionId,
          }),
        });
      } catch (error) {
        console.error("Error sending answer:", error);
      }
    }

    // Initial UI setup
    const initialSetup = () => {
      if (videoStream) {
        streamVideoElement.style.opacity = streamVideoOpacity;
        streamVideoElement.style.display = "block";
        placeholderImage.style.display = "none";
      } else {
        streamVideoElement.style.display = "none";
        placeholderImage.style.display = "block";
      }
    };

    const handleTrackEvent = (event) => {
      if (!event.track) return;
      let lastBytesReceived;
      setInterval(async () => {
        let stats;
        try {
          stats = await peerConnection?.getStats(event.track);
        } catch (error) {
          stats = undefined;
        }
        if (stats === undefined) {
          return;
        }
        stats.forEach((report) => {
          if (report.type === "inbound-rtp" && report.mediaType === "video") {
            const videoStatusChanged = report.bytesReceived > lastBytesReceived;
            if (videoStatusChanged) {
              onVideoStatusChange(
                report.bytesReceived > lastBytesReceived,
                event.streams[0]
              );
            }
            lastBytesReceived = report.bytesReceived;
          }
        });
      }, 500);
    };

    // Function to create a peer connection
    async function createPeerConnection() {
      try {
        if (!sessionId) {
          console.warn(
            "No valid session ID found. Cannot create peer connection."
          );
          return;
        }

        if (offer !== null && iceServers !== null) {
          peerConnection = new RTCPeerConnection({ iceServers });

          peerConnection.onicecandidate = handleIceCandidate;
          console.log("Peer Connection: " + peerConnection);
          peerConnection.ontrack = handleTrackEvent;

          await peerConnection.setRemoteDescription(offer);
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);

          await sendAnswer(answer);

          console.log("createPeerConnection function");
        }
      } catch (error) {
        console.error("Error creating peer connection:", error);
      }
    }

    // Function to handle ICE candidates
    async function handleIceCandidate(event) {
      try {
        if (!sessionId) {
          console.warn(
            "No valid session ID found. Cannot handle ICE candidate."
          );
          return;
        }
        if (event.candidate) {
          const response = await fetch(
            `https://api.d-id.com/talks/streams/${streamId}/ice`,
            {
              method: "POST",
              headers: {
                Authorization: `Basic ${DID_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex,
                session_id: sessionId,
              }),
            }
          );
          if (!response.ok) {
            throw new Error(
              `Failed to send ICE candidate: ${response.statusText}`
            );
          }
        }
      } catch (error) {
        console.error("Error handling ICE candidate:", error);
      }
    }

    // Function to start the stream with the given message
    async function startStream(message) {
      try {
        if (sessionId === null) {
          console.warn("No valid session ID found. Cannot start stream.");
          return;
        }

        await fetch(`https://api.d-id.com/talks/streams/${streamId}`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${DID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            script: {
              type: "text",
              input: message,
              provider: {
                type: "microsoft",
                voice_id: "en-US-JennyNeural",
              },
              pad_audio: 0.5,
            },
            config: {
              stitch: true,
            },
            session_id: sessionId,
          }),
        });
        previousInputText = inputText;
      } catch (error) {
        console.error("Error starting stream:", error);
      }
    }

    // Function to send a reminder message
    function sendReminder() {
      if (inputText === previousInputText && reminderCount < 3) {
        startStream("Hey, are you still active?");
        reminderCount += 1;
      }
    }

    // Function to send session expired alert
    function sendSessionExpiredAlert() {
      startStream("Session expired. Please refresh to continue.");
      sessionExpired = true;
    }

    // Function to start or restart the timer
    function startTimer() {
      if (timerRef) {
        clearTimeout(timerRef);
      }
      let elapsedTime = 0;
      const timerCallback = () => {
        elapsedTime += 1;
        if (elapsedTime === 120) {
          if (inputText === previousInputText) {
            sendReminder();
          }
        }
        if (elapsedTime === 170) {
          sendSessionExpiredAlert();
          return;
        }
        timerRef = setTimeout(timerCallback, 1000);
      };
      timerRef = setTimeout(timerCallback, 1000);
    }

    // Start or restart the stream based on inputText changes
    // if (inputText.trim()) {
    //   startStream(inputText);
    // }

    // if (inputText !== previousInputText) {
    //   createStream();
    //   clearTimeout(timerRef);
    //   reminderCount = 0;
    //   sessionExpired = false;
    //   startTimer();
    // }

    // Cleanup function for peer connection and timers
    window.addEventListener("beforeunload", () => {
      console.log("Clean up");
      if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
      }
      clearTimeout(timerRef);
    });

    async function getMessages() {
      try {
        const response = await fetch(
          `${url}/ai/buckets/${bucket}/conversations/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        const data = await response.json();

        chat_id = data.chat_id ? data.chat_id : null;
        oldMessages = data?.messages.reverse();
        updateMessageContainer();
      } catch (error) {
        console.log(error);
      }
    }

    //   async function sendMessage(msg) {
    //     try {
    //       let userMessage = { by: "OW", message: msg };

    //       // Clear input state
    //       messageInput.value = "";

    //       // Display user message immediately
    //       oldMessages.length === 2 && oldMessages.shift();

    //       oldMessages.push(userMessage);
    //       updateMessageContainer();

    //       const payload = chat_id
    //         ? { input: msg, chat_id }
    //         : { input: msg };

    //       const response = await fetch(
    //         `${url}/ai/buckets/${bucket}/conversations`,
    //         {
    //           method: "POST",
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify(payload),
    //         }
    //       );

    //       const data = await response.json();
    //       console.log("Data: ", data)

    //       const eventSource = new EventSource(
    //         `${url}/bucket/sse_customer/${data.id}/`
    //       );

    //       let streamMessage = "";
    //       eventSource.onmessage = function (event) {
    //         const msg = JSON.parse(event.data);

    //         if (
    //           msg.data === "BMASTEREXECFINISHED" ||
    //           msg.data === "BMASTEREXECERROR"
    //         ) {
    //           eventSource.close();
    //           let mic = localStorage.getItem("mic");
    //           console.log(mic);
    //           if (mic === "on") {
    //             startListening();
    //           }

    //           setTimeout(() => {
    //             // Update the last message in oldMessages with the received response
    //             oldMessages.length === 2 && oldMessages.shift();

    //             oldMessages.push({
    //               by: "MA", // Maya
    //               message: streamMessage,
    //             });

    //             updateMessageContainer();
    //           }, 5000);

    //           inputText = streamMessage;
    //           updateMessageContainer();
    //         } else {
    //           streamMessage += msg.data;
    //           oldMessages[oldMessages.length - 1] = {
    //             by: "OW",
    //             // Keep the original user message
    //             message: userMessage.message,
    //           };
    //           updateMessageContainer();
    //         }
    //       };
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    const combineStreamingMessages = (data) => {
      // Split the raw string into individual JSON strings
      const rawMessages = data.match(/(\{[^}]+\})/g);

      if (!rawMessages) return "";

      // Parse each JSON string into an object
      const messages = rawMessages.map((message) => JSON.parse(message));

      // Combine the content fields
      const combinedMessage = messages.reduce(
        (acc, msg) => acc + msg.content,
        ""
      );

      return combinedMessage;
    };

    async function sendMessage(msg) {
      try {
        let userMessage = { by: "OW", message: msg };

        // Clear input state
        messageInput.value = "";

        // Display user message immediately
        oldMessages.length === 2 && oldMessages.shift();

        oldMessages.push(userMessage);
        updateMessageContainer();

        const payload = chat_id ? { input: msg, chat_id } : { input: msg };

        const response = await fetch(
          `${url}/ai/buckets/${bucket}/conversations`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token2}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        let data;
        const contentType = response.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          // Handle non-JSON response (e.g., plain text)
          data = await response.text();
        }
        const streamMessage = combineStreamingMessages(data);

        let mic = localStorage.getItem("mic");

        if (mic === "on") {
          startListening();
        }

        setTimeout(() => {
          // Update the last message in oldMessages with the received response
          oldMessages.length === 2 && oldMessages.shift();

          oldMessages.push({
            by: "MA", // Maya
            message: streamMessage,
          });

          updateMessageContainer();
        }, 5000);

        inputText = streamMessage;
        updateMessageContainer();
      } catch (error) {
        console.log(error);
      }
    }

    // Truncate Text
    function truncateText(text, textLength) {
      const textSize = text.split(" ").length;
      if (textSize > textLength) {
        return text.split(" ").slice(0, textLength).join(" ") + "...";
      } else {
        return text;
      }
    }

    function updateMessageContainer() {
      messageContainer.innerHTML = "";
      console.log("updateMessageContainer: " + JSON.stringify(oldMessages));
      oldMessages?.forEach((message) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(
          message.by === "OW" ? "message-right" : "message-left"
        );

        const img = document.createElement("img");
        img.classList.add("message-img");

        if (message.by === "MA")
          img.src = "https://app.myaisells.com/assets/mayaframe.jpeg";
        else img.src = "https://app.myaisells.com/assets/user.png";

        const text = document.createElement("p");
        text.classList.add("message-text");
        if (message.by === "OW") {
          text.classList.add("message-text-right");
        }
        console.log("TEXT: " + JSON.stringify(message?.message));
        text.innerText = truncateText(message?.message, 10);
        // message.message;

        messageElement.appendChild(img);
        messageElement.appendChild(text);

        messageContainer.appendChild(messageElement);
      });

      // Automatically scroll to bottom
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    function handlePreview() {
      if (widgetContainer.style.display === "none") {
        widgetContainer.style.display = "block";
        openModalButton.classList.add("hidden");
        getMessages();
      } else {
        widgetContainer.style.display = "none";
        openModalButton.classList.remove("hidden");
      }
    }

    function startListening() {
      localStorage.removeItem("mic");
      if (recognition) {
        recognition.start();
        isListening = true;
        startListeningBtn.setAttribute("name", "mic-off");
        localStorage.setItem("mic", "on");
      }
    }

    function stopListening() {
      localStorage.removeItem("mic");
      if (recognition) {
        recognition.stop();
        isListening = false;
        startListeningBtn.setAttribute("name", "mic");
        localStorage.setItem("mic", "off");
      }
    }

    function toggleMic() {
      if (isListening) {
        stopListening();
        // messageInput.value.tri
        sendMessage(messageInput.value).then(() => {
          createStream().then(() => {
            startSpeech();
          });
        });
      } else {
        startListening();
      }
    }

    const startSpeech = (welcomeText) => {
      if (
        (inputText !== "" || messageInput.value !== "") &&
        oldMessages[oldMessages.length - 1].by === "MY"
      ) {
        console.log("Stream from Update message");
        createStream().then(() => {
          startStream(inputText);
        });
      }
      if (inputText !== "" || messageInput.value !== "") {
        startStream(inputText);
        startTimer();
      }
    };

    messageInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage(messageInput.value).then(() => {
          createStream().then(() => {
            startSpeech();
          });
        });
      }
    });

    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        isListening = true;
        startListeningBtn.setAttribute("name", "mic-off");
      };
      recognition.onend = () => {
        isListening = false;
        startListeningBtn.setAttribute("name", "mic");
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        messageInput.value = transcript !== "" && transcript;

        clearTimeout(pauseTimeoutRef);
        pauseTimeoutRef = setTimeout(() => {
          recognition.stop();
          if (transcript.trim()) {
            sendMessage(transcript.trim());
          }
        }, 200);
      };
    }

    // (function () {
    //   handlePreview();
    //   startStream();
    //   createStream().then(() => {
    //     startStream("Hello there!");
    //     startTimer();
    //   });
    // })();

    openModalButton.addEventListener("click", handlePreview);
    closeBtn.addEventListener("click", handlePreview);
    sendBtn.addEventListener("click", function () {
      sendMessage(messageInput.value).then(() => {
        createStream().then(() => {
          startSpeech();
        });
      });
    });

    startListeningBtn.addEventListener("click", toggleMic);

    // Checking if mic was on before and start listening
    if (localStorage.getItem("mic") === "on") {
      startListening();
    }

    localStorage.removeItem("mic");
    getMessages();
    initialSetup();

    // Event listeners for opening and closing modal
    openModalButton.addEventListener("click", () => {
      // Create the stream and start the timer
      widgetContainer.style.display = "block";
      openModalButton.classList.add("hidden");
    });

    closeBtn.addEventListener("click", () => {
      widgetContainer.style.display = "none";
      openModalButton.classList.remove("hidden");
    });
  });
})();
