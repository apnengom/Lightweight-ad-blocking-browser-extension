const btn = document.getElementById('statusBtn');

// 1. Cargar el estado actual al abrir el popup
chrome.storage.local.get('enabled', (data) => {
    // Si es la primera vez, por defecto estará activado
    const isEnabled = data.enabled !== false; 
    updateUI(isEnabled);
});

// 2. Escuchar el clic para cambiar el estado
btn.addEventListener('click', () => {
    chrome.storage.local.get('enabled', (data) => {
        const newState = data.enabled === false; // Cambia el valor actual
        chrome.storage.local.set({ enabled: newState }, () => {
            updateUI(newState);
            // Refrescar la página actual para aplicar cambios inmediatamente
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                if (tabs[0]) chrome.tabs.reload(tabs[0].id);
            });
        });
    });
});

// 3. Función para cambiar el aspecto visual del botón
function updateUI(isEnabled) {
    if (isEnabled) {
        btn.innerText = "Activado";
        btn.className = "btn on";
    } else {
        btn.innerText = "Desactivado";
        btn.className = "btn off";
    }
}