(function () {
  // Load Tailwind CSS
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css";
  document.head.appendChild(link);

  // Create modal HTML
  var modalHtml = `
    <style>
      .backdrop-blur-sm {
        backdrop-filter: blur(5px);
      }

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

      .modal-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
      }

      .modal-center {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        width: 100%;
        text-align: center;
        position: relative;
      }

      .modal-content {
        height: 650px;
        width: 400px;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        background-color: var(--color-white);
        overflow: hidden;
        border-radius: 1rem;
      }

      .modal-nav {
        padding: 0.75rem 1rem;
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
        gap: 0.75rem;
      }

      .nav-img {
        width: 2.5rem;
        height: 2.5rem;
        object-fit: cover;
        border: 0.125rem solid var(--color-blue);
        border-radius: 50%;
      }

      .nav-title {
        display: flex;
        align-items: center;
        color: var(--color-dark);
        font-size: 1rem;
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
        border: 1px solid var(--color-light-border);
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
      <button id="app" class="btnOpen" id="open-modal">
        <img src="/maya.png" alt="Maya" />
      </button>
    </div>
    <div id="maya-widget" style="display:none; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(107, 114, 128, 0.75); transition: opacity 0.2s; backdrop-filter: blur(4px);">
      <div class="modal-container">
        <div class="modal-center">
          <div class="modal-content" onclick="event.stopPropagation();">
            <nav class="modal-nav">
              <div class="nav-left">
                <img src="https://via.placeholder.com/40" alt="Maya" class="nav-img">
                <div class="nav-title">
                  Maya AI
                  <span class="nav-status"></span>
                </div>
              </div>
              <ion-icon name="close" id="closeBtn" class="nav-icon"></ion-icon>
            </nav>
            <div class="modal-body">
              <div class="modal-image">
                <img src="https://via.placeholder.com/400x150" alt="Maya" class="body-img">
              </div>
              <div class="modal-messages">
                <div class="message message-left">
                  <img src="https://via.placeholder.com/24" alt="Maya" class="message-img">
                  <p class="message-text">I would be glad to help Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolore sint doloremque pariatur neque! Optio itaque totam dolorem veritatis aperiam.</p>
                </div>
                <div class="message message-right">
                  <img src="https://via.placeholder.com/24" alt="Maya" class="message-img">
                  <p class="message-text message-text-right">I would be glad to help Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolore sint doloremque pariatur neque! Optio itaque totam dolorem veritatis aperiam.</p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <ion-icon name="mic" class="footer-icon"></ion-icon>
              <input type="text" name="message" class="footer-input" placeholder="Aa">
              <ion-icon name="send" class="footer-icon"></ion-icon>
            </div>
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
    const openModalButton = document.querySelector(".btnOpen");
    const widgetContainer = document.getElementById("maya-widget");
    const closeBtn = document.getElementById("closeBtn");

    function handlePreview() {
      if (widgetContainer.style.display === "none") {
        widgetContainer.style.display = "block";
        openModalButton.classList.add("hidden");
      } else {
        widgetContainer.style.display = "none";
        openModalButton.classList.remove("hidden");
      }
    }

    openModalButton.addEventListener("click", handlePreview);
    closeBtn.addEventListener("click", handlePreview);
    widgetContainer.addEventListener("click", handlePreview);
  });
})();
