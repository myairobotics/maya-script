// import React from "react";
// import ReactDOM from "react-dom";
// import MayaChat from "./components/MayaChat/MayaChat";

// class MayaWidget extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: "open" });
//   }

//   connectedCallback() {
//     const mountPoint = document.createElement("div");
//     this.shadowRoot.appendChild(mountPoint);
//     const styleSheet = document.createElement("style");
//     styleSheet.textContent = `
//       @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');

//       :root {
//         --color-blue: #0050ff;
//         --color-white: #ffffff;
//         --color-gray: #e5e7eb;
//         --color-dark: #242426;
//         --color-secondary: #2d2d2f;
//         --color-light-border: rgba(0, 0, 255, 0.44);
//         --color-light-ring: rgba(0, 80, 255, 0.2);
//       }

//       .tooltip {
//         position: fixed;
//         bottom: calc(8rem + 20px);
//         right: 6.5rem;
//         transform: translateX(50%);
//         padding: 8px 12px;
//         background-color: rgba(255, 255, 255, 0.1);
//         border: 1.5px solid rgba(255, 255, 255, 0.3);
//         color: white;
//         font-size: 14px;
//         border-radius: 6px;
//         white-space: nowrap;
//         z-index: 10000;
//         backdrop-filter: blur(4px);
//         animation: showHideTooltip 30s forwards;
//       }

//       .tooltip::before,
//       .tooltip::after {
//         content: "";
//         position: absolute;
//         bottom: -8px;
//         left: 50%;
//         transform: translateX(-50%);
//         border-style: solid;
//       }

//       .tooltip::before {
//         border-width: 9px 9px 0 9px;
//         border-color: rgba(255, 255, 255, 0.3) transparent transparent transparent;
//         bottom: -9px;
//       }

//       .tooltip::after {
//         border-width: 8px 8px 0 8px;
//         border-color: rgba(255, 255, 255, 0.1) transparent transparent transparent;
//       }

//       @keyframes showHideTooltip {
//         0% { opacity: 0; }
//         10% { opacity: 1; }
//         90% { opacity: 1; }
//         100% { opacity: 0; visibility: hidden; }
//       }

//       @keyframes pulse {
//         0% { transform: scale(1); opacity: 1; }
//         50% { transform: scale(1.1); opacity: 0.7; }
//         100% { transform: scale(1); opacity: 1; }
//       }

//       .mic-active {
//         color: #22c55e;
//         animation: pulse 1.5s ease infinite;
//       }

//       .shimmer {
//         position: relative;
//         display: none;
//         color: #666;
//         font-size: 14px;
//         font-family: system-ui, -apple-system, sans-serif;
//         overflow: hidden;
//         min-width: 200px;
//       }

//       .shimmer::before {
//         content: '';
//         position: absolute;
//         top: 0;
//         left: -100%;
//         width: 100%;
//         height: 100%;
//         background: linear-gradient(
//           90deg,
//           transparent,
//           rgba(255, 255, 255, 0.1),
//           transparent
//         );
//         animation: shimmer 3s infinite linear;
//       }

//       @keyframes shimmer {
//         0% { transform: translateX(0); }
//         100% { transform: translateX(200%); }
//       }

//       .text-content {
//         opacity: 1;
//         transition: opacity 0.7s ease-in-out;
//       }

//       .text-content.fade {
//         opacity: 0;
//       }

//       /* Scrollbar hiding */
//       .modal-messages::-webkit-scrollbar,
//       .modal-content::-webkit-scrollbar {
//         display: none;
//       }

//       .modal-messages,
//       .modal-content {
//         -ms-overflow-style: none;
//         scrollbar-width: none;
//       }

//       /* Spinner */
//       .spinner {
//         border: 2px solid var(--color-gray);
//         border-top: 2px solid var(--color-blue);
//         border-radius: 50%;
//         width: 28px;
//         height: 20px;
//         animation: spin 1s linear infinite;
//         display: none;
//       }

//       @keyframes spin {
//         0% { transform: rotate(0deg); }
//         100% { transform: rotate(360deg); }
//       }

//       /* Message styles */
//       .message-left {
//         background-color: var(--color-gray);
//       }

//       .message-right {
//         background-color: var(--color-blue);
//       }

//       .message-text-right {
//         color: var(--color-white);
//       }

//       /* Input styles */
//       .footer-input {
//         width: 100%;
//         background-color: var(--color-gray);
//         border-radius: 1.5rem;
//         padding: 0.625rem 1rem;
//         outline: none;
//         font-size: 0.875rem;
//         color: var(--color-secondary);
//       }

//       /* Button styles */
//       .btnOpen {
//         width: 60px;
//         height: 60px;
//         background-color: transparent;
//         border-radius: 50%;
//         position: fixed;
//         bottom: 4rem;
//         right: 4.5rem;
//         cursor: pointer;
//         z-index: 10000;
//         transition: box-shadow 0.3s ease;
//       }

//       .btnOpen img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }

//       .btnOpen img:hover {
//         filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.5));
//       }

//       /* Font imports */
//       @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap');
//     `;
//     this.shadowRoot.appendChild(styleSheet);

//     ReactDOM.render(<MayaChat />, mountPoint);
//   }
// }

// customElements.define("maya-widget", MayaWidget);
