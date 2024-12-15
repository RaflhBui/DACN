document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Submit form');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username, password); // Kiểm tra dữ liệu nhập vào

    const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    // if (response.ok) {
    //     const data = await response.json();
    //     alert('Đăng ký thành công');
    //     console.log('JWT Token:', data.token); // Kiểm tra token được trả về
    //     localStorage.setItem('token', data.token); // Lưu token vào localStorage
    // } else {
    //     alert('Đăng ký thất bại');
    // }
    if (response.ok) {
        const data = await response.json();
        alert('Đăng ký thành công');
        console.log('JWT Token:', data.token); // Kiểm tra token được trả về
        localStorage.setItem('token', data.token); // Lưu token vào localStorage

        setTimeout(() => {
            window.location.href = `${window.location.origin}/index.html`; // Chuyển hướng về trang chính
        }, 1000); // Chờ 1 giây để giao diện cập nhật
    } else {
        alert('Đăng ký thất bại');
    }
});