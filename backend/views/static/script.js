const form = document.getElementById("signup-form");
const errorContainer = document.getElementById("error-container");
const errorMessage = document.getElementById("error-message");

if (form) {

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const response = await fetch("/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Object.fromEntries(formData))
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
}

console.log("SCRIPT GELADEN");

const formActivity = document.querySelector(".activity-form");

console.log("FORM:", formActivity);

if (formActivity) {
    formActivity.addEventListener("submit", async (event) => {
        console.log("SUBMIT EVENT");
        event.preventDefault();

        const id = formActivity.dataset.id;
        console.log("ID:", id);
        const formData = new FormData(formActivity);

        const response = await fetch(`/activities/update/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        console.log("RESPONSE:", response);

        if (!response.ok) {
            const error = await response.json();

            console.log("ERROR:", error);

            errorMessage.textContent = error.message;
            errorContainer.classList.add("show");

            setTimeout(() => {
                errorContainer.classList.remove("show");
            }, 5000);

            return;
        }

        window.location.href = "/activities/planner";
    });
}