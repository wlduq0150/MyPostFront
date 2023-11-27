async function getPost(postId) {
    let writerId;
    try {
        const res = await axios.get(server + `/api/posts/${postId}`);
        post = res.data.data;
        $("#post-title").text(post.title);
        $("#post-date").text(post.createdAt.slice(0, 10));
        $("#post-body").html(post.content);
        $("#post-like-count").text(post.likes);
        $("#post-like-btn").click(async function () {
			try{
				const res = await axios.put(server + `/api/posts/${postId}/like`);
				$("#post-like-count").text(res.data.likes);
			}catch(e){
				alert(e.response?.message || "오류가 발생했습니다.")
			}
        });
        writerId = post.userId;
    } catch (e) {
        return alert(e.response?.message || "오류가 발생했습니다.")
    }
    try {
        const writer = await axios.get(server + `/api/user/${writerId}`);
        $("#post-writer").text(writer.data.data.name);
    } catch (e) {
        $("#post-writer").text("탈퇴한 사용자");
    }
}

async function getComments(postId) {
    let comments = [];
    try {
        const res = await axios.get(server + `/api/comments?postId=${postId}`);
        comments = res.data.postComments;
    } catch (e) {
        return alert(e.response?.message || "댓글을 불러오는 과정에서 오류가 발생했습니다.")
    }
    for (let comment of comments)
        try {
            const writer = await axios.get(server + `/api/user/${comment.userId}`);
            const commentBar = $(`<div class="comment-bar"></div>`);
            commentBar.append(`<p class="comment-writer">${writer.data.data.name}</p>
			<p class="comment-date">${comment.createdAt.slice(0, 10)}</p>
			<p>추천수 <span class="commment${comment.likes}</p>`);
            const commentLikeBtn = $(
                `<button class="comment-like-btn comment-btn">&#x1F44D;</button>`
            );
            commentLikeBtn.click(async function () {
                await axios.put(server+`/api/comments/${comment.id}/like`);
            });
            commentBar.append(commentLikeBtn);
            const editBtn = $(`<button class="edit-btn comment-btn">&#x270D;</button>`);
            editBtn.click(async function () {
                $(".comment-btn").each(function () {
                    $(this).attr("disabled", "true");
                });
                const newSubmit = $(`<button>수정</button>`);
                const commentBody = commentHTML.find(".comment-body");
				const originalComment = commentBody.text()
                commentBody.attr("contenteditable", "true");
                commentHTML.append(newSubmit);
                newSubmit.click(async function () {
					try{
						await axios.put(server+`/api/comments/${comment.id}`, {
							content: "commentBody.text()",
						});
					}catch(e){
						alert(e.response?.message || "오류가 발생했습니다.")
						commentBody.text(originalComment)
					}
                    newSubmit.remove();
                    commentBody.attr("contenteditable", "false");
                    $(".comment-btn").each(function () {
                        $(this).removeAttr("disabled");
                    });
                });
            });
            commentBar.append(editBtn);
            const deleteBtn = $(`<button class="delete-btn comment-btn">&#10006;</button>`);
            deleteBtn.click(async function () {
                const deleteVal = confirm("댓글을 삭제하겠습니까?");
                if (deleteVal){ 
					try{
						await axios.delete(server+`/api/comments/${comment.id}`);
					}catch(e){
						alert(e.response?.message || "오류가 발생했습니다.")
					}
					commentHTML.remove()
				}
            });
            commentBar.append(deleteBtn);
            const commentHTML = $(`<div class="comment"></div>`);
            commentHTML.append(commentBar);
            commentHTML.append(
                `<blockquote contenteditable="false" class="comment-body">${comment.content}</blockquote>`
            );
            $("#comments").append(commentHTML);
        } catch (e) {
            console.log(e);
        }
}
