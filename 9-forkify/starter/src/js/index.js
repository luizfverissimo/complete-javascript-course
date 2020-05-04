import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import { elements, renderLoader, clearLoader } from "./views/base";


/*Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

//////////////////////////////////////////////////////////////////////////////
//Search Controller //////////////////////////////////////////////////////////
const controlSearch = async () => {
  //get a query from view
  const query = searchView.getInput();
  if (query) {
    //create new search obj
    state.search = new Search(query);

    //Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      //Search for recepies
      await state.search.getResults();

      //Render result on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert("Error on search");
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

//////////////////////////////////////////////////////////////////////////////
//Recipe Controller///////////////////////////////////////////////////////////
const controlRecipe = async () => {
  //Get ID from url - hash
  const id = window.location.hash.replace("#", "");

  if (id) {
    //Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    //highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    //Create new recipe object
    state.recipe = new Recipe(id);

    try {
      //Get recipe data and parse ingridients
      await state.recipe.getRecipe();
      state.recipe.parseIngridients();

      //Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (err) {
      console.log(err)
      alert("Error processing recipe");
    }
  }
};

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

//////////////////////////////////////////////////////////////////////////////
//List Controller/////////////////////////////////////////////////////////////

const controlList = () => {
  //create a new list IF there in none yet
  if (!state.list) state.list = new List();

  //Add each ingredient to the list and UI
  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

//Handle delete and update list item events
elements.shopping.addEventListener("click", (el) => {
  const id = el.target.closest(".shopping__item").dataset.itemid;

  //handle delete button
  if (el.target.matches(".shopping__delete, .shopping__delete *")) {
    //Delete from state
    state.list.deleteItem(id);

    //Delete from UI
    listView.deleteItem(id);
  } else if (el.target.matches(".shopping__count-value")) {
    const val = parseFloat(el.target.value, 10);
    state.list.updateCount(id, val);
  }
});

//////////////////////////////////////////////////////////////////////////////
//Likes Controller////////////////////////////////////////////////////////////

const controlLike = () => {
  if(!state.likes) state.likes = new Likes()
  const currentID = state.recipe.id

  //user has not yet liked current recipe
  if(!state.likes.isLiked(currentID)){
    //add like to state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    )
    //toogle the like button
    likesView.toogleLikeBtn(true)

    //add like to ui list
    likesView.renderLike(newLike)

  //User has Liked current recipe-
  } else {
    //remove like to state
    state.likes.deleteLike(currentID)
    //toogle the like button
    likesView.toogleLikeBtn(false)

    //remove like from ui list
    likesView.deleteLike(currentID)

  }
  likesView.toogleLikeMenu(state.likes.getNumLikes())
}

//Restore like recipes on page load
window.addEventListener('load', () =>{
  state.likes = new Likes()

  //read storage likes
  state.likes.readStorage()

  //toogle like menu button
  likesView.toogleLikeMenu(state.likes.getNumLikes())

  //render the existing likes
  state.likes.likes.forEach( like => likesView.renderLike(like))
})

//Handling recipe buttons clicks
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    //Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.upadateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    //Increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.upadateServingsIngredients(state.recipe);
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    //add ingredients to shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    //like controller
    controlLike()
  };
});

