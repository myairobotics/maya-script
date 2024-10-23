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
        width: 60px;
        background-color:transparent;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        bottom: 4rem;
        right: 4rem;
        cursor: pointer;
        z-index: 10000;
        text-align: center;
        line-height: 60px;
        font-size: 24px;
        transition: box-shadow 0.3s ease;
      }

      .btnOpen img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .btnOpen img:hover {
        filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.5));
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
        height: fit-content;
        width: 400px;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        background-color: transparent;
        overflow: hidden;
        border-radius: 1rem;
      }

      .modal-nav {
        padding: 0.45rem .8rem;
        display: flex;
        border-radius:15px;
        align-items: center;
        justify-content: space-evenly;
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
        border-radius: 50%;
      }

      .nav-title {
        display: flex;
        align-items: center;
        color: var(--color-dark);
        font-size: .8rem;
        font-family: 'Rubik', sans-serif;
        font-weight: 600;
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
        height: auto;
        transform: scale(0.75);
        transform-origin: center;
        position: static;
      }

      .body-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: right top;
        border-radius: 1rem;
      }
       .body-img-vid {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: right top;
        border-radius: 1.5rem;
      }

      .modal-messages {
        overflow: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border-top-left-radius:1rem;
        border-top-right-radius:1rem;
      }

      .message {
        display: flex;
        gap: 0.75rem;
        padding: 0.7rem;
        border-radius: 1.5rem;
        align-items:flex-end;
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
        @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.7;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      .mic-active {
          color: #22c55e;
          animation: pulse 1.5s ease infinite;
      }
      .spinner {
        border: 2px solid var(--color-gray);
        border-top: 2px solid var(--color-blue);
        border-radius: 50%;
        width: 28px;
        height: 20px;
        animation: spin 1s linear infinite;
        display: none;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .modal-messages::-webkit-scrollbar {
        display: none;
      }

      .modal-messages {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .modal-content::-webkit-scrollbar {
        display: none;
      }

      .modal-content {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .modal-container{
        display:none;
      }
     .shimmer {
      position: relative;
      display: none;
      color: #666;
      font-size: 14px;
      font-family: system-ui, -apple-system, sans-serif;
      overflow: hidden;
      min-width: 200px;
    }

    .shimmer::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      animation: shimmer 3s infinite linear;
    }

    .text-content {
      opacity: 1;
      transition: opacity 0.7s ease-in-out;
    }

    .text-content.fade {
      opacity: 0;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(200%);
      }
    }
    </style>
    <div id="app" class="p-4">
      <button class="btnOpen" id="open-modal">
        <img id="mayaAvatar" alt="Maya" />
      </button>
    </div>
      <div class="modal-container">
        <div class="modal-center">
          <div class="modal-content" onclick="event.stopPropagation();">
            <nav class="modal-nav">
              <div class="nav-left">
                <img id="navImage" alt="Maya" class="nav-img">
                <div class="nav-title">
                  Maya AI
                </div>
              </div>
              <ion-icon name="close" id="closeBtn" class="nav-icon"></ion-icon>
            </nav>
            <div class="modal-body">
              <div class="modal-image">
                <video
                  id='videoPlayer'
                  class='w-full h-full rounded-lg modal-video body-img-vid'
                  autoplay
                  playsinline
                ></video>
                <img
                  id='placeholderImage'
                  class='w-full h-full object-cover modal-video body-img'
                  alt='Video Placeholder'
                  style='display: none;'
                />
              </div>
              <div class="modal-messages" id="messageContainer">
                <!-- Messages will be dynamically added here -->
              </div>
            </div>
 <div class="shimmer thinking-container">
      <span class="text-content">Processing...</span>
    </div>            <p id="output"></p>
            <div class="modal-footer">
            <button id="startListeningBtn">
            <i id="micIcon"  class="fa-solid fa-microphone-lines-slash footer-icon text-2xl "></i>
            </button>
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
  const faCdn = document.createElement("link");
  faCdn.rel = "stylesheet";
  faCdn.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css";
  document.head.appendChild(faCdn);
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
    const outputDiv = document.getElementById("output");

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
    const url = "https://maya-node-ai-sales-backend.onrender.com/api/v2";
    const mayaImg = "https://app.myaisells.com/assets/mayaframe.png";

    const token = JSON.parse(localStorage.getItem("data"))?.token;
    const token2 = "mLF8*$4LwRfEzDYyDi!_0w";
    const bucket = JSON.parse(localStorage.getItem("data"))?.bucket;
    const micIcon = document.getElementById("micIcon");

    //initializing speech recognition
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        isListening = true;
        micIcon.classList.remove("fa-microphone-lines-slash");
        micIcon.classList.add("fa-microphone-lines", "mic-active");
      };

      recognition.onend = () => {
        isListening = false;
        micIcon.classList.remove("fa-microphone-lines", "mic-active");
        micIcon.classList.add("fa-microphone-lines-slash");
      };

      recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        messageInput.value = `${interimTranscript} ${finalTranscript}`;
        if (finalTranscript && finalTranscript !== " ") {
          sendBtn.click();
        }
      };
      startListeningBtn.addEventListener("click", () => {
        if (recognition.start) {
          recognition.start();
        }
      });
    } else {
      outputDiv.textContent = "Web Speech API not supported in this browser.";
    }
    const messages = [
      "Processing...",
      "Analyzing...",
      "Thinking...",
      "Computing...",
      "Generating response...",
      "Almost there...",
      "Processing request...",
    ];

    const textElement = document.querySelector(".text-content");
    let currentIndex = 0;

    function updateText() {
      textElement.classList.add("fade");

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % messages.length;
        textElement.textContent = messages[currentIndex];
        textElement.classList.remove("fade");
      }, 700);
    }
    setInterval(updateText, 2000);

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
        console.log(data);

        chat_id = data.chat_id;
        oldMessages = data?.messages.reverse();
        updateMessageContainer();
      } catch (error) {
        console.log(error);
      }
    }

    async function sendMessage(msg) {
      const bucketId = JSON.parse(localStorage.getItem("data"))?.bucket;
      const thinkingContainer = document.querySelector(".thinking-container");
      try {
        let userMessage = { by: "OW", message: msg };
        thinkingContainer.style.display = "inline-block";

        // Clear input state
        messageInput.value = "";

        // Display user message immediately
        oldMessages.length === 2 && oldMessages.shift();

        oldMessages.push(userMessage);
        updateMessageContainer();

        const payload = {
          input: msg,
          chat_id: chat_id || 0,
          include_media: true,
        };
        let response, data;

        response = await fetch(
          `${url}/ai/buckets/${bucketId}/web/conversations`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token2}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const contentType = response.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          // Handle non-JSON response (e.g., plain text)
          data = await response.text();
        }
        console.log(data);
        chat_id = data.chat_id;
        thinkingContainer.style.display = "none";
        // Update the last message in oldMessages with the received response
        oldMessages.length === 2 && oldMessages.shift();

        oldMessages.push({
          by: "MA", // Maya
          message: data.content,
        });

        updateMessageContainer();
        if (data.media_url) {
          placeholderImage.style.display = "none";

          streamVideoElement.src = data.media_url;
          streamVideoElement.style.display = "block";
          streamVideoElement.oncanplay = () => {
            streamVideoElement.play();
          };
          streamVideoElement.onended = () => {
            streamVideoElement.style.display = "none";
            placeholderImage.style.display = "block";
          };
        }
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
      console.log("updateMessageContainer: " + JSON.stringify(oldMessages));
      messageContainer.innerHTML = "";
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

        text.innerText.trim() !== ""
          ? messageContainer.appendChild(messageElement)
          : "";
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

    messageInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage(messageInput.value);
      }
    });

    openModalButton.addEventListener("click", handlePreview);
    closeBtn.addEventListener("click", handlePreview);
    sendBtn.addEventListener("click", function () {
      sendMessage(messageInput.value);
    });

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
  async function fetchAvatar() {
    const bucketId = JSON.parse(localStorage.getItem("data"))?.bucket;
    try {
      const response = await fetch(
        `https://maya-node-ai-sales-backend.onrender.com/a/buckets/${bucketId}/avatar`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("avatar", data.image);
      const avatarUrl = data.image;
      document.getElementById("mayaAvatar").src = avatarUrl;
      document.getElementById("placeholderImage").src = avatarUrl;
      document.getElementById("navImage").src = avatarUrl;
    } catch (error) {
      console.error("Error fetching avatar:", error);
    }
  }

  fetchAvatar();
})();
