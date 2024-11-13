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

const updateFilterButton = document.querySelector('#filter-update-button'); 

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

    if (showPost) {
      postContainer.appendChild(post);
    } else {
      post.remove(); 
    }
  });
}

const updateFilterButton = document.querySelector('#filter-update-button'); 

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

    if (showPost) {
      postContainer.appendChild(post); 
    } else {
      post.remove(); 
    }
  });
}

updateFilterButton.addEventListener('click', filterPosts);
