const formatDate = date => {
    const newDate = new Date(date)
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(newDate)
}

export default formatDate