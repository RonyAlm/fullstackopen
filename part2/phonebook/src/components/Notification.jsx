import '../index.css';


function Notification({ message }) {
    if (message.type === '' || message.text === '') {
        return null
    }

    return (
        <div className={message.type === 'error' ? 'error' : 'success'}>
            {message.text}
        </div>
    )
}

export default Notification