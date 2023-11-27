function uploadProfile() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const birth =  document.getElementById('birthdate');

    name.value = user.name;
    email.value = user.email;
    birth.value = user.birth.slice(0, 10);
}