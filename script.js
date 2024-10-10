document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit');
    const temp = document.getElementById('temp-number');
    const cityname = document.getElementById('cityname');
    const datetime = document.getElementById('datetime');
    const desc = document.getElementById('desc');
    const wind = document.getElementById('wind');
    const humid = document.getElementById('humid');
    const pressure = document.getElementById('pressure');

    submitBtn.addEventListener('click', fillData);

    async function fillData(e) {
        e.preventDefault();
        const city = document.getElementById('city').value;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a82e28231bbceaada6be8d6a8fe6a435&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();

            // Update weather information
            temp.textContent = data.main.temp;
            cityname.textContent = data.name;
            desc.textContent = data.weather[0].main;
            wind.textContent = data.wind.speed + ' km/h';
            humid.textContent = data.main.humidity + '%';
            pressure.textContent = data.main.pressure + ' hPa';

            // Convert dt (Unix timestamp) to a readable date
            const date = new Date(data.dt * 1000); // Convert seconds to milliseconds
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            };
            datetime.textContent = date.toLocaleDateString('en-US', options);
            
            console.log(data);
        } catch (error) {
            console.error(error);
            alert(error.message); // Show error message to user
        }
    }
});
