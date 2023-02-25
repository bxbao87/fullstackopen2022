const Notification = ({message, action}) => {
    if (message === null) {
        return null
    }

    if (action !== 'added' && action !== 'updated' && action !== 'deleted')
        action = 'added'

    return (
        <div className={action}>
            {message}
        </div>
    )
}

export default Notification