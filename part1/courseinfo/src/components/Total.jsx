
function Total({ parts }) {
    const exercises1 = parts[0].exercises
    const exercises2 = parts[1].exercises
    const exercises3 = parts[2].exercises
    return (
        <p>
            Number of exercises {exercises1 + exercises2 + exercises3}
        </p>
    )
}

export default Total    
