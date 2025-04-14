/*

1. Get all elements by id

2. event listener to btn 

3. 2 rule of while calling any server/api
    a. bhut dooor hai : soln = await
    b. error aa skta hai : soln = try-catch

4. make fn for 
    a. fetch data  
        1)get url
        2)call api
        3) check for error
        4) response ko .json mai kro
        5) return the response to display fn 
    b. display data 
        1) study the received data ache se
        2) hide the error wala part coz pta hai data received
    c. error
        1) hide the display wala part coz error aa rha hai 
        2) display the error


*/


document.addEventListener("DOMContentLoaded" , () => {
    // step 1
    const cityInput = document.getElementById("city-input");
    const getWeatherButton = document.getElementById("get-weather-btn");
    const cityNameDisplay = document.getElementById("city-name");
    const temparatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const weatherInfo = document.getElementById("weather-info");

    const API_KEY = "4d197051b0ff8b55eeb66c6048ee213d"; 


    // step 2
    getWeatherButton.addEventListener("click", async () => {
        const city = cityInput.textContent

        // step 3
        try {
            const data = await fetchWeatherData(city)
            displayWeatherData(data)
        } catch (error) {
            showError()
        }
    })

    // step 4
    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const reponse = await fetch(url)
        console.log("RESPONSE ", reponse);
        

        if(!reponse.ok) throw new Error("City Not Found");

        const data = await reponse.json()
        return data
    }

    function displayWeatherData(data){
        

         const { name, main, weather } = data;

         weatherInfo.classList.remove("hidden");
         errorMessage.classList.add("hidden");
         // st2 : use the data acc
         cityNameDisplay.textContent = name;
         temparatureDisplay.textContent = `Temparatue : ${main.temp}`;
         descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    }

    function showError(){
        errorMessage.classList.remove("hidden")
        weatherInfo.classList.add("hidden")
    }



})