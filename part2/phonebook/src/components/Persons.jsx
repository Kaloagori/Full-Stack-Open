const Data = ({data, handle, label}) => {       
    return(
        <div>
            {data.name} {data.number} 
            <button onClick={handle}>{label}</button>
        </div>
    )
}

const Persons = ({person, handle, label}) => {
    return(
        <div>
            {person.map(data =>
                <Data key={data.id} data={data} handle={() => handle(data.id)} label={label}/>
            )}
        </div>
    )
}

export default Persons