// netlify/functions/api-proxy.js

exports.handler = async (event, context) => {
  // Bu anahtar Netlify panelinden gelecek, tarayıcıda asla görünmeyecek
  const API_KEY = process.env.API_KEY;

  // Frontend'den gelen sorguyu al (Örn: ?city=Ankara)
  const city = event.queryStringParameters.city;

  // Kendi API adresini buraya yaz (Örnek olarak OpenWeather kullanılmıştır)
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&lang=tr&days=14`;
    //

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // CORS hatalarını önler
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Sunucu hatası: API'ye bağlanılamadı" }),
    };
  }
};