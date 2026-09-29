const savedJobsContainer = document.getElementById("savedJobsContainer");
const savedJobCount = document.getElementById("savedJobCount");
const emptySavedJobs = document.getElementById("emptySavedJobs");


// Get saved job IDs from localStorage
function getSavedJobs() {
    return JSON.parse(
        localStorage.getItem("savedJobs")
    ) || [];
}


// Save updated jobs to localStorage
function updateSavedJobs(savedJobs) {
    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );
}


// Create a job card
function createSavedJobCard(job) {

    const card = document.createElement("article");

    card.className = "job-card";

    card.innerHTML = `
        <div class="job-card-top">

            <div class="company-info">

                <div class="company-logo"> ${job.logo} </div>

                <div>
                    <p class="company-name"> ${job.company}  </p>
                    <h3 class="job-title"> ${job.position} </h3>
                </div>

            </div>

            <button
                class="save-job saved" data-id="${job.id}"  title="Remove from saved jobs">
                
                ♥ </button>

        </div>


        <div class="job-details">

            <span class="job-detail">📍 ${job.location}</span>
            <span class="job-detail">💼 ${job.experience}</span>
            <span class="job-detail"> ◉ ${job.mode}</span>
            <span class="job-type">  ${formatJobType(job.type)} </span>

        </div>


        <div class="job-footer">

            <span class="salary">₹${job.salaryMin} - ₹${job.salaryMax} LPA </span>
            <span class="posted-time">${getPostedText(job.postedDays)}</span>

        </div>
    `;


    // Remove saved job
    const saveButton =card.querySelector(".save-job");

    saveButton.addEventListener("click", () => {
        removeSavedJob(job.id);

    });


    return card;
}


// Convert job type into readable text
function formatJobType(type) {

    const typeNames = {

        "full-time": "Full Time",
        "part-time": "Part Time",
        "internship": "Internship"

    };

    return typeNames[type] || type;
}


// Show posted time

function getPostedText(days) {

    if (days === 0) {
        return "Today";
    }
    if (days === 1) {
        return "1 day ago";
    }

    return `${days} days ago`;
}


// Remove a job from saved jobs
function removeSavedJob(jobId) {

    let savedJobs = getSavedJobs();
    savedJobs = savedJobs.filter(id => id !== jobId);

    updateSavedJobs(savedJobs);
    renderSavedJobs();
}


// Display saved jobs
function renderSavedJobs() {

    const savedJobIds = getSavedJobs();

    const savedJobs = jobs.filter(job => {
         return savedJobIds.includes(job.id);
    });


    savedJobsContainer.innerHTML = "";
    savedJobCount.textContent = savedJobs.length;

    if (savedJobs.length === 0) {

        emptySavedJobs.classList.remove("hidden");
        return;
    }


    emptySavedJobs.classList.add("hidden");

    savedJobs.forEach(job => {
        const jobCard = createSavedJobCard(job);
        savedJobsContainer.appendChild(jobCard);

    });
}


// Run when page loads
renderSavedJobs();