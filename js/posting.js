let thumbnailURL = "";

$(".imageSubmit").click(async function () {
    let url;
    const mean = confirm(
        "파일을 직접 올리시면 위의 파일 탐색기로 파일을 찾으신 후 확인을, url을 올리시면 취소를 눌러주세요."
    );
    if (mean) {
        const formData = new FormData();
        const imagefile = document.querySelector("#file");
        formData.append("image", imagefile.files[0]);
        const res = await axios.post(server + "/api/posts/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        url = res.data.data.image;
    } else {
        url = prompt("이미지 url을 입력해주세요");
        console.log(url);
    }
    const msg = $("#postContent").val();
    const spos = $("#postContent").prop("selectionStart");
    const epos = $("#postContent").prop("selectionEnd");
    const msg1 = msg.substring(0, spos);
    const msg2 = msg.substring(epos, msg.length);
    $("#postContent").val(msg1 + `<img src="${url}">\n` + msg2);
});

$(".thumbnailSubmit").click(async function () {
    const formData = new FormData();
    const imagefile = document.querySelector("#thumbnail");
    formData.append("image", imagefile.files[0]);
    const res = await axios.post(server + "/api/posts/image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    thumbnailURL = res.data.data.image;
});

$("#createPostForm").on("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData();
    const imagefile = document.querySelector("#thumbnail");
    formData.append("thumbnail", imagefile.files[0]);
    formData.append("content", $("#postContent").val());
    formData.append("title", $("#postTitle").val());
    await axios.post(server + "/api/posts", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
});
