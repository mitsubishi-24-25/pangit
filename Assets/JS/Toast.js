window.showToast = function (message) {
    const msg = document.createElement('div');
    msg.className = 'toast-message';
    msg.textContent = message;
    document.body.appendChild(msg);

    setTimeout(() => {
        msg.classList.add('toast-show');
    }, 10);

    setTimeout(() => {
        msg.classList.remove('toast-show');
        setTimeout(() => msg.remove(), 300);
    }, 2000);
};
