
/* Current Booking Data */
const bookings = [
    {
        "id": 1,
        "roomId": "A101",
        "startTime": "2019-09-28 13:00:00",
        "endTime": "2019-09-28 14:00:00",
        "title": "Lunch with Petr"
    },
    {
        "id": 2,
        "roomId": "A101",
        "startTime": "2019-09-28 14:00:00",
        "endTime": "2019-09-28 15:00:00",
        "title": "Sales Weekly Meeting"
    },
    {
        "id": 3,
        "roomId": "A101",
        "startTime": "2019-09-28 16:00:00",
        "endTime": "2019-09-28 18:00:00",
        "title": "Anastasia Website Warroom"
    },
    {
        "id": 4,
        "roomId": "A101",
        "startTime": "2019-09-29 13:00:00",
        "endTime": "2019-09-29 14:00:00",
        "title": "One-on-One Session"
    },
    {
        "id": 5,
        "roomId": "A101",
        "startTime": "2019-09-29 16:00:00",
        "endTime": "2019-09-29 18:00:00",
        "title": "UGC Sprint Planning"
    },
    {
        "id": 6,
        "roomId": "A102",
        "startTime": "2019-09-30 09:00:00",
        "endTime": "2019-10-04 18:00:00",
        "title": "5-Day Design Sprint Workshop"
    },
    {
        "id": 7,
        "roomId": "Auditorium",
        "startTime": "2019-09-19 09:00:00",
        "endTime": "2019-09-23 19:00:00",
        "title": "Thai Tech Innovation 2019"
    },
    {
        "id": 8,
        "roomId": "A101",
        "startTime": "2019-09-28 10:00:00",
        "endTime": "2019-09-28 13:00:00",
        "title": "Raimonland project"
    },
    {
        "id": 9,
        "roomId": "A102",
        "startTime": "2019-09-30 18:00:00",
        "endTime": "2019-09-30 20:00:00",
        "title": "Management Meetinng"
    },
    {
        "id": 10,
        "roomId": "A101",
        "startTime": "2019-10-04 14:00:00",
        "endTime": "2019-10-06 11:00:00",
        "title": "3-day workshop Corgi costume"
    }
];

const checkAvailability = (roomId, startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const bookingsByRoomId = bookings.filter(booking => booking.roomId === roomId);

    for (const booking of bookingsByRoomId) {
        const bookingStart = new Date(booking.startTime);
        const bookingEnd = new Date(booking.endTime);

        if (start < bookingEnd && end > bookingStart) {
            return false;
        }
    }
    return true;
}

console.log(checkAvailability(
        "A101",
        "2019-09-28 04:00:00",
        "2019-09-28 05:00:00"
    )
);

const getBookingsForToDay = (roomId) => {
    const toDay = new Date("2019-09-28").toISOString().split('T')[0]
    const bookingsByRoomId = bookings.filter(booking => booking.roomId === roomId);
    const bookingsForDate = bookingsByRoomId.filter(booking => {
        const bookingStartDate = new Date(booking.startTime).toISOString().split('T')[0];
        return toDay === bookingStartDate;
    })
    return bookingsForDate.length > 0 ? bookingsForDate : null;
}
console.log(getBookingsForToDay("A101"));

const getBookingsForWeek = (roomId, weekNo) => {
    const toDay = new Date("2019-09-23")
    let startDate = new Date(toDay)
    let endDate = new Date(startDate)
    if (weekNo === "thisweek") {
        endDate.setDate(startDate.getDate() + 7)
    } else if (weekNo === 'nextweek') {
        startDate.setDate(startDate.getDate() + 7)
        endDate.setDate(startDate.getDate() + 7)
    } else if (weekNo === 'wholemonth') {
        startDate = new Date(toDay.getFullYear(), toDay.getMonth(), 1);
        endDate = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 1);
    }
    const bookingsByRoomId = bookings.filter(booking => booking.roomId === roomId)
    const bookingsForWeek = bookingsByRoomId.filter(booking => {
        const bookingStartDate = new Date(booking.startTime)
        const bookingEndDate = new Date(booking.endTime)
        return bookingStartDate >= startDate && bookingEndDate <= endDate
    })
    return bookingsForWeek.sort((bookingA, bookingB) => new Date(bookingA.startTime) - new Date(bookingB.startTime))
}


console.log("thisweek",getBookingsForWeek("A101", "thisweek"))
console.log("nextweek",getBookingsForWeek("A101", "nextweek"))
console.log("wholemonth",getBookingsForWeek("A101", "wholemonth"))




