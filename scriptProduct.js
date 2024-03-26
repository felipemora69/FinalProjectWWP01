document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const workspaceTitle = params.get('name');
    const category = params.get('category');
    const price = parseFloat(params.get('price'));
    const description = params.get('description');
    const location = params.get('location');
    const address = params.get('address');
    const area = params.get('area');
    const capacity = params.get('capacity');
    const smoking = params.get('smoking');
    const parking = params.get('parking');
    const distanceToTransport = params.get('distanceToTransport');
    const images = JSON.parse(params.get('images'));

    document.getElementById('workspace-title').textContent = workspaceTitle;
    document.getElementById('price').textContent = `Price: $${price} /h`;
    document.getElementById('description').textContent = description;
    document.getElementById('location').textContent = `Location: ${location}`;
    document.getElementById('address').textContent = address;
    document.getElementById('area').textContent = area + " m2";
    document.getElementById('capacity').textContent = capacity;
    const galleryElement = document.getElementById('image-gallery');
    let currentIndex = 0;

    // Show initial image
    const showImage = (index) => {
        galleryElement.innerHTML = ''; // Clear previous images
        const imgElement = document.createElement('img');
        imgElement.src = images[index];
        galleryElement.appendChild(imgElement);
    };

    // Show initial image
    showImage(currentIndex);

    // Next button 
    document.getElementById('nextButton').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    // Previous button
    document.getElementById('prevButton').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    // Calculate total price
    const calculateTotalPrice = () => {
        const startDate = new Date(document.querySelector('input[type="date"]').value);
        const endDate = new Date(document.querySelectorAll('input[type="date"]')[1].value);
        const startTime = new Date(`1970-01-01T${document.querySelectorAll('input[type="time"]')[0].value}`);
        const endTime = new Date(`1970-01-01T${document.querySelectorAll('input[type="time"]')[1].value}`);

        const startDateTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes());
        const endDateTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes());

        // Check if start date is before end date
        if (startDateTime >= endDateTime) {
            document.getElementById('total').textContent = 'Invalid dates';
            return;
        }

        // Check if start date and time are in the past
        const currentDate = new Date();
        if (startDate < currentDate || endDate < currentDate) {
            document.getElementById('total').textContent = 'Cannot book past dates';
            return;
        }

        const hoursDifference = (endDateTime - startDateTime) / (1000 * 60 * 60); // Difference in hours

        if (hoursDifference >= 0) {
            const totalPrice = price * hoursDifference;
            document.getElementById('total').textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            document.getElementById('total').textContent = 'Invalid dates or times';
        }
    };

    // Calculate total price when any date or time input changes
    document.querySelectorAll('input[type="date"], input[type="time"]').forEach(input => {
        input.addEventListener('change', calculateTotalPrice);
    });

    // Initial total calculation
    calculateTotalPrice();

    const servicesElement = document.getElementById('services');
    const servicesList = document.createElement('ul');

    const smokingItem = document.createElement('li');
    smokingItem.textContent = `Smoking: ${smoking === 'yes' ? 'Yes' : 'No'}`;
    servicesList.appendChild(smokingItem);

    const parkingItem = document.createElement('li');
    parkingItem.textContent = `Parking: ${parking === 'yes' ? 'Yes' : 'No'}`;
    servicesList.appendChild(parkingItem);

    const distanceToTransportItem = document.createElement('li');
    distanceToTransportItem.textContent = `Distance from public transportation: ${distanceToTransport} minutes walk`;
    servicesList.appendChild(distanceToTransportItem);

    servicesElement.appendChild(servicesList);
});



document.getElementById('rentNow').addEventListener('click', () => {
    const startDate = new Date(document.querySelector('input[type="date"]').value);
    const endDate = new Date(document.querySelectorAll('input[type="date"]')[1].value);
    const startTime = document.querySelectorAll('input[type="time"]')[0].value;
    const endTime = document.querySelectorAll('input[type="time"]')[1].value;

    // Check if dates are valid
    if (!isValidDate(startDate) || !isValidDate(endDate) || !isValidTime(startTime) || !isValidTime(endTime)) {
        alert('Please select valid dates and times.');
        return;
    }

    // Check if start date and time are in the past
    const currentDate = new Date();
    const startDateTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.split(':')[0], startTime.split(':')[1]);

    // Check if start date is before current date
    if (startDate < currentDate && !isSameDate(startDate, currentDate)) {
        alert('Cannot book past dates or current date');
        return;
    }

    const newBooking = {
        startDate,
        endDate,
        startTime,
        endTime
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // Check if the new booking overlaps with any existing booking
    const overlap = existingBookings.some(booking => {
        return (
            startDate.getTime() === new Date(booking.startDate).getTime() &&
            endDate.getTime() === new Date(booking.endDate).getTime() &&
            ((startTime >= booking.startTime && startTime < booking.endTime) ||
            (endTime > booking.startTime && endTime <= booking.endTime) ||
            (startTime <= booking.startTime && endTime >= booking.endTime))
        );
    });

    if (overlap) {
        alert('The dates and time chosen are unavailable. Please try with a different date or time.');
        return;
    }

    else if(startDate > endDate){
        alert('Please select valid dates and times.');
        return;
    }

    else if(startTime > endTime){
        alert('Please select valid dates and times.');
        return;
    }

    // If no overlap and dates are valid, add the new booking
    existingBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    // Show modal
    document.getElementById('myModal').style.display = "block";
});

function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
}

function isValidTime(timeString) {
    const timeRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;
    return timeRegex.test(timeString);
}

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('myModal').style.display = "none";
});

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'sections.html';
});

// Function to check if two dates are the same
function isSameDate(date1, date2) {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
}

// Check if modal has been shown before, if not, show it
if (!localStorage.getItem('modalShown')) {
    document.getElementById('myModal').style.display = "block";
    localStorage.setItem('modalShown', 'true');
} else {
    document.getElementById('myModal').style.display = "none";
}
