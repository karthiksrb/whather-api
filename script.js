const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

// Function to remove old clones
function removeOldClones() {
    const oldClones = document.querySelectorAll('.active-clone');
    oldClones.forEach(clone => {
        clone.classList.remove('active-clone');
        setTimeout(() => clone.remove(), 2200);
    });
}

// Event listener for the search button
search.addEventListener('click', () => {
    const APIKey = '0cd28d818576873c20c6034fb9bd822c';
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') return;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => { 
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                removeOldClones(); // Ensure old clones are removed
                return;
            }

            // Update weather data
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent !== city) {
                cityHide.textContent = city;
                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                // Remove old clones
                removeOldClones();

                setTimeout(() => {
                    container.classList.remove('active');
                }, 2500);

                temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
                description.innerHTML = json.weather[0].description;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${Math.round(json.wind.speed)} km/h`;

                // Set the appropriate image based on the weather condition
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'image/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'image/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'image/snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'image/cloud.png';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = 'image/mist.png';
                        break;
                    case 'Drizzle':
                        image.src = 'image/drizzle.png';
                        break;
                    default:
                        image.src = 'image/cloud.png';
                }

                // Clone the elements
                const infoWeather = document.querySelector('.weather-box .info-weather');
                const infoHumidity = document.querySelector('.weather-details .humidity .info-humidity');
                const infoWind = document.querySelector('.weather-details .wind .info-wind');

                if (!infoWeather || !infoHumidity || !infoWind) return;

                const elCloneInfoWeather = infoWeather.cloneNode(true);
                const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                const elCloneInfoWind = infoWind.cloneNode(true);

                elCloneInfoWeather.id = 'clone-info-weather';
                elCloneInfoHumidity.id = 'clone-info-humidity';
                elCloneInfoWind.id = 'clone-info-wind';
                elCloneInfoWeather.classList.add('active-clone');
                elCloneInfoHumidity.classList.add('active-clone');
                elCloneInfoWind.classList.add('active-clone');

                // Insert cloned elements after the original ones with a delay
                setTimeout(() => {
                    infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                    infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                    infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
                }, 2200);
            }
        })
        .catch(error => console.error('Error:', error));
});
