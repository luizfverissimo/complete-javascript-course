import Search from "./models/Search"
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base'

/*Global state of the app
    * - Search object
    * - Current recipe object
    * - Shopping list object
    * - Liked recipes
 */
const state = {}

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


        //Search for recepies
        await state.search.getResults()

        //Render result on UI
        clearLoader()
        searchView.renderResults(state.search.result)
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