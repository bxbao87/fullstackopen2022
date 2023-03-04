import CountryInfo from "./CountryInfo"
import Country from "./Country"

const Result = ({results, onShowClick}) => {
    
    if (results.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    if (results.length === 1) {
        return (
            <CountryInfo data={results[0]} />
        )
    }

    return (
        <div>
            {
                results.map(result => {
                        const cname = result.name.common
                        return <Country key={cname} name={cname} onClick={()=>{
                            onShowClick(result)
                        }} />
                    }
                )
            }
        </div>
    )
}

export default Result