function loginAlert() {
    alert("로그인이 필요합니다!");
}

const loginButton = document.querySelector(".login");

loginButton.addEventListener("click", (e) => {
    const response = axios.post(server+"/api/auth/signin", {
        email: "test@email.com",
        password: "test1234"
    });

    console.log(response);
});