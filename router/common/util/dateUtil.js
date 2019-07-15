

// 현재 시간 Get
let getCurrentHour = () =>
{
    const today = new Date();

    return today.getHours();
}


exports.getCurrentHour = getCurrentHour;