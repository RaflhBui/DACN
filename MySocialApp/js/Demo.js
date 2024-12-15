document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', () => {
        showModal('Cảm ơn bạn đã thích bài viết!');
    });
});

document.querySelectorAll('.comment-button').forEach(button => {
    button.addEventListener('click', () => {
        showModal('Chức năng bình luận sẽ sớm có mặt!');
    });
});

// Hàm hiển thị modal
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

// Đóng modal khi nhấn vào nút đóng
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

// Đóng modal khi nhấn ra ngoài modal
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};