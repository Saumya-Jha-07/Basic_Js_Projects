document.addEventListener("DOMContentLoaded" , () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherButton = document.getElementById("get-weather-btn");
    const cityNameDisplay = document.getElementById("city-name");
    const temparatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const weatherInfo = document.getElementById("weather-info");

    const API_KEY = "4d197051b0ff8b55eeb66c6048ee213d";  


    getWeatherButton.addEventListener("click",async() => {
        const city = cityInput.value.trim()
        if(!city) return 

        // two things to remember while calling a database/servers
        // 1. it may show you some ERROR
        // 2. bhut duur hai server aapse , so it is going to take some time

        // solving the first case-scenario  -> error aaaya toh
        try {
            const weatherData = await fetchWeatherData(city)  // await solves 2nd issue
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }

    })

    async function fetchWeatherData(city){   // Overall goal : make a call and return the data 
        // st1 : provide url
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

        // st2 : make an api call and wait for the response 
        const response = await fetch(url)    // api call : return type is an object  
        console.log("RESPONSE : " , response);

        // st3 : check response's status
        if(!response.ok) throw new Error("City Not Found");

        // st4 : agr sb thik hai toh response.json() return  krdo
        const data = await response.json()
        return data
    }

    function displayWeatherData (data){  // Overall goal : to display the data 
        // console.log(data); // it returns an object

        // st1 : study the data , kaise receive hua hai 

        const {name , main , weather} = data

        weatherInfo.classList.remove("hidden")
        errorMessage.classList.add("hidden")
        // st2 : use the data acc
        cityNameDisplay.textContent = name
        temparatureDisplay.textContent =   `Temparatue : ${main.temp}`
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`

    }

    function showError(){    
        weatherInfo.classList.add('hidden')   // info  ko hidden hi rhne do
        errorMessage.classList.remove('hidden')  // agr hidden hai toh hta do we have to show the error
    }

})