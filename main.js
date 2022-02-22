const intro = document.querySelector('.intro');
const form = document.querySelector('form');
const username = document.getElementById('username');
const submit = document.getElementById('submit');

const body = document.body;
const wrapper = document.querySelector('.wrapper');
const userDatas = document.querySelector('.userDatas');
const dataItems = document.querySelector('.dataItems');

form.addEventListener('submit', checkUsername);

/**
 * Get data from Github
 * @param {*} userName
 * @returns
 */
async function fetchData(userName) {
	const baseEndPoint = 'https://api.github.com';
	const userEndPoint = `${baseEndPoint}/users`;
	const endPoint = await fetch(`${userEndPoint}/${userName}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (endPoint.status !== 200) {
		const message = `An error occured: ${endPoint.status}`;
		throw new Error(message);
	} else {
		intro.style.display = 'none';
		wrapper.style.display = 'flex';

		const data = await endPoint.json();

		return dataDisplay(data);
	}
}

/**
 * Error Handeling
 * @param {*} err
 */
function handleError(err) {
	alert(`Wrong username: ${err}`);
}

/**
 *
 * @param {*} e
 */
function checkUsername(e) {
	e.preventDefault();
	fetchData(username.value).catch(handleError);
	username.value = '';
}

function handleString(str) {
	const regx = /(-|_)/gi;
	return str.replaceAll(regx, ' ');
}

/**
 * Data Display
 * @param {*} data
 */
function dataDisplay(data) {
	userInfo(data);
	userRepos(data);
}

/**
 * Get User Information
 * @param {*} info
 */
function userInfo(info) {
	const userProfile = document.querySelector('.userProfile');
	const userBio = document.querySelector('.userBio');
	const userSocial = document.querySelector('.userSocial');
	const userFollowBtn = document.querySelector('.userFollowBtn');
	const userAddress = document.querySelector('.userAddress');

	const userImg = document.createElement('img');
	userImg.setAttribute('src', info.avatar_url);
	userImg.setAttribute('alt', info.name);
	userBio.appendChild(userImg);

	const userName = document.createElement('div');
	userName.classList.add('userName');
	userName.textContent = info.name;
	userBio.appendChild(userName);

	const userLogin = document.createElement('div');
	userLogin.textContent = `@${info.login}`;
	userBio.appendChild(userLogin);

	const userDes = document.createElement('div');
	userDes.classList.add('userDes');
	userDes.textContent = info.bio;
	userBio.append(userDes);

	const userCompany = document.createElement('div');
	userCompany.classList.add('userCompany');
	userCompany.textContent = info.company;
	userAddress.appendChild(userCompany);

	const userLocation = document.createElement('div');
	userLocation.classList.add('userLocation');
	userLocation.textContent = info.location;
	userAddress.appendChild(userLocation);
}

/**
 * Get user repositories
 * @param {*} items
 */
function userRepos(items) {
	const repos = document.querySelector('.repos');
	repos.addEventListener('click', () => {
		let reposWrapp = document.createElement('div');
		reposWrapp.classList.add('reposWrapp');
		userDatas.appendChild(reposWrapp);
		fetch(items.repos_url)
			.then((response) => response.json())
			.then((datas) =>
				datas.forEach((data) => {
					let listRepo = document.createElement('div');
					listRepo.classList.add('listRepo');
					let repoTitle = document.createElement('h3');
					repoTitle.textContent = handleString(data.name);
					repoTitle.appendChild(repoTitleLink);
					listRepo.appendChild(repoTitle);
					reposWrapp.appendChild(listRepo);
				})
			)
			.catch((err) => console.log(err.message));
	});
}
