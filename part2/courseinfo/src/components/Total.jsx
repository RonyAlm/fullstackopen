
function Total({ parts }) {
    const total = parts.reduce((acc, part) => acc + part.exercises, 0)
    return (
        <h3>
            Number of exercises {total}
        </h3>
    )
}

export default Total    
