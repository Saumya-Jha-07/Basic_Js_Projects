document.addEventListener('DOMContentLoaded',function(){

  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem('expenses'))   || [] 
   // local storage mai kch hai to wo else empty array
  let total = calculateTotal()

  renderExpenses()  //  refresh krne p show ni ho rha tha list , storage mai hai par show ni hence called
  updateTotal()  // hta ke dekh le refresh krne p total update ni ho rha tha isliye yaha call kiya

  expenseForm.addEventListener('submit' , function(e){
    e.preventDefault()   // most common and basic thing we always do to prevent Default process 
    const name = expenseNameInput.value.trim()
    const amount =  parseFloat(expenseAmountInput.value)
    // console.log(typeof amount); //  every input comes as a string in form

    if(name !== "" && !isNaN(amount) && amount>0){
      const newExpense = {
        id : Date.now() , 
        name ,    // this means variable name and jo asign rna hai wo same naam ka hai
        amount    // amount : amount
      }
      expenses.push(newExpense)
      saveExpensesToLocal()
      renderExpenses()
      updateTotal()

      // clearing the input
      expenseAmountInput.value = 
      expenseNameInput.value = ""
    }

  })

  expenseList.addEventListener('click',function(e){
    if(e.target.tagName === "BUTTON"){
      const expenseId = parseInt(e.target.getAttribute('data-id'))
      expenses = expenses.filter((exp) => exp.id != expenseId)
      // console.log(expenses);  // filtering out done
      
      saveExpensesToLocal()
      renderExpenses()
      updateTotal()
    }
  })






  function calculateTotal(){
    let ans = expenses.reduce((sum , expense) => sum + expense.amount , 0)    
    // console.log(ans);  // travels through whole array and calculates the sum
    return ans
  }

  function saveExpensesToLocal(){
    localStorage.setItem( 'expenses' , JSON.stringify(expenses))
  }

  function updateTotal(){
    total = calculateTotal()
    totalAmountDisplay.textContent = total
  }

  function renderExpenses(){
    expenseList.innerHTML = ""
    expenses.forEach(expense => {
      const li = document.createElement('li')
      li.innerHTML = `
      ${expense.name} - $${expense.amount}
      <button data-id = "${expense.id}" >Delete</button>
      `
      expenseList.appendChild(li)
    })
  }

  

})