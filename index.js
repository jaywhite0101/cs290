/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Jay White
 * Email: whitejo8@oregonstate.edu
 */

const sellButton = document.getElementById('sell-something-button'); 
const modal = document.getElementById('sell-something-modal');
const backdrop = document.getElementById('modal-backdrop');
const closeButton = document.getElementById('modal-close'); 
const cancelButton = document.getElementById('modal-cancel'); 
const updateFilterButton = document.getElementById('filter-update-button'); 
const postContainer = document.getElementById('posts'); 

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

const acceptButton = document.getElementById('modal-accept');

function clearModalInputs() {
  document.getElementById('post-text-input').value = '';
  document.getElementById('post-price-input').value = '';
  document.getElementById('post-city-input').value = '';
  document.querySelector('#post-condition-fieldset input:checked').value = '';
  document.getElementById('post-photo-input').value = '';
}

function createPost() {
  const description = document.getElementById('post-text-input').value.trim();
  const price = document.getElementById('post-price-input').value.trim();
  const city = document.getElementById('post-city-input').value.trim();
  const condition = document.querySelector('#post-condition-fieldset input:checked').value;
  const photoURL = document.getElementById('post-photo-input').value.trim();

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
  const textFilter = document.getElementById('filter-text').value.trim().toLowerCase();
  const minPrice = parseFloat(document.getElementById('filter-min-price').value);
  const maxPrice = parseFloat(document.getElementById('filter-max-price').value);
  const cityFilter = document.getElementById('filter-city').value.trim().toLowerCase();
  const conditionFilter = document.querySelector('#post-condition-fieldset input:checked').value.trim().toLowerCase();

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

    post.style.display = showPost ? '' : 'none'; // change: need to remove posts
  });
}

updateFilterButton.addEventListener('click', filterPosts);


//create object with all the post data at start
//so when posts are removed, posts can be added back in to be filtered
//syntax for removing the posts is (post object).remove 
//filter function in javascript -- need to remove posts into hide them
//to filter again, need all of posts back, so remove all posts and then call create function to get blank slate again
//to remove ones that are currently on screen, go for length of those on screen
//check each post to see if it matches all filters, if it doesn't then remove it
//remove all posts at end of filter and then add them all back for next filter
//posts object is created first, added posts need to be added to overall object