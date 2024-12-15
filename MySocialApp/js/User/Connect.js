function openProfileModal(userId) {
    // Fetch user data based on userId (this is just a placeholder)
    document.getElementById('modal-username').innerText = userId;
    document.getElementById('modal-description').innerText = "Profile details for " + userId;
    
    const modal = document.getElementById("profile-modal");
    modal.style.display = "block";
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeProfileModal() {
    const modal = document.getElementById("profile-modal");
    modal.style.display = "none";
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

function displayUserCards(){
    const userCards = document.querySelectorAll('.user-card');
    userCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`; // Stagger the animation
        card.style.display = 'block'; // Ensure cards are displayed
        card.style.animation = `slideIn 0.5s ease forwards, glide 5s ease infinite`; // Apply glide animation
    });
}
document.addEventListener('DOMContentLoaded', displayUserCards);