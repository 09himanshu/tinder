import fetch from 'node-fetch'

async function getCoordinatesForPlace(place) {
    const uri = `${global.env.link}q=${encodedPlace}&key=${global.env.api_key}`
    // const uri = `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=1496056926bf4121ae11ad97b3285e06`
    let latitude = ''
    let longtitude = ''
    try {
        let data = await fetch(uri)
        data = await data.json()
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry
          latitude = lat
          longtitude = lng
        }
        console.log(latitude, longtitude)
        return {latitude,longtitude}
    } catch (err) {
        console.log(err);
    }
}

// await getCoordinatesForPlace('India')

export {getCoordinatesForPlace}