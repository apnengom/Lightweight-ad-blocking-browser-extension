// Usamos un set para mayor velocidad de búsqueda
const adSelectors = ['.adsbygoogle', 'iframe[src*="ads"]', '.ad-box', '#ad-container'];

function fastClean() {
    const elements = document.querySelectorAll(adSelectors.join(','));
    for (let el of elements) {
        // En lugar de borrar, ocultamos rápido para no re-calcular el layout
        if (el.style.display !== 'none') {
            el.style.display = 'none'; 
        }
    }
}

// Ejecutar solo cuando sea estrictamente necesario
let timeout = null;
const observer = new MutationObserver(() => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(fastClean, 100); // Espera 100ms para no saturar la RAM
});

chrome.storage.local.get('enabled', (data) => {
    if (data.enabled !== false) {
        fastClean();
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }
});