/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Jay White
 * Email: whitejo8@oregonstate.edu
 */

const sellButton = document.querySelector('#sell-something-button'); 
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.modal-backdrop');
const closeButton = document.querySelector('.modal-close-button'); 
const cancelButton = document.querySelector('.modal-cancel-button'); 
const updateFilterButton = document.querySelector('#filter-update-button'); 
const postContainer = document.querySelector('#posts'); 

function showModal() {
  modal.classList.remove('hidden');
  backdrop.classList.remove('hidden');
}

function hideModal() {
  modal.classList.add('hidden');
  backdrop.classList.add('hidden');
  clearModalInputs();
}

sellButton.addEventListener('click', showModal);
closeButton.addEventListener('click', hideModal);
cancelButton.addEventListener('click', hideModal);

const acceptButton = document.querySelector('.modal-accept-button');
const postContainer = document.querySelector('.posts-container'); 

function clearModalInputs() {
  document.querySelector('#item-description-input').value = '';
  document.querySelector('#item-price-input').value = '';
  document.querySelector('#item-city-input').value = '';
  document.querySelector('#item-condition-input').value = '';
  document.querySelector('#item-photo-url-input').value = '';
}

function createPost() {
  const description = document.querySelector('#item-description-input').value.trim();
  const price = document.querySelector('#item-price-input').value.trim();
  const city = document.querySelector('#item-city-input').value.trim();
  const condition = document.querySelector('#item-condition-input').value.trim();
  const photoURL = document.querySelector('#item-photo-url-input').value.trim();

  if (!description || !price || !city || !condition || !photoURL) {
    alert("Please fill in all fields.");
    return;
  }

  const post = document.createElement('div');
  post.classList.add('post');
  post.setAttribute('data-price', price);
  post.setAttribute('data-city', city);
  post.setAttribute('data-condition', condition);

  const postContents = document.createElement('div');
  postContents.classList.add('post-contents');

  const postImageContainer = document.createElement('div');
  postImageContainer.classList.add('post-image-container');
  const postImage = document.createElement('img');
  postImage.src = photoURL;
  postImage.alt = description;
  postImageContainer.appendChild(postImage);

  const postInfoContainer = document.createElement('div');
  postInfoContainer.classList.add('post-info-container');
  const postTitle = document.createElement('a');
  postTitle.href = '#';
  postTitle.classList.add('post-title');
  postTitle.textContent = description;
  const postPrice = document.createElement('span');
  postPrice.classList.add('post-price');
  postPrice.textContent = `$${price}`;
  const postCity = document.createElement('span');
  postCity.classList.add('post-city');
  postCity.textContent = `(${city})`;

  postInfoContainer.appendChild(postTitle);
  postInfoContainer.appendChild(postPrice);
  postInfoContainer.appendChild(postCity);

  postContents.appendChild(postImageContainer);
  postContents.appendChild(postInfoContainer);
  post.appendChild(postContents);

  postContainer.appendChild(post);
  hideModal();
}

acceptButton.addEventListener('click', createPost);

function filterPosts() {
  const textFilter = document.querySelector('#filter-text').value.trim().toLowerCase();
  const minPrice = parseFloat(document.querySelector('#filter-min-price').value);
  const maxPrice = parseFloat(document.querySelector('#filter-max-price').value);
  const cityFilter = document.querySelector('#filter-city').value.trim().toLowerCase();
  const conditionFilter = document.querySelector('#filter-condition').value.trim().toLowerCase();

  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const price = parseFloat(post.getAttribute('data-price'));
    const city = post.getAttribute('data-city').toLowerCase();
    const condition = post.getAttribute('data-condition').toLowerCase();
    const title = post.querySelector('.post-title').textContent.toLowerCase();

    let showPost = true;

    if (textFilter && !title.includes(textFilter)) showPost = false;
    if (!isNaN(minPrice) && price < minPrice) showPost = false;
    if (!isNaN(maxPrice) && price > maxPrice) showPost = false;
    if (cityFilter && city !== cityFilter) showPost = false;
    if (conditionFilter && condition !== conditionFilter) showPost = false;

    post.style.display = showPost ? '' : 'none'; // hide instead of removing
  });
}

updateFilterButton.addEventListener('click', filterPosts);
