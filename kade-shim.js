// kade-shim.js
window['Kade Engine'] = {
  embed: function(name, containerId, width, height, options) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const iframe = document.createElement('iframe');
    iframe.src = "https://rolandelving.github.io/FNF-mod/index.html"; // First repo
    iframe.width = width;
    iframe.height = height;
    iframe.style.border = "none";
    iframe.style.background = "#000";
    container.appendChild(iframe);
  }
};
