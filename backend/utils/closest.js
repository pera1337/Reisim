const { GoingTo, User } = require("../models/models");
const {
  getHours,
  getMinutes,
  subHours,
  getDay,
  subDays,
  setHours,
  setMinutes,
  getDaysInMonth,
  addDays,
} = require("date-fns");
const Sequelize = require("sequelize");

function closestDaily(guide) {
  const { guideId, startTime } = guide;
  const now = Date.now();
  const nowDate = new Date(now);
  const timeSplit = startTime.split(":");
  const startHour = Number(timeSplit[0]);
  const nowHours = getHours(now);
  if (nowHours > startHour && nowHours <= 23) {
    const newDate = subHours(now, nowHours - startHour);
    return newDate;
  } else {
    const newDate = subDays(now, 1);
    const beforeDate = setHours(newDate, startHour);
    return beforeDate;
  }
}

async function findClosestDaily(guide) {
  const newDate = closestDaily(guide);
  const guideId = guide.id
  const now = Date.now();
  const nowDate = new Date(now);
  return await GoingTo.findAll({
    where: {
      [Sequelize.Op.and]: [
        {
          createdAt: { [Sequelize.Op.between]: [newDate, nowDate] },
        },
        {
          guideId,
        },
      ],
    },
    include: [{ model: User, as: "User" }],
  });
}

function findNextDaily(guide) {
  const { startTime } = guide;
  const now = Date.now();
  const nowDate = new Date(now);
  const timeSplit = startTime.split(":");
  console.log("START TIME : ",startTime);
  const startHour = Number(timeSplit[0]);
  console.log("START HOUR : ",startHour);
  const startMinute = Number(timeSplit[1]);
  const nowHours = getHours(now);
  if (nowHours > startHour && nowHours <= 23) {
    const newDate = addDays(nowDate, 1);
    let nextDate = setHours(newDate, startHour);
	console.log("NETX DATE : ",nextDate);
    nextDate = setMinutes(newDate, startMinute);
    return nextDate;
  } else {
    let newDate = setHours(nowDate, startHour);
	console.log("NEW DATE : ",newDate);
    newDate = setMinutes(newDate, startMinute);
    return newDate;
  }
}

function returnDay(day) {
  switch (day) {
    case "MO":
      return 0;
    case "TU":
      return 1;
    case "WE":
      return 2;
    case "TH":
      return 3;
    case "FR":
      return 4;
    case "SA":
      return 5;
    case "SU":
      return 6;

    default:
      return 0;
  }
}

function returnDayArray(days) {
  const daysNumbers = [];
  days.map((day) => {
    daysNumbers.push(returnDay(day));
  });
  return daysNumbers;
}

function closestWeekly(guide) {
  const { startTime, guideTimes } = guide;
  const guideId = guide.id;
  const startSplit = startTime.split(":");
  const daysSplit = guideTimes.split("-");
  const daysNumbers = returnDayArray(daysSplit);
  const now = Date.now();
  const nowDate = new Date(now);
  const dayNumber = getDay(now);
  let closestDay = -1;
  for (let i = 0; i < daysNumbers.length; i++) {
    const element = daysNumbers[i];
    if (element <= dayNumber) closestDay = element;
  }
  const beforeDate = subDays(now, dayNumber - closestDay);
  const newDate = setHours(beforeDate, Number(startSplit[0]));
  return newDate;
}

async function findClosesWeekly(guide) {
  const guideId = guide.id;
  const newDate = closestWeekly(guide);
  const now = Date.now();
  const nowDate = new Date(now);
  return await GoingTo.findAll({
    where: {
      [Sequelize.Op.and]: [
        {
          createdAt: { [Sequelize.Op.between]: [newDate, nowDate] },
        },
        {
          guideId,
        },
      ],
    },
    include: [{ model: User, as: "User" }],
  });
}

function findNextWeekly(guide) {
  const { startTime, guideTimes } = guide;
  const startSplit = startTime.split(":");
  const daysSplit = guideTimes.split("-");
  const daysNumbers = returnDayArray(daysSplit);
  const now = Date.now();
  const nowDate = new Date(now);
  const dayNumber = getDay(now);
  let closestDay = -1;
  for (let i = 0; i < daysNumbers.length; i++) {
    const element = daysNumbers[i];
    if (element >= dayNumber) {
      closestDay = element;
      break;
    }
  }
  const afterDate = addDays(nowDate, closestDay - dayNumber);
  let newDate = setHours(afterDate, Number(startSplit[0]));
  newDate = setMinutes(newDate, startSplit[1]);
  return newDate;
}

function closestMonthly(guide) {
  const { startTime, guideTimes } = guide;
  const guideId = guide.id;
  const startSplit = startTime.split(":");
  const daysSplit = guideTimes.split("-");
  const now = Date.now();
  const nowDate = new Date(now);
  const nowDayInMonth = getDaysInMonth(now);
  let closestDayInMonth = -1;
  for (let i = 0; i < daysSplit.length; i++) {
    const element = Number(daysSplit[i]);
    if (element <= nowDayInMonth) closestDayInMonth = element;
  }
  const beforedate = subDays(now, nowDayInMonth - closestDayInMonth);
  const beforeWithHours = setHours(beforedate, Number(startSplit[0]));
  return beforeWithHours;
}

async function findClosestMonthly(guide) {
  const beforeWithHours = closestMonthly(guide);
  const guideId = guide.id;
  const now = Date.now();
  const nowDate = new Date(now);
  return await GoingTo.findAll({
    where: {
      [Sequelize.Op.and]: [
        {
          createdAt: { [Sequelize.Op.between]: [beforeWithHours, nowDate] },
        },
        {
          guideId,
        },
      ],
    },
    include: [{ model: User, as: "User" }],
  });
}

function findNextMonthly(guide) {
  const { startTime, guideTimes } = guide;
  const startSplit = startTime.split(":");
  console.log("START TIME : ",startTime);
  const daysSplit = guideTimes.split("-");
  const now = Date.now();
  const nowDate = new Date(now);
  const nowDayInMonth = nowDate.getDate();
  let closestDayInMonth = -1;
  for (let i = 0; i < daysSplit.length; i++) {
    const element = Number(daysSplit[i]);
    if (element >= nowDayInMonth) {
      closestDayInMonth = element;
      break;
    }
  }
  const afterDate = addDays(nowDate, closestDayInMonth - nowDayInMonth);
  let beforeWithHours = setHours(afterDate, Number(startSplit[0])+1);
  console.log("START SPLIT  ;:",startSplit[0] )
  console.log("BEFORE WITH OUTS : ",beforeWithHours);
  beforeWithHours = setMinutes(beforeWithHours, Number(startSplit[1]));
  return beforeWithHours;
}

module.exports.findClosestDaily = findClosestDaily;
module.exports.closestDaily = closestDaily;
module.exports.findNextDaily = findNextDaily;
module.exports.returnDay = returnDay;
module.exports.returnDayArray = returnDayArray;
module.exports.findNextWeekly = findNextWeekly;
module.exports.findClosestMonthly = findClosestMonthly;
module.exports.closestMonthly = closestMonthly;
module.exports.findNextMonthly = findNextMonthly;
module.exports.findClosesWeekly = findClosesWeekly;
module.exports.closestWeekly = closestWeekly;
