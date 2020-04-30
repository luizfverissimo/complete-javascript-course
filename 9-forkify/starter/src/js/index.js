import Search from "./models/Search"

/*Global state of the app
    * - Search object
    * - Current recipe object
    * - Shopping list object
    * - Liked recipes
 */
const state = {}

const controlSearch = async () => {
    //get a query from view
    const query = 'pizza' //TODO

    if(query){
        //create new search obj
        state.search = new Search(query)

        //Prepare UI for results

        //Search for recepies
        await state.search.getResults()

        //Render result on UI
        console.log(state.search.result)
    }

    
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})


search.getResults()
