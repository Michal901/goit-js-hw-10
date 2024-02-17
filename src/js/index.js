import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

const slim = new SlimSelect({
  select: '.breed-select',
});

function nextItem() {
  const previousSlide =
    document.querySelectorAll('.background')[currentSlideNumber - 1];
  previousSlide.classList.remove('up-scroll');
  previousSlide.classList.add('down-scroll');
}

try {
  loader.style.display = 'block';
  errorEl.style.display = 'none';

  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
}

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);

  slim.setData(Array.from(breedSelect.options));

  loader.style.display = 'none';
  errorEl.style.display = 'none';
}
breedSelect.addEventListener('change', async e => {
  catInfo.innerHTML = '';

  loader.style.display = 'block';
  errorEl.style.display = 'none';

  try {
    const data = await fetchCatByBreed(e.target.value);
    renderCat(data[0]);
  } catch (error) {
    console.error(error);
  } finally {
    loader.style.display = 'none';
  }
});

async function renderCat(catData) {
  if (catData) {
    try {
      const { url } = catData;
      const { description, name, temperament } = catData.breeds[0];

      catInfo.insertAdjacentHTML(
        'beforeend',
        `<div class="cat-wrapper">
          <h2 class="cat-title">${name}</h2>
          <img class="cat-img" src="${url}" alt="${name}" />
          <div class="description-wrapper">
          <div class="shadow">
          <p class="cat-description"><strong>Description: </strong>${description}</p>
          <p class="cat-temperament"><strong>Temperament: </strong>${temperament}</p>
          </div>
          </div>
        </div>`
      );

      errorEl.style.display = 'none';
    } catch (error) {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
      );
    }
  } else {
    Notiflix.Notify.failure(
      `Error loading content. Please try refreshing the page.`
    );
  }
}

// ------------- VARIABLES ------------- //
