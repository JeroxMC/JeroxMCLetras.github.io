// Botón para cambiar de modo oscuro/claro
document.getElementById("modo-btn").addEventListener("click", function() {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        this.textContent = "🌙 Modo Oscuro";
    } else {
        this.textContent = "☀️ Modo Claro";
    }
});

