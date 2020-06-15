const $map = document.getElementById('map')
const map = new window.google.maps.Map($map, {
  center: {
    lat: 0,
    lng: 0,
  },
  zoom: 3
})

renderData()
async function getData() {
  const response = await fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest')
  const data = await response.json()
  return data
}

const popup = new window.google.maps.InfoWindow()

function renderExtraData({ confirmed, deaths, recovered, provincestate, countryregion }) {
  return `
  <div>
    <p> <strong>${provincestate} - ${countryregion}</strong> </p>
    <p> confirmados: ${confirmed} </p>
    <p> muertes: ${deaths} </p>
    <p> recuperados: ${recovered} </p>
  </div>
  `
}

async function renderData() {
  const data = await getData()
  console.log(data)

  data.forEach(item => {
    if (item.confirmed > 0) {
      const marker = new window.google.maps.Marker({
        position: {
          lat: item.location.lat,
          lng: item.location.lng,
        },
        map
      })
      marker.addListener('click', () => {
        popup.setContent(renderExtraData(item))
        popup.open(map, marker)
      })
    }
  })
}
