import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';

// Notiflix.Notify.init({
//   width: '300px',
//   position: 'right-top',
//   timeout: 3500,
// });

// new SlimSelect({
//   select: '#single',
// });

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

try {
  loader.style.display = 'block';
  errorEl.style.display = 'none';

  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(
    `Oops! Something went wrong! Try reloading the page! Error: ${error}`
  );
  //   Notiflix.Notify.failure(
  //     `Oops! Something went wrong! Try reloading the page! Error: ${error}`
  //   );
}

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
  loader.style.display = 'none';
  errorEl.style.display = 'none';
}

breedSelect.addEventListener('change', e => {
  catInfo.innerHTML = '';

  loader.style.display = 'block';
  errorEl.style.display = 'none';

  fetchCatByBreed(e.target.value).then(data => renderCat(data[0]));
});

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
  <h2>${name}</h2>
  <img width="500" src="${url}" alt="${name}" />
  <p><strong>Description: </strong>${description}</p>
  <p><strong>Temperament: </strong>${temperament}</p>
  </div>`
  );

  loader.style.display = 'none';
  errorEl.style.display = 'none';
}
