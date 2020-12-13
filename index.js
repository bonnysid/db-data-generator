const fs = require('fs');
const settings = require('./settings.json');
const DB = require('./data.json');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let values;

const getRandomEmail = () => {
    let result = '';
    const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const maxPosition = words.length - 1;
    for(let i = 0; i < Math.floor ( Math.random() * 15 ); i++ ) {
        const position = Math.floor ( Math.random() * maxPosition );
        result = result + words.charAt(position);
    }
    return result +'@mail.ru';
}

const getRandomPhoneNumber = (div = '-') => {
    const randN = () => Math.floor(Math.random() * 9);
    return `8${div}9${randN()}${randN()}${div}${randN()}${randN()}${randN()}${div}${randN()}${randN()}${div}${randN()}${randN()}`;
}

const getRandomDescription = (count = 150) => {
    let result = '';
    const words = ' ,.:-0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const maxPosition = words.length - 1;
    for(let i = 0; i < Math.floor ( Math.random() * count ); i++ ) {
        const position = Math.floor ( Math.random() * maxPosition );
        result = result + words.charAt(position);
    }
    return result + '.';
}

const getRandomNum = (count) => Math.floor(Math.random() * count);

const getRandomData = (data) => data[getRandomNum(data.length - 1)];

const setSettings = async () => {
    await rl.question('Table Name: ',(ans) => {
        settings.tableName = ans;
        rl.question('Columns: ',(ans) => {
            settings.columns = `(${ans})`;
            rl.question('Count of loops: ',(ans) => {
                settings.counter = +ans;
                rl.question('Output file: ',(ans) => {
                    settings.fileName = ans;
                    rl.close();
                })
            });
        });
    });



}

const generateFilm = (film) => {
    return `(
                ${film.title}, 
                ${DB.typesOfVideos[getRandomNum(2)]}),
                ${getRandomDescription(getRandomNum(200))},
                ${getRandomNum(18)},
                ${getRandomNum(2)},
                ${getRandomData(DB.countries)},
                ${film.money ? film.money : 100000},
                ${getRandomNum(10000)},
                ${film.year},
                ${film.money ? film.money - getRandomNum(50000) : 50000},
                ${getRandomData(DB.countries)}
               ),`
}

const generateFilms = () => DB.films.reduce((result, film) => result += generateFilm(film));

const generateEmployer = () => {
    return `(
        ${getRandomData(DB.works)},
        ${getRandomData(DB.names)},
        ${getRandomData(DB.surnames)},
        ${getRandomData(DB.genders)},
        ${getRandomPhoneNumber()},
        ${getRandomEmail()},
        ${getRandomData(DB.countries)},
        ${getRandomNum(100000)},
        ${0}
    ),`
}

const generateSalesman = () => {
    return `(
        ${getRandomData(DB.companies)},
        ${getRandomNum(100000)},
        ${getRandomData(DB.names)},
        ${getRandomData(DB.surnames)},
        ${getRandomData(DB.patronymics)},
        ${getRandomEmail()},
        ${getRandomPhoneNumber()},
        ${getRandomNum(3)}
    ),`
}

const generateValues = (counter = settings.counter, callback) => {
    let res = '';
    for(let i = 0; i < counter; i++) {
        res += callback();
    }
    return res;
}

const makeFile = (settings, values) => fs.writeFile(`${__dirname}/${settings.fileName}`, `INSERT INTO ${settings.tableName} (${settings.columns}) VALUES ${values}`, err => console.log(err));

const startProgram = async () => {
    await setSettings();
    console.log(settings.tableName);
    switch (settings.tableName) {
        case 'Видео':
            makeFile(settings, generateFilms());
            break;
        case 'Работник':
            makeFile(settings, generateValues(settings.counter, generateEmployer));
            break;
        case 'Поставщик':
            makeFile(settings, generateValues(settings.counter, generateSalesman));
            break;
    }
}

startProgram();
