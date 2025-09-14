// kade-shim.js

// Define the Kade Engine object
window['Kade Engine'] = {
    embed: function(name, containerId, width, height, options) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id "${containerId}" not found.`);
            return;
        }

        // Check if we already embedded the iframe
        if (container.dataset.embedded) return;
        container.dataset.embedded = true;

        const iframe = document.createElement('iframe');
        iframe.src = "https://rolandelving.github.io/FNF-mod/index.html"; // First repo URL
        iframe.width = width;
        iframe.height = height;
        iframe.style.border = "none";
        iframe.style.background = "#000";
        iframe.style.display = "block";

        container.appendChild(iframe);
    }
};

// Wait for DOMContentLoaded before trying to embed
document.addEventListener('DOMContentLoaded', function() {
    function tryEmbed() {
        if (typeof lime !== 'undefined' && lime.embed) {
            lime.embed("Kade Engine", "openfl-content", 1280, 720, { parameters: {} });
        } else {
            console.log("lime not ready yet, retrying...");
            setTimeout(tryEmbed, 100);
        }
    }
    setTimeout(tryEmbed, 500); // start after a short delay
});
