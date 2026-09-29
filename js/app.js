
const jobsContainer = document.getElementById("jobsContainer");
const jobCount = document.getElementById("jobCount");

const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");

const filterButtons = document.querySelectorAll(".filter-btn");
const sortJobs = document.getElementById("sortJobs");

const noJobs = document.getElementById("noJobs");
const resetSearch = document.getElementById("resetSearch");



let currentFilter = "all";
let currentSearch = "";
let currentLocation = "";



function getSavedJobs() {
    return JSON.parse(localStorage.getItem("savedJobs")) || [];
}



function toggleSaveJob(jobId) {

    let savedJobs = getSavedJobs();

    if (savedJobs.includes(jobId)) {
        savedJobs = savedJobs.filter(id => id !== jobId);
    } else {
        savedJobs.push(jobId);
    }

    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );

    renderJobs();
}


//create job cards

function createJobCard(job) {

    const savedJobs = getSavedJobs();
    const isSaved = savedJobs.includes(job.id);
    const card = document.createElement("article");

    card.className = "job-card";

    card.innerHTML = `
        <div class="job-card-top">

            <div class="company-info">

                <div class="company-logo">${job.logo} </div>

                <div>
                    <p class="company-name">${job.company}</p>
                    <h3 class="job-title">${job.position} </h3>
                </div>

            </div>


            <button
                class="save-job ${isSaved ? "saved" : ""}"
                data-id="${job.id}"
                title="Save Job">

                ${isSaved ? "♥" : "♡"}

            </button>

        </div>


        <div class="job-details">

            <span class="job-detail">📍 ${job.location}</span>
            <span class="job-detail">💼 ${job.experience}</span>
            <span class="job-detail">◉ ${job.mode}</span>
            <span class="job-type">${formatJobType(job.type)}</span>

        </div>


        <div class="job-footer">

            <span class="salary">₹${job.salaryMin} - ₹${job.salaryMax} LPA</span>
            <span class="posted-time">${getPostedText(job.postedDays)} </span>

        </div>
    `;


    const saveButton = card.querySelector(".save-job");

    saveButton.addEventListener("click", () => {
        toggleSaveJob(job.id);
    });


    return card;
}


function formatJobType(type) {

    const typeNames = {
        "full-time": "Full Time",
        "part-time": "Part Time",
        "internship": "Internship"
    };

    return typeNames[type] || type;
}



function getPostedText(days) {

    if (days === 0) {
        return "Today";
    }

    if (days === 1) {
        return "1 day ago";
    }

    return `${days} days ago`;
}



function filterJobs() {

    let filteredJobs = [...jobs];


    /* Search */

    if (currentSearch) {

        filteredJobs = filteredJobs.filter(job => {

            const searchText = `
                ${job.position}
                ${job.company}
            `.toLowerCase();

            return searchText.includes(
                currentSearch.toLowerCase()
            );
        });
    }


    /* Location */

    if (currentLocation) {

        filteredJobs = filteredJobs.filter(job => {

            return job.location
                .toLowerCase()
                .includes(currentLocation.toLowerCase());
        });
    }


    /* Job Type */

    if (currentFilter !== "all") {

        if (currentFilter === "remote") {

            filteredJobs = filteredJobs.filter(job => {
                return job.mode.toLowerCase() === "remote";
            });

        } else {

            filteredJobs = filteredJobs.filter(job => {
                return job.type === currentFilter;
            });

        }
    }

    return filteredJobs;
}


function sortJobsList(jobList) {
    const sortValue = sortJobs.value;

    if (sortValue === "recent") {

        return jobList.sort(
            (a, b) => a.postedDays - b.postedDays
        );

    }


    if (sortValue === "salary-high") {

        return jobList.sort(
            (a, b) => b.salaryMax - a.salaryMax
        );

    }


    if (sortValue === "salary-low") {

        return jobList.sort(
            (a, b) => a.salaryMin - b.salaryMin
        );
    }

    return jobList;
}



function renderJobs() {

    let filteredJobs = filterJobs();
    filteredJobs = sortJobsList(filteredJobs);

    jobsContainer.innerHTML = "";

    jobCount.textContent = filteredJobs.length;


    if (filteredJobs.length === 0) {

        noJobs.classList.remove("hidden");
        return;
    }


    noJobs.classList.add("hidden");

    filteredJobs.forEach(job => {

        const jobCard = createJobCard(job);
        jobsContainer.appendChild(jobCard);

    });
}


/* search btn */

searchBtn.addEventListener("click", () => {

    currentSearch = searchInput.value.trim();
    currentLocation = locationInput.value.trim();
    renderJobs();

    document
        .querySelector(".jobs-section")
        .scrollIntoView({
            behavior: "smooth"
        });
});




searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});


locationInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});


/* filter buttons */

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        currentFilter =button.dataset.filter;
        renderJobs();

    });

});


/*sort */

sortJobs.addEventListener("change", () => {

    renderJobs();

});



resetSearch.addEventListener("click", () => {

    searchInput.value = "";
    locationInput.value = "";

    currentSearch = "";
    currentLocation = "";

    currentFilter = "all";


    filterButtons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.filter === "all") {
            button.classList.add("active");
        }

    });


    sortJobs.value = "recent";

    renderJobs();

});




renderJobs();



/*use login/logout */

const userName = document.getElementById("userName");
const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const logoutBtn = document.getElementById("logoutBtn");


// Logged-in user ko localStorage se lena
const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);


// Check karna user login hai ya nahi
if (loggedInUser) {

    
    userName.textContent = `Hi, ${loggedInUser.name}`;


    loginLink.style.display = "none";
    signupLink.style.display = "none";

    // Logout button show karna
    logoutBtn.style.display = "inline-block";

} else {

    // User login nahi hai
    userName.style.display = "none";
    logoutBtn.style.display = "none";

}



logoutBtn.addEventListener("click", function () {

    // Logged-in user remove karna
    localStorage.removeItem("loggedInUser");

    // Home page reload karna
    window.location.reload();

});