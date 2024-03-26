function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the username (email) and password entered by the user
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve user data from localStorage based on the entered email (username)
    const userDataString = localStorage.getItem(username);
    console.log("Retrieved user data:", userDataString);
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        console.log("Parsed user data:", userData);
        // Check if the entered password matches the stored password
        if (password === userData.password) {
            console.log("Password matched.");
            // Redirect based on user type
            if (userData.userType === 'owner') {
                window.location.href = 'owner.html';
            } else if (userData.userType === 'coworker') {
                window.location.href = 'co-worker.html';
            }
    
        } else {
            alert('Invalid password. Please try again.');
        }
    } else {
        alert('User not found. Please sign up first.');
    }
}

document.querySelector('.login-form').addEventListener('submit', handleLogin);
