// ==========================================
// SEMESTER PLANNER - JAVASCRIPT
// ==========================================

// Gegevens ophalen uit localStorage
let plannerData = JSON.parse(localStorage.getItem("semesterPlanner")) || {
    weeks: [
        {
            id: 1,
            title: "Week 1",
            description: "Eerste week van de semesterplanning.",
            activities: [
                {
                    id: 1,
                    title: "Activiteit 1",
                    description: "Beschrijving van activiteit 1.",
                    status: "Te doen"
                },
                {
                    id: 2,
                    title: "Activiteit 2",
                    description: "Beschrijving van activiteit 2.",
                    status: "Bezig"
                }
            ]
        },
        {
            id: 2,
            title: "Week 2",
            description: "Tweede week van de semesterplanning.",
            activities: [
                {
                    id: 3,
                    title: "Activiteit 3",
                    description: "Beschrijving van activiteit 3.",
                    status: "Te doen"
                },
                {
                    id: 4,
                    title: "Activiteit 4",
                    description: "Beschrijving van activiteit 4.",
                    status: "Afgerond"
                }
            ]
        }
    ]
};


// ==========================================
// DATA OPSLAAN
// ==========================================

function saveData() {
    localStorage.setItem(
        "semesterPlanner",
        JSON.stringify(plannerData)
    );
}


// ==========================================
// UNIEKE ID MAKEN
// ==========================================

function getNewId() {
    let ids = [];

    plannerData.weeks.forEach(week => {
        ids.push(week.id);

        week.activities.forEach(activity => {
            ids.push(activity.id);
        });
    });

    if (ids.length === 0) {
        return 1;
    }

    return Math.max(...ids) + 1;
}


// ==========================================
// LOGIN
// ==========================================

function login(event) {
    if (event) {
        event.preventDefault();
    }

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!usernameInput || !passwordInput) {
        window.location.hash = "dashboard";
        return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
        alert("Vul je gebruikersnaam en wachtwoord in.");
        return;
    }

    localStorage.setItem("loggedIn", "true");

    window.location.hash = "dashboard";
}


// ==========================================
// UITLOGGEN
// ==========================================

function logout() {
    localStorage.removeItem("loggedIn");

    window.location.hash = "login";
}


// ==========================================
// NIEUWE WEEK MAKEN
// ==========================================

function createWeek(event) {
    if (event) {
        event.preventDefault();
    }

    const titleInput = document.getElementById("weekTitle");
    const descriptionInput = document.getElementById("weekDescription");

    if (!titleInput) {
        return;
    }

    const title = titleInput.value.trim();

    const description = descriptionInput
        ? descriptionInput.value.trim()
        : "";

    if (title === "") {
        alert("Vul een titel voor de week in.");
        return;
    }

    const newWeek = {
        id: getNewId(),
        title: title,
        description: description,
        activities: []
    };

    plannerData.weeks.push(newWeek);

    saveData();

    alert("De week is succesvol aangemaakt!");

    if (titleInput) {
        titleInput.value = "";
    }

    if (descriptionInput) {
        descriptionInput.value = "";
    }

    window.location.hash = "dashboard";

    renderPlanner();
}


// ==========================================
// NIEUWE ACTIVITEIT MAKEN
// ==========================================

function createActivity(event, weekId) {
    if (event) {
        event.preventDefault();
    }

    const titleInput = document.getElementById("activityTitle");
    const descriptionInput =
        document.getElementById("activityDescription");

    const statusInput =
        document.getElementById("activityStatus");

    if (!titleInput) {
        return;
    }

    const title = titleInput.value.trim();

    const description = descriptionInput
        ? descriptionInput.value.trim()
        : "";

    const status = statusInput
        ? statusInput.value
        : "Te doen";

    if (title === "") {
        alert("Vul een titel voor de activiteit in.");
        return;
    }

    const week = plannerData.weeks.find(
        week => week.id === Number(weekId)
    );

    if (!week) {
        alert("Deze week bestaat niet.");
        return;
    }

    const newActivity = {
        id: getNewId(),
        title: title,
        description: description,
        status: status
    };

    week.activities.push(newActivity);

    saveData();

    alert("De activiteit is succesvol toegevoegd!");

    if (titleInput) {
        titleInput.value = "";
    }

    if (descriptionInput) {
        descriptionInput.value = "";
    }

    window.location.hash = `week-${weekId}`;

    renderPlanner();
}


// ==========================================
// ACTIVITEIT BEWERKEN
// ==========================================

function editActivity(event, activityId) {
    if (event) {
        event.preventDefault();
    }

    const activity = findActivity(activityId);

    if (!activity) {
        alert("Activiteit niet gevonden.");
        return;
    }

    const newTitle = prompt(
        "Nieuwe titel:",
        activity.title
    );

    if (newTitle === null) {
        return;
    }

    if (newTitle.trim() === "") {
        alert("De titel mag niet leeg zijn.");
        return;
    }

    const newDescription = prompt(
        "Nieuwe beschrijving:",
        activity.description
    );

    if (newDescription === null) {
        return;
    }

    const newStatus = prompt(
        "Nieuwe status (Te doen / Bezig / Afgerond):",
        activity.status
    );

    if (newStatus === null) {
        return;
    }

    activity.title = newTitle.trim();

    activity.description = newDescription.trim();

    activity.status = normalizeStatus(newStatus);

    saveData();

    alert("De activiteit is aangepast!");

    renderPlanner();
}


// ==========================================
// STATUS NORMALISEREN
// ==========================================

function normalizeStatus(status) {
    const value = status.trim().toLowerCase();

    if (value === "bezig") {
        return "Bezig";
    }

    if (
        value === "afgerond" ||
        value === "klaar" ||
        value === "done"
    ) {
        return "Afgerond";
    }

    return "Te doen";
}


// ==========================================
// ACTIVITEIT VINDEN
// ==========================================

function findActivity(activityId) {
    for (const week of plannerData.weeks) {
        const activity = week.activities.find(
            activity => activity.id === Number(activityId)
        );

        if (activity) {
            return activity;
        }
    }

    return null;
}


// ==========================================
// ACTIVITEIT VERWIJDEREN
// ==========================================

function deleteActivity(activityId) {
    const activity = findActivity(activityId);

    if (!activity) {
        alert("Activiteit niet gevonden.");
        return;
    }

    const confirmDelete = confirm(
        `Weet je zeker dat je "${activity.title}" wilt verwijderen?`
    );

    if (!confirmDelete) {
        return;
    }

    plannerData.weeks.forEach(week => {
        week.activities = week.activities.filter(
            activity => activity.id !== Number(activityId)
        );
    });

    saveData();

    alert("Activiteit verwijderd.");

    renderPlanner();
}


// ==========================================
// WEEK VERWIJDEREN
// ==========================================

function deleteWeek(weekId) {
    const week = plannerData.weeks.find(
        week => week.id === Number(weekId)
    );

    if (!week) {
        alert("Week niet gevonden.");
        return;
    }

    const confirmDelete = confirm(
        `Weet je zeker dat je "${week.title}" wilt verwijderen?`
    );

    if (!confirmDelete) {
        return;
    }

    plannerData.weeks = plannerData.weeks.filter(
        week => week.id !== Number(weekId)
    );

    saveData();

    alert("Week verwijderd.");

    window.location.hash = "dashboard";

    renderPlanner();
}


// ==========================================
// STATUS VERANDEREN
// ==========================================

function changeStatus(activityId, newStatus) {
    const activity = findActivity(activityId);

    if (!activity) {
        return;
    }

    activity.status = newStatus;

    saveData();

    renderPlanner();
}


// ==========================================
// PLANNER WEERGEVEN
// ==========================================

function renderPlanner() {

    // ------------------------------------------------
    // WEKEN
    // ------------------------------------------------

    const weekContainers =
        document.querySelectorAll("[data-weeks]");

    weekContainers.forEach(container => {

        container.innerHTML = "";

        plannerData.weeks.forEach(week => {

            const weekCard = document.createElement("div");

            weekCard.className = "week-card";

            weekCard.innerHTML = `
                <div class="week-card-content">

                    <h3>${escapeHTML(week.title)}</h3>

                    <p>
                        ${escapeHTML(
                            week.description ||
                            "Geen beschrijving."
                        )}
                    </p>

                    <span class="activity-count">
                        ${week.activities.length}
                        ${week.activities.length === 1
                            ? "activiteit"
                            : "activiteiten"}
                    </span>

                </div>

                <div class="week-card-buttons">

                    <a
                        href="#week-${week.id}"
                        class="btn"
                    >
                        Bekijk week
                    </a>

                    <button
                        type="button"
                        class="btn btn-danger"
                        onclick="deleteWeek(${week.id})"
                    >
                        Verwijderen
                    </button>

                </div>
            `;

            container.appendChild(weekCard);
        });
    });


    // ------------------------------------------------
    // ACTIVITEITEN
    // ------------------------------------------------

    const activityContainers =
        document.querySelectorAll("[data-activities]");

    activityContainers.forEach(container => {

        const weekId =
            Number(container.dataset.activities);

        const week = plannerData.weeks.find(
            week => week.id === weekId
        );

        if (!week) {
            return;
        }

        container.innerHTML = "";

        if (week.activities.length === 0) {

            container.innerHTML = `
                <div class="empty-state">
                    <h3>Nog geen activiteiten</h3>

                    <p>
                        Voeg je eerste activiteit toe
                        aan deze week.
                    </p>
                </div>
            `;

            return;
        }

        week.activities.forEach(activity => {

            const activityCard =
                document.createElement("div");

            activityCard.className =
                "activity-card";

            activityCard.innerHTML = `
                <div>

                    <h3>
                        ${escapeHTML(activity.title)}
                    </h3>

                    <p>
                        ${escapeHTML(
                            activity.description ||
                            "Geen beschrijving."
                        )}
                    </p>

                    <span
                        class="status status-${activity.status
                            .toLowerCase()
                            .replace(" ", "-")}"
                    >
                        ${escapeHTML(activity.status)}
                    </span>

                </div>

                <div class="activity-actions">

                    <button
                        type="button"
                        class="btn"
                        onclick="editActivity(null, ${activity.id})"
                    >
                        Bewerken
                    </button>

                    <button
                        type="button"
                        class="btn btn-danger"
                        onclick="deleteActivity(${activity.id})"
                    >
                        Verwijderen
                    </button>

                </div>
            `;

            container.appendChild(activityCard);
        });
    });
}


// ==========================================
// HTML VEILIG MAKEN
// ==========================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ==========================================
// PAGINA CONTROLEREN
// ==========================================

function checkLogin() {

    const loggedIn =
        localStorage.getItem("loggedIn");

    const hash =
        window.location.hash;

    if (!loggedIn && hash !== "#login") {

        // Alleen automatisch naar login
        // wanneer er een login-sectie bestaat.

        const loginSection =
            document.getElementById("login");

        if (loginSection) {
            window.location.hash = "login";
        }
    }
}


// ==========================================
// START
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        checkLogin();

        renderPlanner();

    }
);


// ==========================================
// BIJ VERANDERING VAN PAGINA
// ==========================================

window.addEventListener(
    "hashchange",
    function () {

        renderPlanner();

    }
);