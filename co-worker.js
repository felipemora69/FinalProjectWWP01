//retrieve user info from local storage
document.addEventListener("DOMContentLoaded", function() {
    var userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
        // Retrieve user data using the email as the key
        var userDataString = localStorage.getItem(userEmail);
        if (userDataString) {
            var userData = JSON.parse(userDataString);
            // Fill out user fields
            document.getElementById("name").textContent = userData.fullname;
            document.getElementById("email").textContent = userData.email;
            document.getElementById("phoneNumber").textContent = userData.phone;
        }
    }
});
