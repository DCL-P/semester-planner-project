const form = document.getElementById("signup-form");
const errorContainer = document.getElementById("error-container");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const response = await fetch("/auth/signup", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const error = await response.json();

        errorMessage.textContent = error.message;
        errorContainer.classList.add("show");

        setTimeout(() => {
            errorContainer.classList.remove("show");
        }, 5000);

        return;
    }

    window.location.href = "/";
});