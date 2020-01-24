
//User object
const me = {
  name: 'ddhorstman',
  followingArray: []
};

showCardAndFollowers(me, true);

/** Retrieve info from the GitHub API for a given user
 * and create a card for them, as well as all of their followers.
 * 
 * @param {Object} user An object with a 'name' containing your GitHub username
 * and an empty 'followingArray'
 * @param {boolean} showFollowers true if you want to show follower info, false otherwise
 */
function showCardAndFollowers(user, showFollowers) {
  axios
    .get('https://api.github.com/users/' + user.name)
    .then(
      res => {
        document.querySelector('.cards')
          .appendChild(createGitHubCard(res.data));
        return axios.get('https://api.github.com/users/' + user.name + '/following');
    })
    .then(res =>
      res.data.forEach(
        u => user.followingArray.push({name: u.login, followingArray: []})
    ))
    .then(() => {
      if(showFollowers)
      user.followingArray.forEach(u =>
        //Using 'true' here instead will infinitely add followers recursively
        //Resist the temptation
        showCardAndFollowers(u, false)
      );
    });
}

/** Generates a card based on a provided user object from the GitHub API.
 * 
 * @param {Object} user A user object retrieved from 'https://api.github.com/users/<username>'
 * @returns {HTMLDivElement} A div containing the data formatted into a card
 */
function createGitHubCard(user) {
  const card = document.createElement('div');
  const img = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const url = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  card.classList.add('card');

  img.setAttribute('src', user.avatar_url);

  cardInfo.classList.add('card-info');

  name.classList.add('name');
  name.textContent = user.name;

  username.classList.add('username');
  username.textContent = user.login;

  location.textContent = `Location: ${user.location || ""}`;

  profile.textContent = user.profile;

  url.href = user.html_url;
  url.textContent = user.html_url;

  followers.textContent = "Followers: " + user.followers;

  following.textContent = "Following: " + user.following;

  bio.textContent = `Bio:  ${user.bio || ""}`;

  card.append(img, cardInfo);
  cardInfo.append(name, username, location, profile, followers, following, bio);
  profile.appendChild(url);
  return card;
}


/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

//axios.get("https://api.github.com/users/ddhorstman/following").then( res => console.log(res));

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

const myData = {
  avatar_url: "https://avatars0.githubusercontent.com/u/7649736?v=4",
  bio: null,
  blog: "",
  company: null,
  created_at: "2014-05-20T22:39:13Z",
  email: null,
  events_url: "https://api.github.com/users/ddhorstman/events{/privacy}",
  followers: 0,
  followers_url: "https://api.github.com/users/ddhorstman/followers",
  following: 0,
  following_url: "https://api.github.com/users/ddhorstman/following{/other_user}",
  gists_url: "https://api.github.com/users/ddhorstman/gists{/gist_id}",
  gravatar_id: "",
  hireable: null,
  html_url: "https://github.com/ddhorstman",
  id: 7649736,
  location: null,
  login: "ddhorstman",
  name: "David Horstman",
  node_id: "MDQ6VXNlcjc2NDk3MzY=",
  organizations_url: "https://api.github.com/users/ddhorstman/orgs",
  public_gists: 0,
  public_repos: 1,
  received_events_url: "https://api.github.com/users/ddhorstman/received_events",
  repos_url: "https://api.github.com/users/ddhorstman/repos",
  site_admin: false,
  starred_url: "https://api.github.com/users/ddhorstman/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/ddhorstman/subscriptions",
  type: "User",
  updated_at: "2020-01-23T04:03:48Z",
  url: "https://api.github.com/users/ddhorstman"
};


/* Step 4: Pass the data received from Github into your function,
           create a new component and add it to the DOM as a child of .cards
*/

//document.querySelector('.cards').appendChild(createGitHubCard(myData));

/* Step 5: Now that you have your own card getting added to the DOM, either
          follow this link in your browser https://api.github.com/users/<Your github name>/followers
          , manually find some other users' github handles, or use the list found
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.

          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
