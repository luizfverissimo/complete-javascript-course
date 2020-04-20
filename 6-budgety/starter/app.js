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

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItens[type].forEach(function (cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
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
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: function (type, des, val) {
      var newItem, id;

      //create new id
      if (data.allItens[type].length > 0) {
        id = data.allItens[type][data.allItens[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      //crete new item based on 'inc' or 'exp' type
      if (type === "exp") {
        newItem = new Expense(id, des, val);
      } else if (type === "inc") {
        newItem = new Income(id, des, val);
      }

      //push into our data structure
      data.allItens[type].push(newItem);

      //return the new element
      return newItem;
    },

    calculateBudget() {
      //calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");

      //calculate budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      //calculate de percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },

    testing: function () {
      console.log(data);
    },
  };
})();

//UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: '.budget__value',
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container"

  };

  return {
    // get the user input
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //o valor será inc ou exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;
      //creat HTML string with placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="inc-%id%"><divclass="item__description">%description%</divclass="item__description"><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div><div>`;
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html = `<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      }
      //Replace the place holder text with some actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      //insert the HTML into DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: function () {
      var fields, fieldsArray;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      ); //returna list

      fieldsArray = Array.prototype.slice.call(fields); //convert list in to array

      fieldsArray.forEach(function (current, index, array) {
        current.value = "";
      });

      fieldsArray[0].focus();
    },

    displayBudget: function(obj){
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc
      document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp

      if(obj.percentage > 0){
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%'
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---'
      }
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
    //evento - click ou enter para adicionar item
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    //evento - botão delete dos itens
    document.querySelector(DOM.container);addEventListener('click', ctrlDeleteItem)
  };

  var updateBudget = function () {
    //calculate the budget
    budgetCtrl.calculateBudget();

    //return the budget
    var budget = budgetCtrl.getBudget();

    //display the budget on the UI
    UIctrl.displayBudget(budget)
  };

  var ctrlAddItem = function () {
    var input, newItem;
    //get field input data
    input = UIctrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //add the new item to the UI
      UIctrl.addListItem(newItem, input.type);

      //clear the fields
      UIctrl.clearFields();

      //calculate and update budget
      updateBudget();
    }
  };

  var ctrlDeleteItem = function(event){
    var itemID, splitID, type, id
    //atravessa o DOM e pega o id
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id

    if (itemID) {
      //divide a string id e armazena as informações item em que o botão delete foi clicado
      splitID = itemID.split('-')
      type = splitID[0]
      id = splitID[1]

      //delete the item from data structure

      //delete the item from the UI

      //Update and show the new budget.
    }
  }

  return {
    init: function () {
      console.log("Application has started");
      UIctrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      })
      setEventListners();
    },
  };
})(budgetController, UIController);

controller.init();
