function loginAlert() {
    alert("로그인이 필요합니다!");
}

let user;
let headers = {};

// AccessToken 검사 및 헤더에 추가하는 함수
async function checkAndAddTokenToHeaders() {
    // 로컬 스토리지에서 AccessToken 가져오기
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    try {
        if (accessToken) {
            headers.accessToken = accessToken;
            headers.refreshToken = refreshToken;
            const response = await axios.get(server + "/api/user/me", {
                headers
            });
            user = response.data.data;
            
            if (user) {
                return true;
            }
        }
        return false;
    } catch (e) {
        console.log(e);
    }
    // AccessToken이 존재하는지 확인
}

function loginUser() {
    const auth = document.querySelector(".auth");
    if (auth.children[0].classList[0].includes("login")) {
        auth.children[0].remove();
    } else {
        return;
    }

    const postCreate = document.querySelector(".postCreate");
    postCreate.parentElement.style.display = "flex";

    auth.innerHTML = `
        <button class="username">${user.name}</button>
        <button class="logout">로그아웃</button>
    `

    auth.querySelector(".logout").addEventListener("click", (e) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        location.reload();
    });

}