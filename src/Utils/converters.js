import moment from "moment";

export const dateToString = (date) => {
    return `${new Date(date).toLocaleString('default', { month: 'long' })} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`
}

export const timeFormatter = (event,type) => {
    if(event.event.allDay) {
        if(type==="start"){
            return "12:00 AM";
        } else {
            return "11:59 PM";
        }
    } else {
        if (type === "start") {
            if (event.event.tournament) {
                const startTime = new Date(event.startTime).toISOString().slice(11, 16);
                return moment(startTime, "HH:mm").format("hh:mm A");
            } else {
                return moment(event.event.startTime, "HH:mm").format("hh:mm A");
            }
        } else {
            if (event.event.tournament) {
                const endTime = new Date(event.endTime).toISOString().slice(11, 16);
                return moment(endTime, "HH:mm").format("hh:mm A");
            } else {
                return moment(event.event.endTime, "HH:mm").format("hh:mm A");
            }
        }
    }
}