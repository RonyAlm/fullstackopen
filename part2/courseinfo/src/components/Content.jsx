import Part from "./Part"


function Content({ parts }) {
    console.log(parts)
    return (
        <div>
            {parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </div>
    )
}

export default Content
