document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector(".search-icon");
    const searchInput = document.querySelector('.search-bar');
    const cityElem = document.querySelector('.city');
    const tempElem = document.querySelector('.temp');
    const descriptionElem = document.querySelector('.description h3');
    const humidityElem = document.querySelector('.humidity');
    const windElem = document.querySelector('.wind');
    const weather = document.querySelector('.weather');
    const dateElem = document.querySelector('.date');
    const mainMaxTemp = document.querySelector('.mainMaxTemp');
    const descriptionImage = document.querySelector('.flex .icon');
    const error404 = document.querySelector('.error404')

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            let city = searchInput.value.trim();
            if (city) {
                getAllInfo(city);
            }
        }
    });

    searchBar.addEventListener('click', () => {
        let city = searchInput.value.trim();
        if (city) {
            getAllInfo(city);
        }
    });

    function getAllInfo(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c39d5ca23f810bad45bf0db794bb0da5`)
            .then(res => res.json())
            .then(data => {
                if (data.cod === 200) {
                    showData(data);
                    console.log(data);
                } else {
                    showError();
                }
            })
            .catch(error => showError());
    }

    function showData(data) {
        error404.style.display = 'none';
        weather.style.display = 'block';
        weather.classList.remove("loading");

        // تغییرات داده‌ها
        tempElem.textContent = `${Math.floor(data.main.temp - 273.15)} °C`;
        cityElem.textContent = `${data.name}, ${data.sys.country}`;
        humidityElem.textContent = `Humidity: ${data.main.humidity}%`;
        windElem.textContent = `Wind speed: ${data.wind.speed} km/h`;
        descriptionElem.textContent = data.weather[0].description;
        mainMaxTemp.textContent = `${Math.floor(data.main.temp_min - 273.15)} °C / ${Math.floor(data.main.temp_max - 273.15)} °C`;
        searchInput.value = '';

        // به‌روزرسانی آیکون آب و هوا
        updateWeatherIcon(data.weather[0].main);

        // نمایش داده‌ها با ترنزیشن
        document.querySelectorAll('.weather, .temp, .city, .description, .additional-info').forEach(elem => {
            elem.classList.add('show');
        });
    }

    function updateWeatherIcon(weatherCondition) {
        const iconMap = {
            'Rain': 'rain.png',
            'Clouds': 'cloud.png',
            'Clear': 'sunny.png',
            'Snow': 'snow.png',
            'Mist': 'mist.png',
            'Thunderstorm': 'thunderstorm.png',
        };

        const iconFile = iconMap[weatherCondition] || 'sunny.png';
        descriptionImage.setAttribute('src', `image/${iconFile}`);
    }

    function showError() {
        descriptionImage.setAttribute('src', 'image/404.jfif');
        weather.style.display = 'none';
        error404.style.display = 'flex';
        searchInput.value = '';

        // پنهان کردن داده‌ها با ترنزیشن
        document.querySelectorAll('.weather, .temp, .city, .description, .additional-info').forEach(elem => {
            elem.classList.remove('show');
        });
    }

    searchInput.focus();
});
