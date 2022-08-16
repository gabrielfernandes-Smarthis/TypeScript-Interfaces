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
