//!elements
const days = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
const months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];

const img = document.querySelector(".weather-icon img");
const searchBtn = document.querySelector(".search-icon");
const cityInput = document.querySelector(".city-input");
const info = document.querySelector(".info");
const table = document.querySelector(".table");
const form = document.querySelector("form");
const bar = document.querySelector(".navbar i");

document.addEventListener("DOMContentLoaded", () => {
    info.style.display = "none";
    searchBtn.addEventListener("click", displayWeather);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        displayWeather();   
       
    })
    cityInput.addEventListener("keyup", () => {
        cityInput.value = cityInput.value.toUpperCase();
        
    })
    bar.addEventListener("click", () => {
        const menu = bar.parentElement.parentElement;
        menu.classList.toggle("active");
    
    })
})
function displayWeather() {
    info.style.display = "flex";

    info.classList.add("fadeIn");
    
    let city = cityInput.value.trim();
    if (city == "") {
        alert("input alanı boş geçilemez");
    } else {
        // let nowURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&lang=${"tr"}&days=${14}`;
      let nowURL = `/.netlify/functions/api-proxy?city=${city}`;
        getData(nowURL);
    }
    
}
function getData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => writeData(data))
    .catch((err) => err);
}
function writeData(data) {
    
    if (typeof data.current == "undefined") {
      alert("böyle şehir ismi bulunmamaktadır")
  } else {
     //!gelen veriler1
    const imageSource = data.current.condition.icon;
    //const feels = data.current.feelslike_c;
    const temperature = data.current.temp_c;
    const windSpeed = data.current.wind_kph;
    //const humidity = data.current.humidity;
    const cloud = data.current.cloud;
    //const isDay = data.current.is_day;
    const info = data.current.condition.text;
        //const lastUpdated = data.current.last_updated
       
      //!gelen veriler2
      const country = data.location.country;
      const city = data.location.name;
        //const enlem = data.location.lat;
        //const boylam = data.location.lon;
 
    //!yazdırma
    
        document.querySelector(".city").innerText = `${city}, ${country}`;
        img.src = imageSource;
        document.querySelector(".weather-degree").innerHTML = `${temperature} <sup>℃</sup>` ;
        document.querySelector(".weather-info").innerText = info;
        
        document.querySelector(".cloud-value").innerText=`%${cloud} `;
        document.querySelector(".wind-value").innerText=`${windSpeed} km /s`;

        nextStep(data.forecast.forecastday);
    //!anımation
        
    info.classList.add("fadeIn");

  }
}
function nextStep(futureData) {
    hourWeather.innerHTML = '';
    let result = "";
    const tarih = new Date();
    
    for (let i = 0; i < futureData.length; i++){
        
        const element = futureData[i];
           
        let subResult = ``;
        for (let j = 0; j < element.hour.length; j++) {
                
                const altElement = element.hour[j];
                const row = `<tr class="sub-row">
                
                        <td>
                            ${altElement.time.slice(altElement.time.length-5,altElement.time.length)}
                        </td>
                        <td>
                            <img src="${altElement.condition.icon}" alt="Hava durumu icon">
                        </td>
                        <td>
                            ${altElement.condition.text}
                        </td>
                        <td>
                            ${altElement.temp_c}°
                        </td>
                        <td>
                            ${altElement.chance_of_rain}%
                        </td>
                        <td>
                            ${altElement.wind_kph}
                        </td>
                    </tr>`;
                subResult+=row
                
        }
        let day = `${tarih.getDate()} ${months[tarih.getMonth()]} ${days[tarih.getDay()]}`;
        let satir = `<tr class="day-row"><td colspan="2">${day}</td><td><img src="${element.day.condition.icon}" alt="hava durumu"></td><td>${element.day.mintemp_c}</td><td>${element.day.maxtemp_c}</td><td>${element.day.avghumidity}</td><td>${element.day.
        daily_chance_of_rain
            }</td><td>${element.astro.sunrise}</td><td>${element.astro.sunset}</td>
            </tr>   
        `;
        result += satir;
        
        createHoursTable(subResult, day);

        tarih.setDate(tarih.getDate()+1);
    }
    
    table.innerHTML = `
    <table border="1" class='table-1'>
    <caption>3 Günlük Hava Durumu</caption>
    <thead>
    <tr><th rowspan="2" colspan="2">Tarih</th><th rowspan="2">Durum</th><th colspan="2">Sıcaklık(°C)</th><th rowspan="2">Nem(%)</th><th rowspan="2" colspan="1">Yağmur Yağma Olasılığı(%)</th><th colspan="2">Güneş Hareketleri</th></tr>
    
    <tr><th>En Düşük</th><th>En Yüksek</th><th>Doğuş</th><th>Batış</th></tr>
    </thead>
    
    <tbody>
    ${result}
    </tbody>;
    </table>
    `;
    addTable2Title();
      
}


const hourWeather = document.querySelector(".container .hours-weather")
function addTable2Title() {
    const title = document.querySelector(".hours .title");
    title.innerText = "Saatlik Hava Durumu";
}

function createHoursTable(subResult,title) {
    
    let table2 = document.createElement("table");
    table2.classList = "table-2";

    table2.innerHTML = 
    `
        <caption>${title}</caption>
        <thead>
         <tr class="sub-row"><th>Saat</th><th>Durum</th><th>Hava</th><th>Sıcaklık(°)</th><th>Yağmur Olasılığı(%)</th><th>Rüzgar Hızı(km/s)</th></tr>
        </thead>
        <tbody>

         ${
        subResult
         }
        </tbody>
    `;
    hourWeather.appendChild(table2)
}