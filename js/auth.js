//sign up

const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");


if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        // Page reload hone se rokna
        event.preventDefault();


        // Input values lena
        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;


        // Password match check
        if (password !== confirmPassword) {

            signupMessage.textContent = "Passwords do not match.";
            signupMessage.style.color = "red";

            return;
        }


        // Existing users lena
        const users = JSON.parse(localStorage.getItem("users")) || [];


        // Check email already registered hai ya nahi
        const existingUser = users.find(function (user) {

            return user.email === email;

        });


        if (existingUser) {

            signupMessage.textContent = "Email is already registered.";
            signupMessage.style.color = "red";

            return;
        }


        // New user
        const newUser = {
            name: name,
            email: email,
            password: password
        };


        // User ko array mein add karna
        users.push(newUser);

        // localStorage mein save karna
        localStorage.setItem("users", JSON.stringify(users));


        // Success message
        signupMessage.textContent = "Account created successfully!";
        signupMessage.style.color = "green";


        // Login page par redirect
        setTimeout(function () {
             window.location.href = "login.html";

        }, 1000);

    });

}

 
//login

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");


if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        // Page reload hone se rokna
        event.preventDefault();


        // Input values lena
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;


        // Saved users lena
        const users = JSON.parse(localStorage.getItem("users")) || [];


        // User find karna
        const user = users.find(function (user) {

            return user.email === email &&  user.password === password;

        });


        // User nahi mila
        if (!user) {

            loginMessage.textContent = "Invalid email or password.";
            loginMessage.style.color = "red";

            return;
        }


        // Login successful
        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";


        // Logged-in user ko save karna
        localStorage.setItem("loggedInUser", JSON.stringify(user));


        // Home page par redirect
        setTimeout(function () {

            window.location.href = "index.html";

        }, 1000);

    });

}