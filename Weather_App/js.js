window.addEventListener('load', ()=>{
    const key = "DYUzecqDCeLtOg7ZaqOnjGkJjGA8laYG"
    let longitude = ''
    let latitude = ''
    let temperatureDiscription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let temperature = document.querySelector('.temperature')
    let unit = document.querySelector('.unit')
    let icon = document.querySelector('.icon')

    // get the geo-position of user
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(location =>{
            longitude = location.coords.longitude
            latitude = location.coords.latitude 
            console.log(latitude)
            console.log(longitude)
            const proxy = `https://cors-anywhere.herokuapp.com/`
            const zone = `${proxy}http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&q=${latitude}%2C${longitude}&details=true&toplevel=true`
            const current = `${proxy}http://dataservice.accuweather.com/currentconditions/v1/178541?apikey=${key}&details=true`
            const api = `${current}http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=%09%${key}&q=${latitude},${longitude}&details=true&toplevel=true`
            fetch(api)
            .then(response =>{
                return response.json()
            })
            .then(data =>{
                console.log(data)
           const {Temperature, WeatherText} = data[0]
           temperatureDegree.textContent = Temperature.Imperial.Value
           temperatureDiscription.innerText = WeatherText

           // change from farenheit to celsius
           temperature.addEventListener('click', ()=>{
                if(unit.innerText == 'ºF' && temperatureDegree.textContent == Temperature.Imperial.Value){
                    temperatureDegree.textContent = Temperature.Metric.Value
                    unit.innerText = 'ºC'
                }else{
                    temperatureDegree.textContent = Temperature.Imperial.Value
                    unit.innerText = 'ºF'
                }
           })

           // get timezone
           fetch(zone)
           .then(feedback =>{
               return feedback.json()
           })
           .then(info =>{
               console.log(info)
               const {TimeZone} = info
               locationTimezone.innerText = TimeZone.Name

               setIcon(WeatherText, document.querySelector('.icon'))
            })
    
          })
        })
    }

    // Get icons from skycons
    function setIcon(WeatherText, iconID){
        const skycons = new Skycons({color : "white"})
        const currentIcon = WeatherText.replace(/ /g, "_").toUpperCase()
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }
})
