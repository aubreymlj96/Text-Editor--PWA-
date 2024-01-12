const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    butInstall.style.visibility = 'visible';
    butInstall.textContent = 'Install!';

    // TODO: Implement a click event handler on the `butInstall` element
    butInstall.addEventListener('click', async () => {
        e.prompt();
        butInstall.setAttribute('disabled', true);
        butInstall.textContent = 'Installed!'
    });
    
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (e) => {
    butInstall.textContent = 'App Installed Successfully';
    console.log('appinstalled', e);
});