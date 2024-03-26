document.addEventListener("DOMContentLoaded", async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCategory = urlParams.get('category');
        const selectedLocation = urlParams.get('location');
        const selectedPriceSort = urlParams.get('price');

        const workspaceContainer = document.getElementById('workspace-container');
        const searchInput = document.getElementById('searchInput');
        const locationFilter = document.getElementById('locationFilter');
        const priceSort = document.getElementById('priceSort');

        const workspaces = [
            // Personal Desktops
            { 
                name: "Personal Desktop Haven", 
                category: "personal-desktop", 
                price: 15, 
                description: "Escape distractions and delve into deep focus with your very own personal desktop setup. Equipped with ergonomic furnishings and state-of-the-art technology, this cozy nook is designed to optimize productivity and comfort. Located in bustling Toronto, this workspace oasis offers serenity amidst the urban bustle, allowing you to immerse yourself in your tasks without interruption.", 
                location: "Toronto",
                address: "123 Oak Street, Toronto, ON",
                area: 10,
                capacity: "1 person",
                smoking: "no",
                parking: "no",
                distanceToTransport: getRandomTime(),
                images:  ["images/personaldesktop1.1.jpg", "images/personaldektop1.2.jpg", "images/personaldektop1.3.jpg"] 
            },
            { 
                name: "Solo Workstation Retreat", 
                category: "personal-desktop", 
                price: 12, 
                description: "Indulge in uninterrupted productivity with our solo workstation retreat, designed for solitary work sessions and focused tasks. Nestled in scenic Vancouver, this tranquil space offers a serene environment away from the hustle and bustle, allowing you to concentrate without distractions. Equipped with ergonomic amenities and high-speed internet, this cozy nook is your sanctuary for optimal performance.", 
                location: "Vancouver",
                address: "456 Maple Avenue, Vancouver, BC",
                area: 8,
                capacity: "1 person",
                smoking: "no",
                parking: "yes",
                distanceToTransport: getRandomTime(),
                images:  ["images/personaldektop2.1.jpg"] 
            },
            { 
                name: "Efficiency Workspace", 
                category: "personal-desktop", 
                price: 18, 
                description: "Maximize your productivity in this efficiency workspace, meticulously designed for optimal workflow and comfort. Located in the heart of Calgary, this stylish nook offers a harmonious blend of functionality and aesthetics, providing a conducive environment for focused work. With ergonomic furnishings and abundant natural light, you can tackle your tasks with ease and efficiency in this inviting space.", 
                location: "Calgary",
                address: "789 Cedar Road, Calgary, AB",
                area: 12,
                capacity: "1 person",
                smoking: "no",
                parking: "no",
                distanceToTransport: getRandomTime(),
                images:  ["images/personaldesktop3.1.jpg", "images/personaldesktop3.2.jpg"] 
            },
            { 
                name: "Cozy Cubicle Retreat", 
                category: "personal-desktop", 
                price: 14, 
                description: "Find solace in this cozy cubicle retreat, a tranquil space designed for uninterrupted focus and deep work sessions. Situated in vibrant Edmonton, this secluded nook offers a peaceful ambiance away from distractions, allowing you to immerse yourself in your tasks with clarity and concentration. With ergonomic amenities and high-speed internet, this retreat is your sanctuary for optimal productivity.", 
                location: "Edmonton",
                address: "101 Elm Avenue, Edmonton, AB",
                area: 9,
                capacity: "1 person",
                smoking: "no",
                parking: "yes",
                distanceToTransport: getRandomTime(),
                images:  ["images/personaldesktop4.1.jpg"] 
            },
            { 
                name: "Compact Workstation Oasis", 
                category: "personal-desktop", 
                price: 16, 
                description: "Escape the hustle and bustle and retreat into this compact workstation oasis, meticulously designed for focused work and productivity. Located in Ottawa's bustling city center, this cozy nook offers a serene environment away from distractions, allowing you to concentrate with clarity and efficiency. With ergonomic amenities and high-speed internet, this retreat is your sanctuary for optimal performance.", 
                location: "Ottawa",
                address: "555 Pine Street, Ottawa, ON",
                area: 11,
                capacity: "1 person",
                smoking: "no",
                parking: "yes",
                distanceToTransport: getRandomTime(),
                images:  ["images/personaldesktop5.1.jpg", "images/personaldesktop5.2.jpg"] 
            },
        
            // Private Offices
            { 
                name: "Elite Executive Suite", 
                category: "private-office", 
                price: 30, 
                description: "Indulge in luxury and sophistication with our elite executive suite, tailored for discerning professionals. Situated in the heart of Vancouver, this meticulously designed space boasts premium amenities and top-notch services to elevate your working experience. From sleek furnishings to personalized concierge assistance, every detail is crafted to exceed expectations. Experience the epitome of corporate excellence in this exclusive enclave.", 
                location: "Vancouver",
                address: "369 Oakwood Drive, Vancouver, BC",
                area: 25,
                capacity: "1 person",
                smoking: "no",
                parking: "yes",
                distanceToTransport: getRandomTime(),
                images: ["images/privateoffice1.1.jpg"]
            },
            { 
                name: "Luxurious Executive Office", 
                category: "private-office", 
                price: 28, 
                description: "Elevate your corporate presence with our luxurious executive office, a prestigious workspace designed for maximum comfort and productivity. Nestled in scenic Toronto, this opulent suite offers an unparalleled blend of elegance and functionality, providing a conducive environment for focused work and strategic planning. With premium furnishings and personalized services, this executive retreat sets the standard for sophistication and success.", 
                location: "Toronto",
                address: "123 Oak Street, Toronto, ON",
                area: 20,
                capacity: "1 person",
                smoking: "no",
                parking: "no",
                distanceToTransport: getRandomTime(),
                images: ["images/privateoffice2.1.jpg"]
            },
            { 
                name: "Executive Corner Office", 
                category: "private-office", 
                price: 26, 
                description: "Command authority and prestige with our executive corner office, a spacious retreat designed for discerning professionals. Located in bustling Calgary, this exclusive suite offers panoramic views and premium amenities to enhance your working experience. From sleek furnishings to personalized concierge services, every aspect is tailored to meet your needs and exceed your expectations. Elevate your corporate stature and make a lasting impression in this prestigious workspace.", 
                location: "Calgary",
                address: "789 Cedar Road, Calgary, AB",
                area: 18,
                capacity: "1 person",
                smoking: "no",
                "parking": "no",
                distanceToTransport: getRandomTime(),
                images: ["images/privateoffice3.1.jpg",]
                },
                {
                name: "Executive Suite Oasis",
                category: "private-office",
                price: 32,
                description: "Escape the ordinary and embrace the extraordinary with our executive suite oasis, a luxurious retreat for discerning professionals. Nestled in the heart of Edmonton's vibrant downtown, this opulent workspace offers unrivaled comfort and sophistication, providing a serene environment for focused work and strategic planning. From premium furnishings to personalized concierge services, every detail is meticulously crafted to exceed expectations and inspire greatness. Elevate your corporate presence and make a statement of success in this prestigious enclave.",
                location: "Edmonton",
                address: "101 Elm Avenue, Edmonton, AB",
                area: 22,
                capacity: "1 person",
                smoking: "no",
                parking: "yes",
                distanceToTransport: getRandomTime(),
                images: ["images/privateoffice4.1.jpg", "images/privateoffice4.2.jpg"]
                },
                {
                name: "Premier Executive Office",
                category: "private-office",
                price: 34,
                description: "Experience unparalleled luxury and sophistication in our premier executive office, an exclusive enclave for discerning professionals. Situated in scenic Ottawa, this prestigious suite offers panoramic views and premium amenities to elevate your working experience. From elegant furnishings to personalized concierge services, every aspect is tailored to meet your needs and exceed your expectations. Discover the epitome of corporate excellence and make a lasting impression in this prestigious workspace.",
                location: "Ottawa",
                address: "555 Pine Street, Ottawa, ON",
                area: 24,
                capacity: "1 person",
                smoking: "no",
                parking: "yes",
                distanceToTransport: getRandomTime(),
                images: ["images/privateoffice5.1.jpg"]
                },

                {
                    name: "Executive Suite",
                    category: "private-office",
                    price: 180, 
                    description: "Elevate your workspace experience with our executive suite, designed for discerning professionals seeking luxury and privacy. Located in the heart of downtown Toronto, this exclusive office offers sophisticated furnishings, premium amenities, and stunning views of the city skyline. With ample space for meetings, brainstorming sessions, and focused work, our executive suite provides the ideal environment for productivity and success. Experience unparalleled comfort and convenience in this prestigious office setting.",
                    location: "Toronto",
                    address: "789 Bay Street, Toronto, ON",
                    area: 25, 
                    capacity: "1 person",
                    smoking: "no",
                    parking: "yes",
                    distanceToTransport: getRandomTime(), 
                    images: ["images/privateoffice6.1.webp", "images/privateoffice6.2.jpg"]
                },
                

                // Small Meeting Rooms 
{ 
    name: "Intimate Meeting Nook", 
    category: "small-meeting-room", 
    price: 25, 
    description: "Foster collaboration and creativity in our intimate meeting nook, a versatile space designed for small group discussions and brainstorming sessions. Located in vibrant Toronto, this cozy enclave offers a conducive environment for productive interactions and strategic planning. With state-of-the-art technology and ergonomic furnishings, you can host engaging meetings and presentations with ease and confidence. Fuel innovation and drive results in this dynamic meeting space.", 
    location: "Toronto",
    address: "123 Oak Street, Toronto, ON",
    area: 15,
    capacity: "1 to 5 people",
    smoking: "no",
    parking: "no",
    distanceToTransport: getRandomTime(),
    images:  ["images/smallmeetingroom1.1.jpg", "images/smallmeetingroom1.2.jpg", "images/smallmeetingroom1.3.jpg"] 
},
{ 
    name: "Creative Collaboration Hub", 
    category: "small-meeting-room", 
    price: 22, 
    description: "Inspire innovation and collaboration in our creative collaboration hub, a dynamic space designed for brainstorming sessions and team meetings. Nestled in scenic Vancouver, this versatile enclave offers a stimulating environment for ideation and problem-solving. With modern amenities and flexible seating arrangements, you can host engaging discussions and cultivate creative solutions with ease. Transform your ideas into reality in this vibrant meeting space.", 
    location: "Vancouver",
    address: "456 Maple Avenue, Vancouver, BC",
    area: 18,
    capacity: "1 to 5 people",
    smoking: "no",
    parking: "yes",
    distanceToTransport: getRandomTime(),
    images:  ["images/smallmeetingroom2.1.jpg"]
},
{ 
    name: "Innovative Idea Pod", 
    category: "small-meeting-room", 
    price: 20, 
    description: "Nurture innovation and collaboration in our innovative idea pod, a versatile space designed for brainstorming sessions and strategy meetings. Situated in bustling Calgary, this dynamic enclave offers a conducive environment for creative thinking and problem-solving. With modern amenities and flexible seating arrangements, you can host engaging discussions and cultivate innovative solutions with ease. Transform your ideas into reality in this vibrant meeting space.", 
    location: "Calgary",
    address: "789 Cedar Road, Calgary, AB",
    area: 12,
    capacity: "1 to 5 people",
    smoking: "no",
    parking: "no",
    distanceToTransport: getRandomTime(),
    images:  ["images/smallmeetingroom3.1.jpg", "images/smallmeetingroom3.2.jpg", "images/smallmeetingroom3.3.jpg", "images/smallmeetingroom3.4.jpg"] 
},
{ 
    name: "Brainstorming Chamber", 
    category: "small-meeting-room", 
    price: 23, 
    description: "Ignite creativity and collaboration in our brainstorming chamber, a dynamic space designed for brainstorming sessions and team meetings. Located in vibrant Edmonton, this versatile enclave offers a stimulating environment for ideation and problem-solving. With modern amenities and flexible seating arrangements, you can host engaging discussions and cultivate innovative solutions with ease. Transform your ideas into reality in this vibrant meeting space.", 
    location: "Edmonton",
    address: "101 Elm Avenue, Edmonton, AB",
    area: 14,
    capacity: "1 to 5 people",
    smoking: "no",
    parking: "yes",
    distanceToTransport: getRandomTime(),
    images:  ["images/smallmeetingroom4.1.jpg"] 
},
{ 
    name: "Collaboration Corner", 
    category: "small-meeting-room", 
    price: 21, 
    description: "Promote teamwork and innovation in our collaboration corner, a versatile space designed for brainstorming sessions and group discussions. Nestled in scenic Ottawa, this dynamic enclave offers a conducive environment for creative thinking and problem-solving. With modern amenities and flexible seating arrangements, you can host engaging meetings and cultivate innovative solutions with ease. Fuel collaboration and drive results in this vibrant meeting space.", 
    location: "Ottawa",
    address: "555 Pine Street, Ottawa, ON",
    area: 16,
    capacity: "1 to 5 people",
    smoking: "no",
    parking: "yes",
    distanceToTransport: getRandomTime(),
    images:  ["images/smallmeetingroom5.1.jpg", "images/smallmeetingroom5.2.jpg", "images/smallmeetingroom5.3.jpg"] 
},

// Big Meeting Rooms
{ 
    name: "Grand Boardroom", 
    category: "big-meeting-room", 
    price: 50, 
    description: "Conduct impactful meetings and presentations in our grand boardroom, a prestigious space designed for large gatherings and corporate events. Situated in vibrant Toronto, this expansive enclave offers ample seating and state-of-the-art technology to accommodate your every need. With panoramic views and elegant furnishings, you can impress clients and colleagues alike in this sophisticated setting. From high-stakes presentations to collaborative workshops, this versatile boardroom is your gateway to success in the heart of the city.",
    location: "Toronto",
    address: "123 Oak Street, Toronto, ON",
    area: 50,
    capacity: "5 to 10 people",
    smoking: "no",
    parking: "no",
    distanceToTransport: getRandomTime(),
    images: ["images/bigmeetingroom1.1.jpg"]
    },
    {
    name: "Executive Conference Suite",
    category: "big-meeting-room",
    price: 45,
    description: "Host impactful meetings and conferences in our executive conference suite, a spacious enclave designed for large gatherings and corporate events. Nestled in scenic Vancouver, this versatile space offers a sophisticated ambiance and state-of-the-art technology to enhance your presentations and discussions. With flexible seating arrangements and premium amenities, you can engage your audience and drive results in this prestigious setting.",
    location: "Vancouver",
    address: "456 Maple Avenue, Vancouver, BC",
    area: 60,
    capacity: "10 to 20 people",
    smoking: "no",
    parking: "yes",
    distanceToTransport: getRandomTime(),
    images: ["images/bigmeetingroom2.1.jpg"]
    },
    {
    name: "Corporate Meeting Hub",
    category: "big-meeting-room",
    price: 55,
    description: "Elevate your corporate gatherings and conferences in our corporate meeting hub, a versatile space designed for large-scale events and presentations. Located in bustling Calgary, this expansive enclave offers ample seating and state-of-the-art technology to accommodate your every need. With panoramic views and elegant furnishings, you can impress clients and colleagues alike in this sophisticated setting. From high-stakes presentations to collaborative workshops, this versatile meeting hub is your gateway to success in the heart of the city.",
    location: "Calgary",
    address: "789 Cedar Road, Calgary, AB",
    area: 70,
    capacity: "10 to 20 people",
    smoking: "no",
    parking: "no",
    distanceToTransport: getRandomTime(),
    images: ["images/bigmeetingroom3.1.jpg", "images/bigmeetingroom3.2.jpg", "images/bigmeetingroom3.3.jpg"]
    },
    {
    name: "Premium Presentation Chamber",
    category: "big-meeting-room",
    price: 60,
    description: "Impress your audience and elevate your presentations in our premium presentation chamber, a sophisticated space designed for impactful meetings and conferences. Situated in vibrant Edmonton, this expansive enclave offers ample seating and state-of-the-art technology to accommodate your every need. With panoramic views and elegant furnishings, you can captivate your audience and drive results in this prestigious setting. From corporate gatherings to educational seminars, this versatile chamber is your key to success in the heart of the city.",
    location: "Edmonton",
    address: "101 Elm Avenue, Edmonton, AB",
    area: 80,
    capacity: "10 to 20 people",
    smoking: "no",
    parking: "yes",
    distanceToTransport: getRandomTime(),
    images: ["images/bigmeetingroom4.1.jpg", "images/bigmeetingroom4.2.jpg"]
    },
    {
    name: "Strategic Meeting Arena",
    category: "big-meeting-room",
    price: 65,
    description: "Forge new alliances and drive strategic initiatives in our strategic meeting arena, a versatile space designed for large-scale presentations and collaborative workshops. Nestled in scenic Ottawa, this expansive enclave offers ample seating and state-of-the-art technology to accommodate your every need. With panoramic views and elegant furnishings, you can inspire innovation and foster collaboration in this prestigious setting. From executive summits to product launches, this dynamic arena is your catalyst for success in the heart of the city.",
    location: "Ottawa",
    address: "555 Pine Street, Ottawa, ON",
    area: 90,
    capacity: "10 to 20 people",
    smoking: "no",
    parking: "yes",
    distanceToTransport: getRandomTime(),
    images: ["images/bigmeetingroom5.1.jpg", "images/bigmeetingroom5.2.jpg"]
    },

    // Whole Floor Offices
{ 
    name: "Corporate Headquarters", 
    category: "whole-floor-office", 
    price: 250, 
    description: "Establish your corporate headquarters in our expansive office space, a prestigious enclave designed for large-scale operations and strategic initiatives. Situated in vibrant Toronto, this versatile workspace offers ample room for growth and expansion, accommodating your every need with ease and efficiency. From open-concept work areas to private meeting rooms, every aspect is meticulously crafted to enhance productivity and foster collaboration. Experience the epitome of corporate excellence in this dynamic workspace.", 
    location: "Toronto",
    address: "123 Oak Street, Toronto, ON",
    area: 200,
    capacity: "20 to 40 people",
    smoking: "no",
    parking: "no",
    distanceToTransport: getRandomTime(),
    images:  ["images/wholeflooroffice1.1.jpg", "images/wholeflooroffice1.2.jpg", "images/wholeflooroffice1.3.jpg", "images/wholeflooroffice1.4.jpg"]
    },
    {
    name: "Executive Office Tower",
    category: "whole-floor-office",
    price: 220,
    description: "Ascend to new heights of success in our executive office tower, a prestigious space designed for corporate headquarters and large-scale operations. Nestled in scenic Vancouver, this expansive enclave offers panoramic views and premium amenities to elevate your working experience. From open-concept work areas to private meeting rooms, every aspect is meticulously crafted to enhance productivity and foster collaboration. Experience the pinnacle of corporate excellence in this dynamic workspace.",
    location: "Vancouver",
    address: "456 Maple Avenue, Vancouver, BC",
    area: 180,
    capacity: "20 to 40 people",
    smoking: "no",
    parking: "yes",
    distanceToTransport: getRandomTime(),
    images: ["images/wholeflooroffice2.1.jpg", ]
    },
    {
    name: "Corporate Office Plaza",
    category: "whole-floor-office",
    price: 240,
    description: "Establish your corporate presence in our prestigious office plaza, a versatile space designed for large-scale operations and strategic initiatives. Situated in bustling Calgary, this expansive enclave offers ample room for growth and expansion, accommodating your every need with ease and efficiency. From sleek workstations to spacious meeting rooms, every aspect is meticulously crafted to enhance productivity and foster collaboration. Experience the pinnacle of corporate excellence in this dynamic workspace.",
    location: "Calgary",
    address: "789 Cedar Road, Calgary, AB",
    area: 220,
    capacity: "20 to 40 people",
    smoking: "no",
    parking: "no",
    distanceToTransport: getRandomTime(),
    images: ["images/wholeflooroffice3.1.jpg", "images/wholeflooroffice3.2.jpg", "images/wholeflooroffice3.3.jpg", "images/wholeflooroffice3.4.jpg"]
    },
    {
    name: "Corporate Office Tower",
    category: "whole-floor-office",
    price: 260,
    description: "Ascend to new heights of success in our executive office tower, a prestigious space designed for corporate headquarters and large-scale operations. Nestled in scenic Edmonton, this expansive enclave offers panoramic views and premium amenities to elevate your working experience. From open-concept work areas to private meeting rooms, every aspect is meticulously crafted to enhance productivity and foster collaboration. Experience the pinnacle of corporate excellence in this dynamic workspace.",
    location: "Edmonton",
    address: "101 Elm Avenue, Edmonton, AB",
    area: 240,
    capacity: "20 to 40 people",
    smoking: "no",
    parking: "yes",
    distanceToTransport: getRandomTime(),
    images: ["images/wholeflooroffice4.1.jpg", "images/wholeflooroffice4.2.jpg", "images/wholeflooroffice4.3.jpg"]
    },
    {
    name: "Corporate Office Plaza",
    category: "whole-floor-office",
    price: 280,
    description: "Establish your corporate presence in our prestigious office plaza, a versatile space designed for large-scale operations and strategic initiatives. Situated in bustling Ottawa, this expansive enclave offers ample room for growth and expansion, accommodating your every need with ease and efficiency. From sleek workstations to spacious meeting rooms, every aspect is meticulously crafted to enhance productivity and foster collaboration. Experience the pinnacle of corporate excellence in this dynamic workspace.",
    location: "Ottawa",
    address: "555 Pine Street, Ottawa, ON",
    area: 260,
    capacity: "20 to 40 people",
    smoking: "no",
    parking: "yes",
    distanceToTransport: getRandomTime(),
    images: ["images/wholeflooroffice5.1.jpg", "images/wholeflooroffice5.2.jpg"]
    },

    // Venues
{ 
    name: "Versatile Event Hall", 
    category: "for-events", 
    price: 150, 
    description: "Host memorable events and celebrations in our versatile event hall, a spacious venue designed for weddings, receptions, and corporate gatherings. Situated in vibrant Toronto, this elegant space offers customizable layouts and state-of-the-art amenities to bring your vision to life. From intimate ceremonies to grand receptions, every event is elevated to new heights of sophistication and style. Make your special occasions truly unforgettable in this dynamic event space.", 
    location: "Toronto",
    address: "123 Oak Street, Toronto, ON",
    area: 300,
    capacity: "50 to 100+ people",
    smoking: "no",
    parking: "no",
    distanceToTransport: getRandomTime(),
    images:  ["images/venue1.1.jpg", "images/venue1.2.jpg"]
},
{ 
    name: "Elegant Banquet Hall", 
    category: "for-events", 
    price: 180, 
    description: "Celebrate life's special moments in our elegant banquet hall, a sophisticated venue designed for weddings, galas, and corporate events. Nestled in scenic Vancouver, this luxurious space offers exquisite decor and impeccable service to create unforgettable memories. From gourmet cuisine to personalized concierge assistance, every detail is tailored to exceed expectations and delight guests. Whether you're planning a lavish wedding or a corporate gala, our versatile banquet hall sets the stage for an extraordinary experience.",
    location: "Vancouver",
    address: "456 Maple Avenue, Vancouver, BC",
    area: 350,
    capacity: "50 to 100+ people",
    smoking: "no",
    parking: "yes",
    distanceToTransport: getRandomTime(),
    images: ["images/venue2.1.jpg", "images/venue2.2.jpg"]
    },
    {
    name: "Grand Event Pavilion",
    category: "for-events",
    price: 200,
    description: "Make a statement with your events in our grand event pavilion, a spectacular venue designed for weddings, galas, and corporate functions. Located in bustling Calgary, this expansive space offers customizable layouts and premium amenities to bring your vision to life. From elegant receptions to high-profile launches, every event is elevated to new heights of luxury and sophistication. Create unforgettable memories in this dynamic event space.",
    location: "Calgary",
    address: "789 Cedar Road, Calgary, AB",
    area: 400,
    capacity: "50 to 100+ people",
    smoking: "no",
    parking: "no",
    distanceToTransport: getRandomTime(),
    images: ["images/venue3.1.jpg", "images/venue3.2.jpg"]
    },
    {
    name: "Luxurious Event Palace",
    category: "for-events",
    price: 220,
    description: "Experience luxury and opulence in our luxurious event palace, an exquisite venue designed for grand weddings, galas, and corporate affairs. Nestled in scenic Edmonton, this prestigious space offers breathtaking architecture and unparalleled service to create unforgettable moments. From gourmet cuisine to personalized event planning, every detail is meticulously crafted to exceed expectations and dazzle guests. Elevate your events to new heights of sophistication and style in this majestic palace.",
    location: "Edmonton",
    address: "101 Elm Avenue, Edmonton, AB",
    area: 450,
    capacity: "50 to 100+ people",
    smoking: "no",
    parking: "yes",
    distanceToTransport: getRandomTime(),
    images: ["images/venue4.1.jpg", "images/venue4.2.jpg", "images/venue4.3.jpg"]
    },
    {
    name: "Extravagant Event Manor",
    category: "for-events",
    price: 250,
    description: "Step into luxury and elegance in our extravagant event manor, a regal venue designed for grand weddings, galas, and corporate functions. Located in scenic Ottawa, this historic space offers timeless charm and modern amenities to create unforgettable memories. From opulent ballrooms to lush gardens, every aspect is tailored to exceed expectations and leave a lasting impression. Make your events truly unforgettable in this majestic manor.",
    location: "Ottawa",
    address: "555 Pine Street, Ottawa, ON",
    area: 500,
    capacity: "50 to 100+ people",
    smoking: "no",
    parking: "yes",
    distanceToTransport: getRandomTime(),
    images: ["images/venue5.1.jpg"]
    }
    ];    
                
    function getRandomTime() {
        return Math.floor(Math.random() * (60 - 5 + 1)) + 5; 
        }


let data = workspaces; // Use all workspaces initially

// Filter workspaces by the selected category
if (selectedCategory) {
    data = data.filter(workspace => workspace.category === selectedCategory);
}

// Sorting by price
data.sort((a, b) => a.price - b.price);

renderWorkspaces(data);
renderTitle(selectedCategory);

// Search functionality
searchInput.addEventListener('input', () => {
    applyFilters(data);
});

// Filtering and sorting
locationFilter.addEventListener('change', () => {
    applyFilters(data);
});
priceSort.addEventListener('change', () => {
    applyFilters(data);
});

const workspaceTitles = document.querySelectorAll('.workspace-title');

workspaceTitles.forEach(title => {
    title.addEventListener('click', () => {
        const workspaceName = title.textContent; // Get workspace name
        const workspace = data.find(workspace => workspace.name === workspaceName); // Find the workspace object
        const params = new URLSearchParams({
            name: workspace.name,
            category: workspace.category,
            price: workspace.price,
            description: workspace.description,
            location: workspace.location,
            address: workspace.address,
            area: workspace.area,
            capacity: workspace.capacity,
            distanceToTransport: workspace.distanceToTransport,
            images: JSON.stringify(workspace.images)
        });
        window.location.href = `product.html?${params.toString()}`;
    });
});

} catch (error) {
console.error('Error rendering data.', error);
}
});

function renderTitle(category) {
const titleContainer = document.getElementById('section-title');
titleContainer.textContent = getCategoryTitle(category);
}

function getCategoryTitle(category) {
switch(category) {
case 'personal-desktop':
    return 'Personal Desktops';
case 'private-office':
    return 'Private Offices';
case 'small-meeting-room':
    return 'Small Meeting Rooms';
case 'big-meeting-room':
    return 'Big Meeting Rooms';
case 'whole-floor-office':
    return 'Whole Floor Offices';
case 'for-events':
    return 'Venues';
default:
    return 'All Workspaces';
}
}



function applyFilters(data) {
let filteredData = [...data]; 

const searchInput = document.getElementById('searchInput').value.toLowerCase();
const selectedLocation = document.getElementById('locationFilter').value;
const selectedOption = document.getElementById('priceSort').value;

// Search filtering
filteredData = filteredData.filter(workspace => {
const searchTerms = searchInput.split(' ');
return searchTerms.some(term => workspace.name.toLowerCase().includes(term));
});

// Location filtering
if (selectedLocation) {
filteredData = filteredData.filter(workspace => workspace.location === selectedLocation);
}

// Sorting by price
if (selectedOption === 'asc') {
filteredData.sort((a, b) => a.price - b.price);
} else if (selectedOption === 'desc') {
filteredData.sort((a, b) => b.price - a.price);
}

renderWorkspaces(filteredData);
}

function renderWorkspaces(data) {
const workspaceContainer = document.getElementById('workspace-container');
workspaceContainer.innerHTML = '';

if (data.length === 0) {
renderNoResults(workspaceContainer);
return;
}

data.forEach(workspace => {
// Element creation
const workspaceElement = document.createElement('div');
workspaceElement.classList.add('workspace');

const titleElement = document.createElement('h2');
titleElement.textContent = workspace.name;
titleElement.classList.add('workspace-title');


const galleryElement = document.createElement('div');
galleryElement.classList.add('image-gallery');
galleryElement.dataset.currentIndex = 0;
workspace.images.forEach((image, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = image;
    imgElement.style.display = index === 0 ? 'block' : 'none';
    galleryElement.appendChild(imgElement);
});

const buttonPrev = document.createElement('button'); 
buttonPrev.innerHTML = '<i class="bx bx-chevron-left"></i>';
buttonPrev.classList.add('gallery-button', 'prev-button');
buttonPrev.addEventListener('click', () => navigateGallery(workspaceElement, -1));

const buttonNext = document.createElement('button');
buttonNext.innerHTML = '<i class="bx bx-chevron-right"></i>';
buttonNext.classList.add('gallery-button', 'next-button');
buttonNext.addEventListener('click', () => navigateGallery(workspaceElement, 1));


const priceElement = document.createElement('p');
priceElement.textContent = `Price: $${workspace.price}/h`;
priceElement.classList.add('price');

const locationElement = document.createElement('p');
locationElement.textContent = `Location: ${workspace.location}`;
locationElement.classList.add('location');

// Append
workspaceElement.appendChild(titleElement);
workspaceElement.appendChild(galleryElement);
workspaceElement.appendChild(buttonPrev);
workspaceElement.appendChild(buttonNext);
workspaceElement.appendChild(priceElement);
workspaceElement.appendChild(locationElement);
workspaceContainer.appendChild(workspaceElement);
});
}

function renderNoResults(container) {
// Clear previous workspaces
container.innerHTML = '';

const noResultsElement = document.createElement('p');
noResultsElement.textContent = 'No results found.';
container.appendChild(noResultsElement);
}

document.getElementById('backButton').addEventListener('click', () => {
window.location.href = 'FindaWorkspace.html';
});

function navigateGallery(workspaceElement, direction) {
const gallery = workspaceElement.querySelector('.image-gallery');
let currentIndex = parseInt(gallery.dataset.currentIndex);
const images = gallery.querySelectorAll('img');

currentIndex = (currentIndex + direction + images.length) % images.length;

images.forEach((image, index) => {
image.style.display = index === currentIndex ? 'block' : 'none';
});

gallery.dataset.currentIndex = currentIndex;
}

