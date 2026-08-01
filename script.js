// DOM Elements
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const cityInput = document.getElementById('city-input');
const errorMessage = document.getElementById('error-message');

const temperatureEl = document.getElementById('temperature');
const cityNameEl = document.getElementById('city-name');
const weatherConditionEl = document.getElementById('weather-condition');
const weatherIconEl = document.getElementById('weather-icon');

// Advanced metrics Elements
const windSpeedEl = document.getElementById('wind-speed');
const compassArrow = document.getElementById('compass-arrow');
const humidityEl = document.getElementById('humidity');
const humidityBar = document.getElementById('humidity-bar');
const uvIndexEl = document.getElementById('uv-index');
const uvBarFill = document.getElementById('uv-bar-fill');
const uvTextEl = document.getElementById('uv-text');
const aqiEl = document.getElementById('aqi');
const aqiBadge = document.getElementById('aqi-badge');
const pressureEl = document.getElementById('pressure');

// Toggle Elements
const unitToggle = document.getElementById('unit-toggle');
const celsiusBtn = document.getElementById('celsius-btn');
const fahrenheitBtn = document.getElementById('fahrenheit-btn');

// Tab Navigation Elements
const tabWeather = document.getElementById('tab-weather');
const tabDrive = document.getElementById('tab-drive');
const weatherSearchContainer = document.getElementById('weather-search-container');
const weatherDashboardPanel = document.getElementById('weather-dashboard-panel');
const weatherStatsGrid = document.getElementById('weather-stats-grid');
const drivePlannerPanel = document.getElementById('drive-planner-panel');

// Skeleton State
const weatherSkeleton = document.getElementById('weather-skeleton');
const weatherRealContent = document.getElementById('weather-real-content');

// Drive Planner Elements
const originInput = document.getElementById('origin-input');
const destInput = document.getElementById('dest-input');
const planDriveBtn = document.getElementById('plan-drive-btn');
const driveResults = document.getElementById('drive-results');
const driveDistance = document.getElementById('drive-distance');
const driveDuration = document.getElementById('drive-duration');

// Timeline Elements
const originDot = document.getElementById('origin-dot');
const originCityLbl = document.getElementById('origin-city-lbl');
const originWeatherLbl = document.getElementById('origin-weather-lbl');
const originSafetyBadge = document.getElementById('origin-safety-badge');

const midpointDot = document.getElementById('midpoint-dot');
const midpointCityLbl = document.getElementById('midpoint-city-lbl');
const midpointWeatherLbl = document.getElementById('midpoint-weather-lbl');
const midpointSafetyBadge = document.getElementById('midpoint-safety-badge');

const destDot = document.getElementById('dest-dot');
const destCityLbl = document.getElementById('dest-city-lbl');
const destWeatherLbl = document.getElementById('dest-weather-lbl');
const destSafetyBadge = document.getElementById('dest-safety-badge');

const overallSafetyCard = document.getElementById('overall-safety-card');
const overallStatus = document.getElementById('overall-status');
const overallReason = document.getElementById('overall-reason');

// State Variables
let currentUnit = 'metric'; // 'metric' = Celsius, 'imperial' = Fahrenheit
let currentTempC = null; // Store temp in C for conversion
let hourlyForecastData = []; // Store hourly temperature forecast
let hourlyTimeData = []; // Store hourly times

// Premium Day/Night Backgrounds
const backgrounds = {
    'Clear': {
        day: 'url("https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=2560&auto=format&fit=crop")',
        night: 'url("https://images.unsplash.com/photo-1507400492013-162706c8c05e?q=80&w=2560&auto=format&fit=crop")'
    },
    'Clouds': {
        day: 'url("https://images.unsplash.com/photo-1534088568595-a066f410cbda?q=80&w=2560&auto=format&fit=crop")',
        night: 'url("https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=2560&auto=format&fit=crop")'
    },
    'Rain': {
        day: 'url("https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2560&auto=format&fit=crop")',
        night: 'url("https://images.unsplash.com/photo-1428592953211-077101b2021b?q=80&w=2560&auto=format&fit=crop")'
    },
    'Thunderstorm': {
        day: 'url("https://images.unsplash.com/photo-1605727216801-e27ce1d0ce3c?q=80&w=2560&auto=format&fit=crop")',
        night: 'url("https://images.unsplash.com/photo-1605727216801-e27ce1d0ce3c?q=80&w=2560&auto=format&fit=crop")'
    },
    'Snow': {
        day: 'url("https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2560&auto=format&fit=crop")',
        night: 'url("https://images.unsplash.com/photo-1542601098-8fc114e148e2?q=80&w=2560&auto=format&fit=crop")'
    },
    'Mist': {
        day: 'url("https://images.unsplash.com/photo-1543968996-ee822b817625?q=80&w=2560&auto=format&fit=crop")',
        night: 'url("https://images.unsplash.com/photo-1543968996-ee822b817625?q=80&w=2560&auto=format&fit=crop")'
    },
    'Default': {
        day: 'url("https://images.unsplash.com/photo-1534088568595-a066f410cbda?q=80&w=2560&auto=format&fit=crop")',
        night: 'url("https://images.unsplash.com/photo-1507400492013-162706c8c05e?q=80&w=2560&auto=format&fit=crop")'
    }
};

// Weather codes map
const wmoToCondition = {
    0: { main: 'Clear', icon: '01d' },
    1: { main: 'Clear', icon: '02d' },
    2: { main: 'Clouds', icon: '03d' },
    3: { main: 'Clouds', icon: '04d' },
    45: { main: 'Mist', icon: '50d' },
    48: { main: 'Mist', icon: '50d' },
    51: { main: 'Rain', icon: '09d' },
    53: { main: 'Rain', icon: '09d' },
    55: { main: 'Rain', icon: '09d' },
    56: { main: 'Rain', icon: '09d' },
    57: { main: 'Rain', icon: '09d' },
    61: { main: 'Rain', icon: '10d' },
    63: { main: 'Rain', icon: '10d' },
    65: { main: 'Rain', icon: '10d' },
    66: { main: 'Rain', icon: '10d' },
    67: { main: 'Rain', icon: '10d' },
    71: { main: 'Snow', icon: '13d' },
    73: { main: 'Snow', icon: '13d' },
    75: { main: 'Snow', icon: '13d' },
    77: { main: 'Snow', icon: '13d' },
    80: { main: 'Rain', icon: '09d' },
    81: { main: 'Rain', icon: '09d' },
    82: { main: 'Rain', icon: '09d' },
    85: { main: 'Snow', icon: '13d' },
    86: { main: 'Snow', icon: '13d' },
    95: { main: 'Thunderstorm', icon: '11d' },
    96: { main: 'Thunderstorm', icon: '11d' },
    99: { main: 'Thunderstorm', icon: '11d' }
};

// Toggle metric units
unitToggle.addEventListener('click', () => {
    if (currentUnit === 'metric') {
        currentUnit = 'imperial';
        unitToggle.classList.add('fahrenheit-active');
        celsiusBtn.classList.remove('active-unit');
        fahrenheitBtn.classList.add('active-unit');
    } else {
        currentUnit = 'metric';
        unitToggle.classList.remove('fahrenheit-active');
        celsiusBtn.classList.add('active-unit');
        fahrenheitBtn.classList.remove('active-unit');
    }
    updateTemperatureDisplay();
    // Re-render components relying on temperature scale
    renderSVGChart();
});

// Navigation tabs switcher
tabWeather.addEventListener('click', () => {
    tabWeather.classList.add('active');
    tabDrive.classList.remove('active');
    
    // Smooth opacity fading
    drivePlannerPanel.style.display = 'none';
    weatherSearchContainer.style.display = 'flex';
    weatherDashboardPanel.style.display = 'grid';
    weatherStatsGrid.style.display = 'grid';
});

tabDrive.addEventListener('click', () => {
    tabDrive.classList.add('active');
    tabWeather.classList.remove('active');
    
    weatherSearchContainer.style.display = 'none';
    weatherDashboardPanel.style.display = 'none';
    weatherStatsGrid.style.display = 'none';
    drivePlannerPanel.style.display = 'flex';
});

// Search input events
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== "") getWeatherData(city);
    else triggerSearchError();
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city !== "") getWeatherData(city);
        else triggerSearchError();
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        }, () => {
            alert("Location access denied or unavailable.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

// Plan drive safety button
planDriveBtn.addEventListener('click', () => {
    const origin = originInput.value.trim();
    const dest = destInput.value.trim();
    if (origin !== "" && dest !== "") {
        planRoute(origin, dest);
    } else {
        alert("Please enter both departure and destination cities.");
    }
});

// Initial weather fetch on startup
window.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        }, () => {
            // Default to Hyderabad if location permission is denied
            getWeatherData('Hyderabad');
        });
    } else {
        getWeatherData('Hyderabad');
    }
});

// Trigger shake error animation on inputs
function triggerSearchError() {
    weatherSearchContainer.classList.add('shake');
    setTimeout(() => {
        weatherSearchContainer.classList.remove('shake');
    }, 500);
}

// City synonym mappings for common names that fail in Open-Meteo
const CITY_SYNONYMS = {
    "bangalore": "Bengaluru",
    "bombay": "Mumbai",
    "madras": "Chennai",
    "calcutta": "Kolkata",
    "trivandrum": "Thiruvananthapuram",
    "cochin": "Kochi",
    "pondicherry": "Puducherry",
    "mysore": "Mysuru",
    "poona": "Pune",
    "vizag": "Visakhapatnam",
    "gauhati": "Guwahati",
    "baroda": "Vadodara",
    "benares": "Varanasi"
};

// Fetch coordinates from geocoding API with robust filtering
async function getGeoCoords(city) {
    let cleanCity = city.trim();
    let filterPart = null;

    // Handle comma-separated location refinements (e.g. "Bangalore, India")
    if (cleanCity.includes(',')) {
        const parts = cleanCity.split(',');
        cleanCity = parts[0].trim();
        filterPart = parts[1].trim().toLowerCase();
    }

    const lowerCity = cleanCity.toLowerCase();
    if (CITY_SYNONYMS[lowerCity]) {
        cleanCity = CITY_SYNONYMS[lowerCity];
    }

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanCity)}&count=20&language=en&format=json`;
    const geoResponse = await fetch(geoUrl);
    if (!geoResponse.ok) throw new Error("Network response error during geocoding.");
    const geoData = await geoResponse.json();
    if (!geoData.results || geoData.results.length === 0) throw new Error("City not found: " + city);

    const results = geoData.results;

    // Sort to prioritize India and larger cities to avoid matching tiny foreign villages
    results.sort((a, b) => {
        if (filterPart) {
            const aMatches = (
                (a.country && a.country.toLowerCase().includes(filterPart)) ||
                (a.country_code && a.country_code.toLowerCase().includes(filterPart)) ||
                (a.admin1 && a.admin1.toLowerCase().includes(filterPart)) ||
                (a.admin2 && a.admin2.toLowerCase().includes(filterPart))
            ) ? 1 : 0;
            const bMatches = (
                (b.country && b.country.toLowerCase().includes(filterPart)) ||
                (b.country_code && b.country_code.toLowerCase().includes(filterPart)) ||
                (b.admin1 && b.admin1.toLowerCase().includes(filterPart)) ||
                (b.admin2 && b.admin2.toLowerCase().includes(filterPart))
            ) ? 1 : 0;
            if (aMatches !== bMatches) return bMatches - aMatches;
        }

        // Prioritize India (IN)
        const aIsIndia = a.country_code === 'IN' ? 1 : 0;
        const bIsIndia = b.country_code === 'IN' ? 1 : 0;
        if (aIsIndia !== bIsIndia) return bIsIndia - aIsIndia;

        // Prioritize population
        const aPop = a.population || 0;
        const bPop = b.population || 0;
        if (aPop !== bPop) return bPop - aPop;

        return 0;
    });

    return results[0];
}

// Search by city query
async function getWeatherData(city) {
    try {
        errorMessage.style.display = 'none';
        toggleSkeletonState(true);
        const coords = await getGeoCoords(city);
        await fetchAndDisplayWeather(coords.latitude, coords.longitude, coords.name);
    } catch (error) {
        console.error(error);
        toggleSkeletonState(false);
        errorMessage.style.display = 'block';
        triggerSearchError();
    }
}

// Search by coordinates
async function getWeatherByCoords(lat, lon) {
    try {
        errorMessage.style.display = 'none';
        toggleSkeletonState(true);
        cityInput.value = '';
        
        let locationName = "Unknown Location";
        try {
            const reverseGeoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
            const reverseGeoResponse = await fetch(reverseGeoUrl);
            const reverseGeoData = await reverseGeoResponse.json();
            locationName = reverseGeoData.city || reverseGeoData.locality || reverseGeoData.principalSubdivision || "Your Area";
        } catch(e) {
            locationName = "Your Area";
        }
        
        await fetchAndDisplayWeather(lat, lon, locationName);
    } catch (error) {
        console.error(error);
        toggleSkeletonState(false);
        errorMessage.style.display = 'block';
    }
}

// Manage skeleton loading screen state
function toggleSkeletonState(isLoading) {
    const container = document.querySelector('.weather-container');
    if (isLoading) {
        if (container) container.classList.add('loading');
        weatherSkeleton.style.display = 'flex';
        weatherRealContent.style.display = 'none';
    } else {
        if (container) container.classList.remove('loading');
        weatherSkeleton.style.display = 'none';
        weatherRealContent.style.display = 'block';
    }
}

// Main API retrieval orchestrator
async function fetchAndDisplayWeather(lat, lon, locationName) {
    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,is_day&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=6`;
        const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,uv_index`;

        const [weatherResponse, aqiResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(airQualityUrl)
        ]);
        
        if (!weatherResponse.ok) throw new Error("Location API retrieval error.");
        
        const weatherData = await weatherResponse.json();
        const aqiData = aqiResponse.ok ? await aqiResponse.json() : null;
        
        const current = weatherData.current;
        const currentAqi = aqiData ? aqiData.current : {};
        
        const weatherMapping = wmoToCondition[current.weather_code] || { main: 'Unknown', icon: '03d' };
        
        let iconCode = weatherMapping.icon;
        if (current.is_day === 0) iconCode = iconCode.replace('d', 'n');
        
        // Save hourly stats for SVG trend line
        hourlyForecastData = weatherData.hourly.temperature_2m.slice(0, 12);
        hourlyTimeData = weatherData.hourly.time.slice(0, 12);

        // Update dashboard values
        updateUI({
            temp: current.temperature_2m,
            name: locationName,
            condition: weatherMapping.main,
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            windDirection: current.wind_direction_10m,
            pressure: current.surface_pressure,
            aqi: currentAqi.us_aqi,
            uv: currentAqi.uv_index,
            iconCode: iconCode,
            isDay: current.is_day
        });

        // Render Forecast sliders & lists
        renderHourlyForecast(weatherData.hourly);
        renderDailyForecast(weatherData.daily);
        renderSVGChart();

        toggleSkeletonState(false);
    } catch (error) {
        console.error(error);
        toggleSkeletonState(false);
        errorMessage.style.display = 'block';
    }
}

// Populate interface elements
function updateUI(data) {
    currentTempC = data.temp;
    updateTemperatureDisplay();
    
    cityNameEl.textContent = data.name;
    weatherConditionEl.textContent = data.condition;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${data.iconCode}@4x.png`;

    // Advanced widget details
    windSpeedEl.textContent = `${Math.round(data.windSpeed)} km/h`;
    compassArrow.style.transform = `rotate(${data.windDirection || 0}deg)`;

    // Humidity circular progress (circumference is 201)
    humidityEl.textContent = `${data.humidity}%`;
    const offset = 201 - (201 * (data.humidity || 0)) / 100;
    humidityBar.style.strokeDashoffset = offset;

    // UV Index Progress Bar
    const uvVal = data.uv !== undefined ? Math.round(data.uv) : 0;
    uvIndexEl.textContent = uvVal;
    uvBarFill.style.width = `${Math.min((uvVal / 12) * 100, 100)}%`;

    let uvText = "Low";
    if (uvVal >= 3 && uvVal <= 5) uvText = "Moderate";
    else if (uvVal >= 6 && uvVal <= 7) uvText = "High";
    else if (uvVal >= 8) uvText = "Very High";
    uvTextEl.textContent = `${uvText} Risk`;

    // AQI rating badge
    const aqiVal = data.aqi !== undefined ? data.aqi : 0;
    aqiEl.textContent = aqiVal;
    aqiBadge.className = 'aqi-badge';
    if (aqiVal <= 50) {
        aqiBadge.textContent = 'Good';
        aqiBadge.classList.add('good');
    } else if (aqiVal <= 100) {
        aqiBadge.textContent = 'Moderate';
        aqiBadge.classList.add('moderate');
    } else if (aqiVal <= 150) {
        aqiBadge.textContent = 'Poor';
        aqiBadge.classList.add('poor');
    } else {
        aqiBadge.textContent = 'Toxic';
        aqiBadge.classList.add('toxic');
    }

    pressureEl.textContent = data.pressure ? `${Math.round(data.pressure)} hPa` : "N/A";
    
    // Handle atmospheric crossfade background triggers
    const timeOfDay = data.isDay === 1 ? 'day' : 'night';
    const conditionBackgrounds = backgrounds[data.condition] || backgrounds['Default'];
    const selectedBackgroundUrl = conditionBackgrounds[timeOfDay];
    
    const overlay = document.getElementById('bg-overlay');
    overlay.style.backgroundImage = selectedBackgroundUrl;
    overlay.style.opacity = 0.55;
}

// Convert temperature scale displays
function updateTemperatureDisplay() {
    if (currentTempC === null) return; 
    if (currentUnit === 'metric') {
        temperatureEl.textContent = `${Math.round(currentTempC)}°C`;
    } else {
        const tempF = (currentTempC * 9/5) + 32;
        temperatureEl.textContent = `${Math.round(tempF)}°F`;
    }
}

// Populate horizontal hourly forecast cards
function renderHourlyForecast(hourlyData) {
    const listContainer = document.getElementById('hourly-list');
    listContainer.innerHTML = '';

    // Take weather values for the next 24 hours (step of 2 to display neatly)
    for (let i = 0; i < 24; i += 2) {
        const timeStr = hourlyData.time[i];
        const tempC = hourlyData.temperature_2m[i];
        const code = hourlyData.weather_code[i];

        const date = new Date(timeStr);
        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const formattedHour = `${hours} ${ampm}`;

        const conditionMapping = wmoToCondition[code] || { main: 'Clear', icon: '01d' };
        const iconSrc = `https://openweathermap.org/img/wn/${conditionMapping.icon}.png`;

        let displayTemp = `${Math.round(tempC)}°`;
        if (currentUnit === 'imperial') {
            displayTemp = `${Math.round((tempC * 9/5) + 32)}°`;
        }

        const card = document.createElement('div');
        card.className = 'hourly-card';
        card.innerHTML = `
            <span class="time">${formattedHour}</span>
            <img src="${iconSrc}" alt="forecast icon">
            <span class="temp">${displayTemp}</span>
        `;
        listContainer.appendChild(card);
    }
}

// Draw dynamic temperature curves
function renderSVGChart() {
    const linePath = document.getElementById('chart-line-path');
    const areaPath = document.getElementById('chart-area-path');
    const svg = document.getElementById('temp-chart-svg');
    const tooltip = document.getElementById('chart-tooltip');
    
    // Clear any previous interactive circles
    const circles = svg.querySelectorAll('circle');
    circles.forEach(c => c.remove());

    if (hourlyForecastData.length === 0) return;

    // Convert hourly values to appropriate scale unit
    const temps = hourlyForecastData.map(t => currentUnit === 'metric' ? t : (t * 9/5) + 32);
    
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const tempRange = (maxTemp - minTemp) || 1;

    // SVG coordinates setup
    const svgWidth = 500;
    const svgHeight = 120;
    const paddingX = 25;
    const paddingY = 20;

    const points = temps.map((temp, index) => {
        const x = paddingX + (index * (svgWidth - paddingX * 2) / (temps.length - 1));
        // Scale temperature values to Y coordinates (inverted y scale in SVG)
        const y = svgHeight - paddingY - ((temp - minTemp) / tempRange * (svgHeight - paddingY * 2));
        return { x, y, temp, rawTime: hourlyTimeData[index] };
    });

    // Create line path sequence
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        // Curve construction using bezier anchors
        const prev = points[i - 1];
        const curr = points[i];
        const cpX1 = prev.x + (curr.x - prev.x) / 2;
        const cpY1 = prev.y;
        const cpX2 = prev.x + (curr.x - prev.x) / 2;
        const cpY2 = curr.y;
        d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
    }

    linePath.setAttribute('d', d);

    // Create closed area fill sequence
    const areaD = d + ` L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;
    areaPath.setAttribute('d', areaD);

    // Add interactive point nodes on the SVG chart
    points.forEach((pt) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pt.x);
        circle.setAttribute('cy', pt.y);
        circle.setAttribute('r', 4);
        circle.setAttribute('fill', '#00f2fe');
        circle.setAttribute('stroke', '#ffffff');
        circle.setAttribute('stroke-width', 1.5);
        circle.style.cursor = 'pointer';
        circle.style.transition = 'r 0.2s';

        // Mouse events for custom chart tooltips
        circle.addEventListener('mouseenter', (e) => {
            circle.setAttribute('r', 7);
            const date = new Date(pt.rawTime);
            let hr = date.getHours();
            const am = hr >= 12 ? 'PM' : 'AM';
            hr = hr % 12 || 12;

            tooltip.style.opacity = 1;
            tooltip.innerHTML = `<strong>${Math.round(pt.temp)}°${currentUnit === 'metric' ? 'C' : 'F'}</strong> @ ${hr} ${am}`;
            
            // Positioning tooltip
            const rect = svg.getBoundingClientRect();
            const tooltipX = pt.x * (rect.width / svgWidth) - 30;
            const tooltipY = pt.y * (rect.height / svgHeight) - 40;
            tooltip.style.left = `${tooltipX}px`;
            tooltip.style.top = `${tooltipY}px`;
        });

        circle.addEventListener('mouseleave', () => {
            circle.setAttribute('r', 4);
            tooltip.style.opacity = 0;
        });

        svg.appendChild(circle);
    });
}

// Populate 5-day vertical list
function renderDailyForecast(dailyData) {
    const listContainer = document.getElementById('daily-list');
    listContainer.innerHTML = '';

    // Show 5 forecast days (skipping day 0, which is the current day)
    for (let i = 1; i <= 5; i++) {
        const dateStr = dailyData.time[i];
        const tempMax = dailyData.temperature_2m_max[i];
        const tempMin = dailyData.temperature_2m_min[i];
        const code = dailyData.weather_code[i];

        const date = new Date(dateStr);
        const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });

        const conditionMapping = wmoToCondition[code] || { main: 'Clouds', icon: '03d' };
        const iconSrc = `https://openweathermap.org/img/wn/${conditionMapping.icon}.png`;

        let displayMax = `${Math.round(tempMax)}°`;
        let displayMin = `${Math.round(tempMin)}°`;
        if (currentUnit === 'imperial') {
            displayMax = `${Math.round((tempMax * 9/5) + 32)}°`;
            displayMin = `${Math.round((tempMin * 9/5) + 32)}°`;
        }

        const row = document.createElement('div');
        row.className = 'daily-row';
        row.innerHTML = `
            <span class="day">${dayLabel}</span>
            <img src="${iconSrc}" alt="condition icon">
            <span class="condition-label">${conditionMapping.main}</span>
            <span class="temp-range">
                <span class="high">${displayMax}</span>
                <span class="low">${displayMin}</span>
            </span>
        `;
        listContainer.appendChild(row);
    }
}

// Drive Planner: Geocoding helper with coordinate object mapping
async function geocodeRouteCity(cityName) {
    try {
        const coords = await getGeoCoords(cityName);
        return { name: coords.name, lat: coords.latitude, lon: coords.longitude };
    } catch(e) {
        throw new Error(`Location not found: "${cityName}"`);
    }
}

// Drive Planner multi-stop weather planner
async function planRoute(origin, dest) {
    try {
        errorMessage.style.display = 'none';
        driveResults.style.display = 'none';
        planDriveBtn.textContent = 'Analyzing Route...';
        planDriveBtn.disabled = true;

        // 1. Geocode locations in parallel
        const [origPoint, destPoint] = await Promise.all([
            geocodeRouteCity(origin),
            geocodeRouteCity(dest)
        ]);

        // 2. Compute geographic midpoint coordinates
        const midLat = (origPoint.lat + destPoint.lat) / 2;
        const midLon = (origPoint.lon + destPoint.lon) / 2;

        let midName = "Midpoint Area";
        try {
            const reverseGeoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${midLat}&longitude=${midLon}&localityLanguage=en`;
            const reverseGeoResponse = await fetch(reverseGeoUrl);
            const reverseGeoData = await reverseGeoResponse.json();
            midName = reverseGeoData.city || reverseGeoData.locality || "Mid-route Area";
        } catch(e) {
            midName = "Mid-route Coordinates";
        }

        // 3. Fetch OSRM route metrics
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${origPoint.lon},${origPoint.lat};${destPoint.lon},${destPoint.lat}?overview=false`;
        const routeRes = await fetch(osrmUrl);
        const routeData = await routeRes.json();
        
        if (routeData.code !== 'Ok') throw new Error("Could not find a driving route between cities.");
        
        const durationSec = routeData.routes[0].duration;
        const distanceKm = routeData.routes[0].distance / 1000;

        // 4. Fetch weather forecasts for all 3 nodes concurrently
        const fetchWeatherNode = async (lat, lon) => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code`;
            const res = await fetch(url);
            const data = await res.json();
            return wmoToCondition[data.current.weather_code].main;
        };

        const [origWeather, midWeather, destWeather] = await Promise.all([
            fetchWeatherNode(origPoint.lat, origPoint.lon),
            fetchWeatherNode(midLat, midLon),
            fetchWeatherNode(destPoint.lat, destPoint.lon)
        ]);

        // 5. Update timeline displays
        updateRouteTimelineNode('origin', origPoint.name, origWeather);
        updateRouteTimelineNode('midpoint', midName, midWeather);
        updateRouteTimelineNode('dest', destPoint.name, destWeather);

        // 6. Calculate overall route safety metrics
        const nodesWeather = [origWeather, midWeather, destWeather];
        let safetyRating = 'safe';
        let hazardousConditions = [];

        nodesWeather.forEach((condition, idx) => {
            const label = idx === 0 ? 'Origin' : idx === 1 ? 'Midpoint' : 'Destination';
            if (['Rain', 'Snow', 'Mist'].includes(condition)) {
                if (safetyRating !== 'danger') safetyRating = 'caution';
                hazardousConditions.push(`${condition.toLowerCase()} at the ${label}`);
            } else if (['Thunderstorm'].includes(condition)) {
                safetyRating = 'danger';
                hazardousConditions.push(`thunderstorms at the ${label}`);
            }
        });

        // Format drive summary duration labels
        const hrs = Math.round(durationSec / 3600);
        const mins = Math.round((durationSec % 3600) / 60);

        driveDistance.textContent = `${Math.round(distanceKm)} km`;
        driveDuration.textContent = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

        // Style safety notification panel
        overallSafetyCard.className = 'overall-safety-card';
        overallSafetyCard.classList.add(safetyRating);

        if (safetyRating === 'safe') {
            overallStatus.textContent = 'Safe to Drive!';
            overallStatus.style.color = 'var(--success-color)';
            overallReason.textContent = 'Weather conditions look good across the entire route. Enjoy your trip!';
        } else if (safetyRating === 'caution') {
            overallStatus.textContent = 'Caution Advised!';
            overallStatus.style.color = 'var(--warning-color)';
            overallReason.textContent = `Wet surfaces or low visibility due to ${hazardousConditions.join(' and ')}. Keep safe distance.`;
        } else {
            overallStatus.textContent = 'Dangerous Conditions!';
            overallStatus.style.color = 'var(--danger-color)';
            overallReason.textContent = `Avoid driving if possible. Active ${hazardousConditions.join(' and ')}. Delay travel.`;
        }

        driveResults.style.display = 'block';
    } catch (e) {
        console.error(e);
        alert(e.message || "Route calculation failed. Check network status and input names.");
    } finally {
        planDriveBtn.textContent = 'Check Route Safety';
        planDriveBtn.disabled = false;
    }
}

// Color/style formatting helper for timeline nodes
function updateRouteTimelineNode(nodePrefix, cityName, condition) {
    const dot = document.getElementById(`${nodePrefix}-dot`);
    const cityLbl = document.getElementById(`${nodePrefix}-city-lbl`);
    const weatherLbl = document.getElementById(`${nodePrefix}-weather-lbl`);
    const badge = document.getElementById(`${nodePrefix}-safety-badge`);

    cityLbl.textContent = cityName;
    weatherLbl.textContent = condition;

    dot.className = 'timeline-dot';
    badge.className = 'node-safety-badge';

    if (['Rain', 'Snow', 'Mist'].includes(condition)) {
        dot.classList.add('caution');
        badge.classList.add('caution');
        badge.textContent = 'Caution';
    } else if (['Thunderstorm'].includes(condition)) {
        dot.classList.add('danger');
        badge.classList.add('danger');
        badge.textContent = 'Danger';
    } else {
        dot.classList.add('safe');
        badge.classList.add('safe');
        badge.textContent = 'Good';
    }
}
