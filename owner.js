document.getElementById('create-property').addEventListener('click', function() {
    window.location.href = 'createWorkspace.html';
});
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve user email from localStorage
    var userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
        // Retrieve user data using the email as the key
        var userDataString = localStorage.getItem(userEmail);
        if (userDataString) {
            var userData = JSON.parse(userDataString);
            // User information fields
            document.getElementById("name").textContent = userData.fullname;
            document.getElementById("email").textContent = userData.email;
            document.getElementById("phoneNumber").textContent = userData.phone;
        }
    }
});
// Retrieve workspace data from localStorage
var workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];

// P"My Properties" section with stored workspaces
var propertiesContainer = document.getElementById("properties-container");
        workspaces.forEach(function(workspace, index) {
            var propertyDiv = document.createElement("div");
            propertyDiv.classList.add("property");

            var propertyDetails = document.createElement("div");
            propertyDetails.innerHTML = `
                <strong>Name:</strong> ${workspace.name} <button class="edit-button" data-index="${index}" data-field="name">Edit</button><br>
                <strong>Category:</strong> ${workspace.category} <button class="edit-button" data-index="${index}" data-field="category">Edit</button><br>
                <strong>Price:</strong> ${workspace.price} <button class="edit-button" data-index="${index}" data-field="price">Edit</button><br>
                <strong>Description:</strong> ${workspace.description} <button class="edit-button" data-index="${index}" data-field="description">Edit</button><br>
                <strong>Location:</strong> ${workspace.location} <button class="edit-button" data-index="${index}" data-field="location">Edit</button><br>
                <strong>Address:</strong> ${workspace.address} <button class="edit-button" data-index="${index}" data-field="address">Edit</button><br>
                <strong>Area:</strong> ${workspace.area} <button class="edit-button" data-index="${index}" data-field="area">Edit</button><br>
                <strong>Capacity:</strong> ${workspace.capacity} <button class="edit-button" data-index="${index}" data-field="capacity">Edit</button><br>
                <strong>Smoking:</strong> ${workspace.smoking} <button class="edit-button" data-index="${index}" data-field="smoking">Edit</button><br>
                <strong>Parking:</strong> ${workspace.parking} <button class="edit-button" data-index="${index}" data-field="parking">Edit</button><br>
                <strong>Distance to Transport:</strong> ${workspace.distanceToTransport} minutes <button class="edit-button" data-index="${index}" data-field="distanceToTransport">Edit</button><br>
                <strong>Images:</strong> <div class="image-gallery">${workspace.images.map(image => `<img src="${image}" alt="Image">`).join('')}</div>
                <button class="delete-button" data-index="${index}">Delete Property</button>
                `;
            propertyDiv.appendChild(propertyDetails);
            propertiesContainer.appendChild(propertyDiv);
        });

        // edit buttons
        document.querySelectorAll('.edit-button').forEach(function(button) {
            button.addEventListener('click', function() {
                var index = this.dataset.index;
                var field = this.dataset.field;
                var newValue = prompt(`Enter new value for ${field}:`);
                if (newValue !== null) {
                    workspaces[index][field] = newValue;
                    localStorage.setItem('workspaces', JSON.stringify(workspaces));
                    location.reload(); // Refresh the page to reflect the changes
                }
            });
        });

        //delete button
        document.querySelectorAll('.delete-button').forEach(function(button) {
            button.addEventListener('click', function() {
                var index = this.dataset.index;
                workspaces.splice(index, 1); // Remove the workspace at the specified index
                localStorage.setItem('workspaces', JSON.stringify(workspaces)); // Update localStorage
                location.reload(); // Refresh the page to reflect the changes
            });
        });