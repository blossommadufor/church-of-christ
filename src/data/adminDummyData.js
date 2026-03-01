// Dummy data for Admin Portal — replace with real API calls later

const SUNDAYS = [
    "Feb 22, 2026", "Feb 15, 2026", "Feb 8, 2026", "Feb 1, 2026",
    "Jan 25, 2026", "Jan 18, 2026", "Jan 11, 2026", "Jan 4, 2026",
    "Dec 29, 2025", "Dec 22, 2025", "Dec 15, 2025", "Dec 8, 2025",
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

const genAttendance = (seed) =>
    SUNDAYS.map((date, i) => ({
        date,
        status: (seed + i) % 5 === 0 ? "Absent" : "Present",
    }));

export const dummyMembers = [
    { id: 1, name: "Hart Emeribe", phone: "08031234567", email: "hart@email.com", address: "12 Nyanya Road, Abuja", dateOfBaptism: "2005-03-14", homeCongregation: "Nyanya", dateOfBirth: "1975-06-20", gender: "Male", attendance: genAttendance(1) },
    { id: 2, name: "Jacob Achobe", phone: "08067891234", email: "jacob@email.com", address: "4 Mararaba Close, Nasarawa", dateOfBaptism: "2008-07-06", homeCongregation: "Nyanya", dateOfBirth: "1972-11-03", gender: "Male", attendance: genAttendance(2) },
    { id: 3, name: "Augustine Ohaju", phone: "08122334455", email: "aug@email.com", address: "7 Karu Street, Abuja", dateOfBaptism: "2001-01-21", homeCongregation: "Nyanya", dateOfBirth: "1968-04-15", gender: "Male", attendance: genAttendance(3) },
    { id: 4, name: "Ntewo Bassey", phone: "08044556677", email: "ntewo@email.com", address: "23 Jikwoyi Ave, Abuja", dateOfBaptism: "2003-09-10", homeCongregation: "Nyanya", dateOfBirth: "1970-09-30", gender: "Male", attendance: genAttendance(0) },
    { id: 5, name: "Udoma Inyang", phone: "08055667788", email: "udoma@email.com", address: "5 Mararaba Road, Nasarawa", dateOfBaptism: "2010-02-28", homeCongregation: "Nyanya", dateOfBirth: "1980-02-12", gender: "Male", attendance: genAttendance(4) },
    { id: 6, name: "Efiong Anwana", phone: "08066778899", email: "efiong@email.com", address: "9 New Nyanya, Abuja", dateOfBaptism: "2012-05-17", homeCongregation: "Nyanya", dateOfBirth: "1988-07-22", gender: "Male", attendance: genAttendance(1) },
    { id: 7, name: "Felix Ajunwa", phone: "07033445566", email: "felix@email.com", address: "14 Kugbo Lane, Abuja", dateOfBaptism: "2015-08-03", homeCongregation: "Nyanya", dateOfBirth: "1992-03-08", gender: "Male", attendance: genAttendance(2) },
    { id: 8, name: "George Attah", phone: "07044556677", email: "george@email.com", address: "2 Pipeline Road, Abuja", dateOfBaptism: "2009-11-25", homeCongregation: "Mararaba", dateOfBirth: "1985-12-01", gender: "Male", attendance: genAttendance(3) },
    { id: 9, name: "Emana Bassey", phone: "07055667788", email: "emana@email.com", address: "31 Nyanya Expressway", dateOfBaptism: "2018-03-11", homeCongregation: "Nyanya", dateOfBirth: "1995-08-17", gender: "Male", attendance: genAttendance(0) },
    { id: 10, name: "Donald Esiet", phone: "07066778899", email: "donald@email.com", address: "8 Dei-Dei Road, Abuja", dateOfBaptism: "2016-06-19", homeCongregation: "Karu", dateOfBirth: "1990-05-25", gender: "Male", attendance: genAttendance(4) },
    { id: 11, name: "Grace Okonkwo", phone: "08077889900", email: "grace@email.com", address: "17 New Karu, Nasarawa", dateOfBaptism: "2007-04-02", homeCongregation: "Nyanya", dateOfBirth: "1983-10-14", gender: "Female", attendance: genAttendance(1) },
    { id: 12, name: "Blessing Etuk", phone: "08088990011", email: "blessing@email.com", address: "6 Jikwoyi Close, Abuja", dateOfBaptism: "2020-01-12", homeCongregation: "Nyanya", dateOfBirth: "1998-01-30", gender: "Female", attendance: genAttendance(2) },
    { id: 13, name: "Patience Udoh", phone: "08099001122", email: "patience@email.com", address: "22 Mararaba, Nasarawa", dateOfBaptism: "2013-07-07", homeCongregation: "Mararaba", dateOfBirth: "1987-06-06", gender: "Female", attendance: genAttendance(3) },
    { id: 14, name: "Rejoice Akpan", phone: "07011223344", email: "rejoice@email.com", address: "11 Pipeline Road, Abuja", dateOfBaptism: "2019-09-22", homeCongregation: "Karu", dateOfBirth: "1997-03-19", gender: "Female", attendance: genAttendance(0) },
    { id: 15, name: "Amaka Nwosu", phone: "07022334455", email: "amaka@email.com", address: "3 Nyanya Main St, Abuja", dateOfBaptism: "2011-12-04", homeCongregation: "Nyanya", dateOfBirth: "1986-11-11", gender: "Female", attendance: genAttendance(4) },
];

export const adminStats = {
    totalMembers: dummyMembers.length,
    totalAttendances: dummyMembers.reduce((acc, m) => acc + m.attendance.filter(a => a.status === "Present").length, 0),
    thisSunday: dummyMembers.filter(m => m.attendance[0]?.status === "Present").length,
};

export const CSV_TEMPLATE_HEADERS = "name,phone,email,address,date_of_baptism,home_congregation,date_of_birth,gender";
