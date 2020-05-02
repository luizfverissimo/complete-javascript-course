import axios from 'axios'

export default class Recipe {
    constructor(id){
        this.id = id
    }

    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
            this.title = res.data.recipe.title
            this.author = res.data.recipe.publisher
            this.img = res.data.recipe.image_url
            this.url = res.data.recipe.source_url
            this.ingredients = res.data.recipe.ingredients
            console.log(res)
        } catch (error){
            console.log(error)
            alert(`Something went wrong :(`)
        }
    }

    calcTime() {
        //Assumindo que demora 15 minuto por 3 ingredientes
        const numIng = this.ingredients.length
        const periods = Math.ceil(numIng / 3)
        this.time = periods * 15
    }

    calcServings(){
        this.servings = 4
    }

    parseIngridients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds' ]
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound' ]

        const newIngredients = this.ingredients.map(el => {
            //Uniform units
            let ingridient = el.toLowerCase()
            unitsLong.forEach((unit, i) => {
                ingridient = ingridient.replace(unit, unitsShort[i])
            })

            //Remove parentheses
            ingridient = ingridient.replace(/ *\([^)]*\) */g, ' ')

            //Parse ingredients into count, unit an ingredients
            const arrIng = ingridient.split(' ')
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2))

            let objIng;
            if(unitIndex > -1){
                //there is a unit
                const arrCount = arrIng.slice(0, unitIndex)
                let count
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-', '+'))
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'))
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingridient: arrIng.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(arrIng[0], 10)) {
                //no unit but the first element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingridient: arrIng.slice(1).join(' ')
                }

            } else if (unitIndex === -1){
                //ther is no unit and no number
                objIng = {
                    count: 1,
                    unit: '',
                    ingridient
                }
            }

            return objIng
        })

        this.ingredients = newIngredients
    }
}