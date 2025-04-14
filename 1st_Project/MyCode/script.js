/*

The Process of developing this Step by Step was : 

1. BASIC  fnctinality : get all the values , add event listener and store/log  them on browser console

2. store that array in the local storage 

3. displaying them on web by Rendering that process (just for understanding local storage properties)

4. create li AND injecting into ul

5. checking if completed or not 

6. checking for delete


*/



document.addEventListener('DOMContentLoaded' , function (){   // kya pta server load hi ni hua ho coz of net ya whatever OR  agr load ho gya hai to already jo value hia storage mei usse bhi tasks array mei daal do 

    const input = document.getElementById("todo-input");
    const btn = document.getElementById("add-task-btn");
    const list = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("kaam")) || [];   // phle se kch hoga to wo daal do array mei ya phir ni h kch to empty array daaal do

    //tasks.forEach (task => renderTask(task)) // AgAR koi hai to un saare elements pe jao and render them
    // OR
    for(let i = 0 ; i<tasks.length ; i++){  // dono same thing
        renderTask(tasks[i])
    }

    btn.addEventListener("click", function () {
      let taskText = input.value.trim(); //  holding the input
      if (taskText == "") return; // agar empty hai to return krenge

      const newTask = {
        // object bnaya coz multiple properties store krni thi

        id: Date.now(), // for creating unique id's  (baad m separate out krne ke liye lgega jb remove krna hoga value ko through FILTER method)

        completed: false, // it is for CSS ki jb complete ho gya then cut krna hai

        text: taskText,
      };

      tasks.push(newTask); // storing the values in array
      saveTasks();
      renderTask(newTask)  // it has done at last coz  refresh krna pd rha tha add krne ke baaad .... you can remove it and khud dekh le
      input.value = ""; // clearing the input for next iteration

      // console.log(tasks);  // ye krenge to console mi dikhega coz rn it is stored in browser and refresh krne pe udd jyga
    });

    // storing the values in local storage coz
    // 1. it will be on client's browser
    // 2. it has no expiry date , it will be there until we manually delete it
    function saveTasks() {
      localStorage.setItem("kaam", JSON.stringify(tasks)); // key value pair (value MUST be string)
    }
    // stringify : string mei badal deta hai
    // parse : string se wapas jis bhi DS mei tha usme





    function renderTask(task) {
      // Displaying/reading/accessing from the local storage and change/use as well
        
      //console.log(task);

      //  creating li element
      const li = document.createElement('li')   
      li.setAttribute("task-id" , task.id)   //  unique id's for removing wala part
      if(task.completed) li.classList.add('completed')  // for completion
      li.innerHTML = `     
      <span>${task.text}</span>
      <button>delete</button>     
      `    // li ke andar ka html 

      // for marking completed or not to li 
        li.addEventListener('click' , function(event){  
            if(event.target.name === "BUTTON") return     // e.target returns wher it was clicked 
            task.completed =!task.completed   //  agr true hai to make it false and vice versa
            li.classList.toggle('completed')   // agr class hai to hta do ni hai to lga do 
            saveTasks()
        })

        // for deletion
        li.querySelector('button').addEventListener('click',function(e){ //in the li , btn click krenge tb
            e.stopPropagation()   // preventing toggle ele from firing in parent conatainer
            tasks = tasks.filter((t) => t.id !== task.id)    // filter : saare ele mai jao array ke and jo task ele mila hai hamko uss id ka bs ele mt lo baaaki lelo
            li.remove()  
            saveTasks()
        })

      //  appending into ul
      list.appendChild(li)
    }


})