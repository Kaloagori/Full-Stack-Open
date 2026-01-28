const Data = ({data}) => {
    return(
        <div>
            {data.name} {data.number}
        </div>
    )
}

const Persons = ({person}) => {
    return(
        <div>
            {person.map(data =>
                <Data key={data.id} data={data}/>
            )}
        </div>
    )
}

export default Persons