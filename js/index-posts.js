// 포스트 데이터 불러오기
async function getPosts(type) {
    try {
        let posts;

        if (type === "all") {
            const response = await axios.get(server + "/api/posts", {
                headers
            });

            posts = response.data.data;
        } else if (type === "follow") {
            const response = await axios.get(server + "/api/posts/follow/only", {
                headers
            });

            posts = response.data.followPost;
            console.log(response);
            console.log(posts);
        }

        for (let post of posts) {
            createPostElement(post);
        }
    } catch (e) {
        if (e.response.status === 401) {
            loginAlert();
        }
        console.log(e);
    }
}

// 포스트 요소 전부 삭제
function clearPostElement() {
    const posts = document.querySelectorAll(".post");
    posts.forEach((post) => {
        post.remove();
    });
}

// 포스트 요소 생성
function createPostElement(postInfo) {
    const section = document.querySelector(".content");
    const post = document.createElement("article");
    post.classList.add("post");
    if (postInfo.thumbnail !== null) {
        post.innerHTML = `
            <img class="post-thumbnail" src="${postInfo.thumbnail}" style="width: 200px; height: 200px;">
            <h2>${postInfo.title}</h2>
            <p class="post-meta">날짜: ${postInfo.createdAt.slice(0, 10)} | <span class="writer">작성자: ${postInfo.user.name}</span> | 좋아요: ${postInfo.likes}</p>
            <p class="post-content">${postInfo.content.slice(0, 100)}</p>
        `;
    } else {
        post.innerHTML = `
            <h2>${postInfo.title}</h2>
            <p class="post-meta">날짜: ${postInfo.createdAt.slice(0, 10)} | <span class="writer">작성자: ${postInfo.user.name}</span> | 좋아요: ${postInfo.likes}</p>
            <p class="post-content">${postInfo.content.slice(0, 100)}</p>
        `;
    }

    console.log(postInfo);

    post.addEventListener("click", (e) => {
        location.href = `./post-detail.html?postId=${postInfo.id}`
    });

    section.appendChild(post);
}

window.onload = async () => {
    if (await checkAndAddTokenToHeaders()) {
        loginUser();
    }

    const allButton = document.querySelector("#allButton");
    const followButton = document.querySelector("#followButton");

    allButton.addEventListener("click", (e) => {
        clearPostElement();
        getPosts("all");
    });

    followButton.addEventListener("click", (e) => {
        clearPostElement();
        getPosts("follow");
    });

    document.querySelector(".postCreate").addEventListener("click", (e) => {
        location.href = "./posting.html";
    });

    getPosts("all");
};