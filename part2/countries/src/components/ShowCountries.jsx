const ShowOneCountry = ({array}) => {

    const country = array[0]

    return(
        <div>
          <h1>{country.name.common}</h1>
          <div>Capital {country.capital}</div>
          <div>Area {country.area}</div>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} />
        </div>
    )
}

const ShowAllCountries = ({array, buttonHandle}) => {
    return(
      <div>
        {array.map(country =>
          <div key={country.cca2}>
            {country.name.common}
            <button onClick={() => buttonHandle(country.name.common)}>Show</button>
          </div>
        )}
      </div>
    )
}

const ShowCountries = ({array , buttonHandle}) => {
  
  if (array.length <= 4){
    
    if (array.length == 1){
      return(
        <ShowOneCountry array={array}/>
      )
    }

    return(
        <ShowAllCountries array={array} buttonHandle={buttonHandle}/>
    )
  } 

  return(
    <div>
      Too many matches, specify another filter
    </div>
  )
}

export default ShowCountries