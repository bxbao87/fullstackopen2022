import Weather from "./Weather"

const CountryInfo = ({data}) => {
    let capitals = data.capital

    return (
        <div>
            <h1>{data.name.common}</h1>
            <div>capital {capitals.join(", ")}</div>
            <div>area {data.area}</div>

            <h3>languages:</h3>
            <ul>
                {Object.entries(data.languages).map(([key, val]) => <li key={key}>{val}</li>)}
            </ul>

            <img src={data.flags.png} alt={data.flags.alt} />

            <Weather latlng={data.capitalInfo.latlng} capital={capitals[0]} />
        </div>
    )
}

export default CountryInfo