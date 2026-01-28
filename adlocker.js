(function() {
    const adSelectors = [
        '.ad-box', '.adsbygoogle', '[id^="google_ads_"]', 
        '.sidebar-ad', '#banner-ads', '.footer-ads',
        'iframe[src*="ads"]', 'aside[class*="ad"]'
    ];

    // Selector unido para hacer una sola búsqueda en lugar de varias
    const combinedSelector = adSelectors.join(',');

    const removeAds = () => {
        const ads = document.querySelectorAll(combinedSelector);
        for (let i = 0; i < ads.length; i++) {
            ads[i].remove();
        }
    };

    // OPTIMIZACIÓN: No ejecutar instantáneamente, esperar a que el navegador respire
    let timeout;
    const observer = new MutationObserver(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(removeAds, 250); // Solo ejecuta si han pasado 250ms de calma
    });

    // Iniciar
    removeAds();
    observer.observe(document.documentElement, { childList: true, subtree: true });

    console.log("AdBlocker Optimizado (Debounced) activo.");
})();