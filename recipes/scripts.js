const form = document.querySelector('.search');
const recipesEl = document.querySelector('.recipes');
const baseEndPoint = `https://api.punkapi.com/v2/beers`;

const fetchRecipes = async (query) => {
  // Fetching Data
  const response = await fetch(
    `${baseEndPoint}?beer_name=${query}&page=1&per_page=5`
  );
  const data = await response.json();
  return data;
};

const displayRecipes = (recipes) => {
  // Dumping data to html
  const htmlData = recipes.map(
    ({
      image_url: imageUrl,
      name,
      tagline,
      first_brewed: firstBrewed,
      description,
    }) => `
          <div class="recipe">
              <img class="recipe__image" src="${imageUrl}" width="auto" height="200" />
              <h2 class="recipe__name">${name}</h2>
              <span class="recipe__tagline">${tagline}</span>
              <span class="recipe__year">First brewed: ${firstBrewed}</span>
              <p class="recipe__description">${description}</p>
          </div>
        `
  );

  recipesEl.insertAdjacentHTML('afterbegin', htmlData.join(''));
};

const handleError = (error) => {
  console.log(error);
};

const handleSubmit = async (event) => {
  event.preventDefault();

  if (event.target.input.value === '') return;

  // Submit button disabled
  form.querySelector('button').disabled = true;

  const data = await fetchRecipes(event.target.input.value).catch(handleError);

  if (!data.length) alert('please input a beer name like brown');

  displayRecipes(data);

  // submit button enabled
  form.querySelector('button').disabled = false;
};

form.addEventListener('submit', handleSubmit);
