//BUDGET CONTROLLER
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItens: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
  };

  return {
    addItem: function (type, des, val) {
        var newItem, id

        //create new id
        if (data.allItens[type].length > 0){
            id = data.allItens[type][data.allItens[type].length - 1].id + 1
        } else {
            id = 0
        }


        //crete new item based on 'inc' or 'exp' type
        if(type === 'exp'){
            newItem = new Expense(id, des, val)
        } else if(type === 'inc') {
            newItem = new Income(id, des, val)
        }

        //push into our data structure
        data.allItens[type].push(newItem)

        //return the new element
        return newItem

    },
    testing: function(){
        console.log(data)
    }

  };
})();

//UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {
    // get the user input
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //o valor será inc ou exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },

    addListItem: function(obj, type){
        var html, newHtml, element
        //creat HTML string with placeholder text
        if (type === 'inc'){
            element = DOMstrings.incomeContainer
            html = `<div class="item clearfix" id="income-%id%"><divclass="item__description">%description%</divclass="item__description"><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div><div>`
        } else if (type === 'exp'){
            element = DOMstrings.expensesContainer
            html = `<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
        }
        //Replace the place holder text with some actual data
        newHtml = html.replace('%id%', obj.id)
        newHtml = newHtml.replace('%description%', obj.description) 
        newHtml = newHtml.replace('%value%', obj.value)

        //insert the HTML into DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
    },

    clearFields: function(){
        var fields, fieldsArray

        fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue) //returna list

        fieldsArray = Array.prototype.slice.call(fields) //convert list in to array

        fieldsArray.forEach(function(current, index, array){
            current.value = ''

        })

        fieldsArray[0].focus()
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

//GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UIctrl) {
  var setEventListners = function () {
    var DOM = UIctrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function () {
    var input, newItem
    //get field input data
    input = UIctrl.getInput();

    //add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value)

    //add the new item to the UI
    UIctrl.addListItem(newItem, input.type)

    //clear the fields
    UIctrl.clearFields()

    //calculate the budget
    //display the budget on the UI
  };

  return {
    init: function () {
      console.log("Application has started");
      setEventListners();
    },
  };
})(budgetController, UIController);

controller.init();
