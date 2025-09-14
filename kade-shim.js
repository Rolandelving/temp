// kade-shim.js

(function() {
    // Define Kade Engine object
    window['Kade Engine'] = {
        embed: function(name, containerId, width, height, options) {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error(`Container with id "${containerId}" not found.`);
                return;
            }

            if (container.dataset.embedded) return;
            container.dataset.embedded = true;

            // Create iframe
            const iframe = document.createElement('iframe');
            iframe.width = width;
            iframe.height = height;
            iframe.style.border = "none";
            iframe.style.background = "#000";
            iframe.style.display = "block";

            // Build a fully rewritten HTML for FNF-mod
            const iframeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>FNF VS Sonic.exe ONLINE</title>
<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">

<script src="https://cdn.jsdelivr.net/gh/Rolandelving/FNF-mod@main/Kade%20Engine.js" defer></script>

<style>
html,body { margin:0; padding:0; height:100%; overflow:hidden; }
#openfl-content { width:100%; height:100%; background:#000; }
</style>

</head>
<body>
<div id="openfl-content"></div>

<script>
function loadGame() {
    if (typeof lime !== 'undefined' && lime.embed) {
        lime.embed("Kade Engine", "openfl-content", 1280, 720, { parameters: {} });
    } else {
        setTimeout(loadGame, 100);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadGame, 500);
});
</script>

</body>
</html>
`;

            // Load the HTML into the iframe
            iframe.srcdoc = iframeHTML;
            container.appendChild(iframe);
        }
    };

    // Auto-start embedding once DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            if (typeof lime !== 'undefined' && lime.embed) {
                lime.embed("Kade Engine", "openfl-content", 1280, 720, { parameters: {} });
            }
        }, 500);
    });

})();
