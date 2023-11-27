async function uploadProfile() {
    const response = await axios.get(server + `/api/user/${user.id}/followList`, {
        headers
    });

    const followList = response.data.followList;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const birth =  document.getElementById('birthdate');
    const followingList = document.getElementById("followingList");

    name.value = user.name;
    email.value = user.email;
    birth.value = user.birth.slice(0, 10);

    for (let fl of followList) {
        const res = await axios.get(server+`/api/user/${fl.followeeId}`);
        const user = res.data.data;

        console.log(user);

        const li = document.createElement("li");
        li.textContent = user.name;

        followingList.appendChild(li);
    }
}