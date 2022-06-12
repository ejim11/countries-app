let loadedData = [];

function countryListNow() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => loadedData.push(data))
    .catch((err) => console.log(err));

  return loadedData;
}

export default countryListNow;
