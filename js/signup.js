function checkDuplicateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    // Simulate email duplication check (replace with actual AJAX call)
    const isEmailDuplicate = Math.random() < 0.5;

    if (isEmailDuplicate) {
        emailError.textContent = '중복된 이메일입니다.';
    } else {
        emailError.textContent = '';
    }
}

function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordError = document.getElementById('passwordError');

    if (password !== confirmPassword) {
        passwordError.textContent = '비밀번호가 일치하지 않습니다.';
    } else {
        passwordError.textContent = '';
    }
}

 // Populate years dynamically
 const currentYear = new Date().getFullYear();
 const yearSelect = document.getElementById('year');
 for (let year = currentYear; year >= 1910; year--) {
     const option = document.createElement('option');
     option.value = year;
     option.textContent = year;
     yearSelect.appendChild(option);
 }

 // Populate months dynamically
 const monthSelect = document.getElementById('month');
 for (let month = 12; month >= 1; month--) {
     const option = document.createElement('option');
     option.value = month;
     option.textContent = month;
     monthSelect.appendChild(option);
 }

 // Populate days dynamically
 const daySelect = document.getElementById('day');
 for (let day = 1; day <= 31; day++) {
     const option = document.createElement('option');
     option.value = day;
     option.textContent = day;
     daySelect.appendChild(option);
 }

 async function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('signupForm'));

    // Format the date
    const year = formData.get('year');
    const month = formData.get('month');
    const day = formData.get('day');
    const birthDate = `${year}-${month.length === 1 ? "0" + month : month}-${day.length === 1 ? "0" + day : day}`;

    // Remove individual year, month, and day entries from the form data
    formData.delete('year');
    formData.delete('month');
    formData.delete('day');

    // Add the formatted date as 'birth' in the form data
    formData.append('birth', birthDate);

    console.log(formData.get("email"));

    let response;

    try {
        response = await axios.post(server + '/api/auth/signup', {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            passwordConfirm: formData.get("passwordConfirm"),
            birth: formData.get("birth")
        });
        response = response.data;
    } catch (e) {
        response = e.response.data;
    }

    console.log("error", response);

    if (response.ok) {
        // Successful signup
        alert('로그인에 성공하였습니다.');
        window.location.href = 'index.html';
    } else {
        // Failed signup
        alert(response.message);
    }
}

async function postData(url, data) {
    const response = await axios.post(server + url, data);
    return response;
}