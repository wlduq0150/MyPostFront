function loginAlert() {
    alert("로그인이 필요합니다!");
}

let user;
let headers = {};

// AccessToken 검사 및 헤더에 추가하는 함수
async function checkAndAddTokenToHeaders() {
    // 로컬 스토리지에서 AccessToken 가져오기
    const accessToken = localStorage.getItem('accessToken');

    try {
        if (accessToken) {
            headers.accessToken = accessToken;
            const response = await axios.get(server + "/api/user/me", {
                headers
            });
            user = response.data.data;
            console.log(user);
        }
    } catch (e) {
        console.log(e);
    }
    // AccessToken이 존재하는지 확인
    
}