const intro = document.querySelector('.intro');
intro.classList.add(
	'min-h-full',
	'flex',
	'items-center',
	'justify-center',
	'py-12',
	'px-4',
	'sm:px-6',
	'lg:px-8'
);
const form = document.querySelector('form');
const username = document.getElementById('username');
const submit = document.getElementById('submit');

const body = document.body;
const wrapper = document.querySelector('.wrapper');
wrapper.classList.add(
	'hidden',
	'sm:flex-col',
	'md:flex-row',
	'min-h-screen',
	'bg-whiet',
	'text-gray-800'
);

form.addEventListener('submit', checkUsername);

/**
 *
 * @param {*} e
 */
function checkUsername(e) {
	e.preventDefault();

	localStorage.setItem('username', username.value);
	fetchData(localStorage.getItem('username')).catch(handleError);

	username.value = '';
}

/**
 * Error Handeling
 * @param {*} err
 */
function handleError(err) {
	alert(`Wrong username: ${err}`);
}

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
 * String handeling
 * @param {*} str
 * @returns
 */

function handleString(str) {
	const regx = /(-|_)/gi;
	return str.replaceAll(regx, ' ');
}

/**
 * Data Display
 * @param {*} data
 */
function dataDisplay(data) {
	getUserInfo(data);
	userRepos(data);
}

/**
 * Get User Information
 * @param {*} info
 */
function getUserInfo(info) {
	const sideBar = document.querySelector('aside.sidebar');
	sideBar.classList.add(
		'md:w-1/5',
		'md:shadow',
		'md:transform',
		'md:-translate-x-full',
		'md:translate-x-0',
		'md:transition-transform',
		'md:duration-150',
		'md:ease-in',
		'bg-white'
	);
	const userProfile = document.createElement('div');
	userProfile.classList.add(
		'userProfile',
		'px-6',
		'py-6',
		'flex',
		'sm:flex-row',
		'flex-wrap',
		'justify-center'
	);
	sideBar.appendChild(userProfile);

	const userBio = document.createElement('div');
	userBio.classList.add(
		'userBio',
		'focus:outline-none',
		'h-32',
		'w-32',
		'mb-4',
		'lg:mb-0'
	);
	userProfile.appendChild(userBio);

	const userInfo = document.createElement('div');
	userInfo.classList.add('userInfo', 'mt-4');
	userProfile.appendChild(userInfo);

	const userImg = document.createElement('img');
	userImg.setAttribute('src', info.avatar_url);
	userImg.setAttribute('alt', info.name);
	userImg.classList.add(
		'h-full',
		'w-full',
		'rounded-full',
		'overflow-hidden',
		'shadow'
	);
	userBio.appendChild(userImg);

	const userName = document.createElement('h1');
	userName.classList.add('userName', 'font-bold', 'text-center');
	userName.textContent = info.name;
	userInfo.appendChild(userName);

	const userDes = document.createElement('div');
	userDes.classList.add(
		'userDes',
		'text-center',
		'text-gray-600',
		'text-sm',
		'pt-1',
		'font-normal'
	);
	userDes.textContent = info.bio;
	userInfo.append(userDes);

	const userCompany = document.createElement('div');
	userCompany.classList.add(
		'userCompany',
		'text-center',
		'text-gray-600',
		'text-sm',
		'font-normal'
	);
	userCompany.textContent = `${info.company}, ${info.location}`;
	userInfo.appendChild(userCompany);
}

/**
 * Get user repositories
 * @param {*} items
 */
function userRepos(items) {
	const main = document.querySelector('main.main');
	main.classList.add(
		'md:w-4/5',
		'lg:flex',
		'md:flex',
		'sm:flex',
		'xl:justify-between',
		'flex-wrap',
		'md:justify-around',
		'sm:justify-around',
		'lg:justify-around'
	);
	let reposList = document.createElement('div');
	reposList.classList.add(
		'reposList',
		'flex',
		'flex-grow',
		'flex-row',
		'flex-wrap',
		'items-stretch',
		'px-10',
		'py-10',
		'gap-12'
	);
	main.appendChild(reposList);
	fetch(items.repos_url)
		.then((response) => response.json())
		.then((datas) =>
			datas.forEach((data) => {
				// Repository Wrapper
				let listRepo = document.createElement('div');
				listRepo.classList.add(
					'listItem',
					'w-80',
					// 'xl:w-1/3',
					// 'sm:w-3/4',
					// 'md:w-2/5',
					// 'xl:max-w-sm',
					// 'lg:w-1/3',
					'relative'
					// 'xl:mb-0',
					// 'sm:mb-24',
				);

				let repoWrap = document.createElement('div');
				repoWrap.classList.add(
					'rounded',
					'overflow-hidden',
					'shadow-md',
					'bg-white',
					'px-6',
					'py-6',
					'h-full',
					'flex',
					'flex-col'
				);

				// Title Area
				let repoTitle = document.createElement('h1');
				repoTitle.classList.add(
					'font-bold',
					'text-left',
					'capitalize',
					'mb-4'
				);
				repoTitle.textContent = handleString(data.name);

				// Content Area
				let repoContent = document.createElement('div');
				repoContent.classList.add('repoContent');

				// Tags
				let repoLang = document.createElement('span');
				repoLang.classList.add('tag');
				repoLang.textContent = data.language;

				// Buttons
				let repoButtons = document.createElement('div');
				repoButtons.classList.add(
					'repoButtons',
					'mt-8',
					'flex',
					'lg:mt-4',
					'lg:flex-shrink-0',
					'gap-4'
				);

				let repoSource = document.createElement('a');
				repoSource.classList.add(
					'repoButton',
					'inline-flex',
					'items-center',
					'justify-center',
					'px-4',
					'py-2',
					'border',
					'border-transparent',
					'text-base',
					'font-medium',
					'rounded-md',
					'text-white',
					'bg-indigo-600',
					'hover:bg-indigo-700'
				);
				repoSource.setAttribute('href', data.html_url);
				repoSource.setAttribute('target', '_blank');
				repoSource.textContent = 'Source Code';

				if (data.has_pages) {
					let repoLive = document.createElement('a');
					repoLive.classList.add(
						'repoButton',
						'inline-flex',
						'items-center',
						'justify-center',
						'px-4',
						'py-2',
						'border',
						'border-transparent',
						'text-base',
						'font-medium',
						'rounded-md',
						'text-indigo-600',
						'bg-indigo-100',
						'hover:bg-indigo-200'
					);
					let liveURL = `https://${data.owner.login}.github.io/${data.name}`;
					repoLive.setAttribute('href', liveURL);
					repoLive.setAttribute('target', '_blank');
					repoLive.textContent = 'Live';
					repoButtons.appendChild(repoLive);
				}

				reposList.appendChild(listRepo);
				listRepo.appendChild(repoWrap);
				repoWrap.appendChild(repoTitle);
				repoWrap.appendChild(repoContent);
				repoContent.appendChild(repoLang);
				repoContent.appendChild(repoButtons);
				repoButtons.appendChild(repoSource);
			})
		)
		.catch((err) => console.log(err.message));
}
