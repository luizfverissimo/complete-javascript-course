import Search from "./models/Search"
import Recipe from "./models/Recipe"
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { elements, renderLoader, clearLoader } from './views/base'

/*Global state of the app
    * - Search object
    * - Current recipe object
    * - Shopping list object
    * - Liked recipes
 */
const state = {}

//////////////////////////////////////////////////////////////////////////////
//Search Controller //////////////////////////////////////////////////////////
const controlSearch = async () => {
    //get a query from view
    const query = searchView.getInput()
    if(query){
        //create new search obj
        state.search = new Search(query)

        //Prepare UI for results
        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.searchRes)

        try {
            //Search for recepies
            await state.search.getResults()

            //Render result on UI
            clearLoader()
            searchView.renderResults(state.search.result)
        } catch (err){
            alert('Error on search')
            clearLoader()
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})


elements.searchResPages.addEventListener('click', e=> {
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10)
        searchView.clearResults()
        searchView.renderResults(state.search.result, goToPage)
    }
    
})

//////////////////////////////////////////////////////////////////////////////
//Recipe Controler////////////////////////////////////////////////////////////
const controlRecipe = async () => {
    //Get ID from url - hash
    const id = window.location.hash.replace('#', '')
    console.log(id)

    if (id){
        //Prepare UI for changes
        renderLoader(elements.recipe)

        //Create new recipe object
        state.recipe = new Recipe(id)

        try{
            //Get recipe data and parse ingridients
            await state.recipe.getRecipe()
            state.recipe.parseIngridients()

            //Calculate servings and time
            state.recipe.calcTime()
            state.recipe.calcServings()

            //Render recipe
            clearLoader()
            recipeView.renderRecipe(state.recipe)

        } catch(err){
            alert('Error processing recipe')
        }
    }
}


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))