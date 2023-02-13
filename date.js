module.exports = getDate


function getDate() {
    const calendar = new Date()

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',

    }

    return calendar.toLocaleDateString("en-US", options)

}

