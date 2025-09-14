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

            // Fetch the original index.html from the FNF-mod repo
            fetch('https://cdn.jsdelivr.net/gh/Rolandelving/FNF-mod@main/index.html')
                .then(res => res.text())
                .then(html => {
                    // Rewrite all relative URLs to JSDelivr CDN URLs
                    const rewrittenHTML = html
                        .replace(/src="(?!https?:\/\/)([^"]+)"/g, (m, p1) => {
                            return `src="https://cdn.jsdelivr.net/gh/Rolandelving/FNF-mod@main/${p1}"`;
                        })
                        .replace(/url\(['"]?(?!https?:\/\/)([^'")]+)['"]?\)/g, (m, p1) => {
                            return `url('https://cdn.jsdelivr.net/gh/Rolandelving/FNF-mod@main/${p1}')`;
                        });

                    // Create the iframe and inject rewritten HTML
                    const iframe = document.createElement('iframe');
                    iframe.width = width;
                    iframe.height = height;
                    iframe.style.border = 'none';
                    iframe.style.background = '#000';
                    iframe.style.display = 'block';
                    iframe.srcdoc = rewrittenHTML;

                    container.appendChild(iframe);
                })
                .catch(err => console.error('Failed to load FNF-mod index.html:', err));
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
