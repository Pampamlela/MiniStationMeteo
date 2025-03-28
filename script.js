//Etape 2: Récupérer les coordonnées de la ville 
const divCity = document.getElementById("city");
const divGps = document.getElementById("gps");
const divTemperature = document.getElementById("temperature")
const divDetail = document.getElementById("details")

//fonction asynchrone pour récuperer les coordonnées d'une ville
async function fetchCoordinates(city){
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&limit=1`);
    const data = await response.json();
    console.log(data);

    let townLat
    let townLon

    for(town of data){
        townLat = town.lat;
        console.log(townLat);
        townLon = town.lon;
        console.log(townLon);
        
        divCity.innerHTML = town.name; // on récupère le nom de la ville et on l'affiche dans le HTML
        divGps.innerHTML += ("Coordonnées GPS : " + townLat + ", " + townLon); // on récupère les coordonnées de la ville et on les affiche dans le HTML  
    };

    return townLat, townLon
};

//Etape 3: Affiche la température courante de la ville

//fonction asynchrone pour récuperer la température de la ville
// ! problème pour récupérer les coordonnées trouvées grace à fetchCoordinates(city)
async function fetchWeather(townLat, townLon){
    townLat = await fetchCoordinates(city);
    console.log("AHHHHH" + townLat)
    townLon = await fetchCoordinates(city);
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${townLat}&longitude=${townLon}&current=temperature_2m,precipitation,relative_humidity_2m`);
    const data = await response.json();
    console.log(data);
    let currentTemperature = data.current.temperature_2m; // on récupère la température actuelle
    divTemperature.innerHTML = ( currentTemperature + " °C"); // on ajoute la température au HTML
    divDetail.innerHTML = ("Température actuelle")
    
};

//gestionnaire d'évenement sur le bouton
let bouton = document.querySelector("button"); // on récupère le bouton
bouton.addEventListener("click", (event) => {
    let city = document.getElementById("cityInput").value; //on récupère la valeur tapée dans le champs ville
    console.log(city);

    fetchCoordinates(city);

if (fetchCoordinates = true){
        fetchWeather(townLat, townLon);
    }else{
        divDetail = ("Ville non trouvée")
    }
   
});

