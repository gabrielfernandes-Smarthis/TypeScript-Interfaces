const users = [];
async function fetchUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    if (user.message) {
        console.error("User not found");
    }
    else {
        users.push(user);
        console.log(`User ${user.login} added successfully\n` +
            `\nid: ${user.id}` +
            `\nlogin: ${user.login}` +
            `\nName: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nPublic Repositories: ${user.public_repos}`);
    }
}
async function showUserRepos(username) {
    const user = users.find((user) => user.login === username);
    if (typeof user === "undefined") {
        console.error("User not found");
    }
    else {
        const response = await fetch(user.repos_url);
        const userRepos = await response.json();
        let message = `\nid: ${user.id}` +
            `\nlogin: ${user.login}` +
            `\nName: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nPublic Repositories: ${user.public_repos}\n`;
        userRepos.forEach((repo) => {
            message +=
                `\nName: ${repo.name}` +
                    `\nDescription: ${repo.description}` +
                    `\nStars: ${repo.stargazers_count}` +
                    `\n It's a fork: ${repo.fork ? "Yes" : "No"}\n`;
        });
        console.log(message);
    }
}
function showAllUsers() {
    let message = "Users:\n";
    users.forEach((user) => {
        message += `\n- ${user.login}`;
    });
    alert(message);
}
function showReposTotal() {
    const reposTotal = users.reduce((accumulator, user) => accumulator + user.public_repos, 0);
    alert(`The group has a total of ${reposTotal} public repositories`);
}
function showTopFive() {
    const topFive = users
        .slice()
        .sort((a, b) => b.public_repos - a.public_repos)
        .slice(0, 5);
    let message = "Top 5 user with more public repositories:\n";
    topFive.forEach((user, index) => {
        message += `\n${index + 1} - ${user.login}: ${user.public_repos} repositories`;
    });
    alert(message);
}
