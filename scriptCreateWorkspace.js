document.getElementById("workspaceForm").addEventListener("submit", function(event) {
    event.preventDefault();

    //get elements from form
    var name = document.getElementById("name").value;
    var category = document.getElementById("category").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;
    var location = document.getElementById("location").value;
    var address = document.getElementById("address").value;
    var area = document.getElementById("area").value;
    var capacity = document.getElementById("capacity").value;
    var smoking = document.getElementById("smoking").value;
    var parking = document.getElementById("parking").value;
    var distanceToTransport = document.getElementById("distanceToTransport").value;

    // Create workspace object
    var workspace = {
        name: name,
        category: category,
        price: price,
        description: description,
        location: location,
        address: address,
        area: area,
        capacity: capacity,
        smoking: smoking,
        parking: parking,
        distanceToTransport: distanceToTransport,
        images: []
    };

    //images
    const images = document.getElementById('images').files;
        
    let processedImagesCount = 0; // Counter to track processed images

    for (let i = 0; i < images.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(images[i]);
        reader.onload = () => {
            workspace.images.push(reader.result);
            processedImagesCount++; 
            if (processedImagesCount === images.length) {
                var workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
                workspaces.push(workspace);
                localStorage.setItem('workspaces', JSON.stringify(workspaces));
                document.getElementById("workspaceForm").reset();
                location.reload();
                // Alert for successful creation
                alert("Workspace created successfully!");
            }
        };
    }
});
