import fetchFromApi from '../services/FetchFromApi';

export const GET_FOODS = 'GET_FOODS';
export const GET_FOODS_SUCCESS = 'GET_FOODS_SUCCESS';
export const GET_FOODS_FAIL = 'GET_FOODS_FAIL';
export const GET_DRINKS = 'GET_DRINKS';
export const GET_DRINKS_SUCCESS = 'GET_DRINKS_SUCCESS';

export const getFoods = () => ({
  type: GET_FOODS,
});

export const getFoodsSuccess = (payload) => ({
  type: GET_FOODS_SUCCESS,
  payload,
});

// export const getFoodsFailed = (payload) => ({
//   type: GET_FOODS_FAIL,
//   payload,
// });

export const getFoodFromApi = () => async (dispatch) => {
  dispatch(getFoods());
  try {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const dataFromApi = await fetchFromApi(URL);
    dispatch(getFoodsSuccess(dataFromApi.meals));
  } catch (error) {
    console.error(error);
  }
};

export const getDrinks = () => ({
  type: GET_DRINKS,
});

export const getDrinksSuccess = (payload) => ({
  type: GET_DRINKS_SUCCESS,
  payload,
});

export const getDrinkFromApi = () => async (dispatch) => {
  dispatch(getDrinks());
  try {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const dataFromApi = await fetchFromApi(URL);
    dispatch(getDrinksSuccess(dataFromApi.drinks));
  } catch (error) {
    console.error(error);
  }
};

function SendEmail(email) {
  const user = {
    email,
  };
  localStorage.setItem('mealsToken', JSON.stringify(1));
  localStorage.setItem('cocktailsToken', JSON.stringify(1));
  localStorage.setItem('user', JSON.stringify(user));
  return {
    type: 'ADD_EMAIL',
    email,
  };
}

export default SendEmail;
