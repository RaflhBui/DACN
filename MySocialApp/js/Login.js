document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Submit form'); // Kiểm tra xem sự kiện có được gọi hay không
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('Username:', username); // Kiểm tra dữ liệu nhập vào
    console.log('Password:', password); // Kiểm tra dữ liệu nhập vào

    const response = await fetch('http://localhost:8081/api/auth/login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    console.log('Response status:', response.status); // Kiểm tra trạng thái phản hồi

    if (response.ok) {
        const data = await response.json();
        alert('Đăng nhập thành công');
        localStorage.setItem('token', data.token);
        console.log('Token saved:', data.token); // Kiểm tra token đã lưu

        // Update the login button
        const loginBtn = document.querySelector('.cta-button a');
        const logoutBtn = document.getElementById('logout-btn');

        if (loginBtn) {
            const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
            const username = decodedToken.sub || 'User';
            loginBtn.innerHTML = username;
            loginBtn.href = "/pages/Login.html";
            loginBtn.classList.add('logged-in'); // Thêm lớp để chỉ ra trạng thái đã đăng nhập
            console.log('Login button updated:', loginBtn.innerHTML); // Kiểm tra cập nhật nút đăng nhập
        }

        if (logoutBtn) {
            logoutBtn.style.display = 'block'; // Hiển thị nút đăng xuất
            console.log('Logout button displayed'); // Kiểm tra hiển thị nút đăng xuất
        }

        setTimeout(() => {
            window.location.href = `${window.location.origin}/index.html`;
        }, 1000);
    } else {
        alert('Đăng nhập thất bại');
        console.log('Login failed'); // Kiểm tra khi đăng nhập thất bại
    }
});