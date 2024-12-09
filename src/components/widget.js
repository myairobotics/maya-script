import "./MayaWidget";

window.initMayaWidget = (bucketId) => {
  localStorage.setItem("data", JSON.stringify({ bucket: bucketId }));
  const widget = document.createElement("maya-widget");
  document.body.appendChild(widget);
};
