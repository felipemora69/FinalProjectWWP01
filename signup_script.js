// Function to reset the checkboxes
function resetCheckboxes() {
    const ownerCheckbox = document.getElementById("owner");
    const coworkerCheckbox = document.getElementById("coworker");
    ownerCheckbox.disabled = false;
    coworkerCheckbox.disabled = false;
}

// checkbox changes
document.getElementById("owner").addEventListener("change", function(event) {
    const coworkerCheckbox = document.getElementById("coworker");
    if (this.checked) {
        coworkerCheckbox.checked = false; 
        coworkerCheckbox.disabled = true; 
    } else {
        coworkerCheckbox.disabled = false; 
    }
});

document.getElementById("coworker").addEventListener("change", function(event) {
    const ownerCheckbox = document.getElementById("owner");
    if (this.checked) {
        ownerCheckbox.checked = false;
        ownerCheckbox.disabled = true; 
    } else {
        ownerCheckbox.disabled = false; 
    }
});

// Function to validate password
function isValidPassword(password) {
    console.log("Validating password:", password);
    // Password must contain at least one capital letter, one lowercase letter, one number, and be at least 8 characters long
    var capitalRegex = /[A-Z]/;
    var lowercaseRegex = /[a-z]/;
    var numberRegex = /[0-9]/;
    var isValid = password.length >= 8 && capitalRegex.test(password) && lowercaseRegex.test(password) && numberRegex.test(password);
    console.log("Password is valid:", isValid);
    console.log("Length:", password.length);
    console.log("Capital:", capitalRegex.test(password));
    console.log("Lowercase:", lowercaseRegex.test(password));
    console.log("Number:", numberRegex.test(password));
    return isValid;
}

// form submission
document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var fullname = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var isOwner = document.getElementById("owner").checked;

    // Validate password
    if (!isValidPassword(password)) {
        document.getElementById("password-error").textContent = "Password must contain at least one capital letter, one lowercase letter, one number, and be at least 8 characters long.";
        return; // Stop form submission
    }

   // Store user information in localStorage
var userData = {
    fullname: fullname,
    email: email,
    phone: phone,
    password: password,
    userType: isOwner ? "owner" : "coworker"
};

// Convert userData to JSON and store it in localStorage
localStorage.setItem(email, JSON.stringify(userData));

// Set user email for retrieval in owner.html
localStorage.setItem("userEmail", email);
var redirectUrl = isOwner ? 'owner.html' : 'co-worker.html'; // Corrected URL
window.location.href = redirectUrl;

});