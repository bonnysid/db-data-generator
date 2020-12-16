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
    for(let i = 0; i < Math.floor ( Math.random() * 15 + 10); i++ ) {
        const position = Math.floor ( Math.random() * maxPosition );
        result = result + words.charAt(position);
    }
    return result +'@mail.ru';
}

const question = (str) => new Promise((resolve, reject) => rl.question(str, resolve))

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
    await question('Table Name: ').then(ans => settings.tableName = ans);
    await question('Columns: ').then(ans => {
        settings.columns = `(${ans})`;
        settings.workedColumns = ans.split(',');
    });
    for (let i = 0; i < settings.workedColumns.length; i++) {
        console.log(`Select one of this data's to ${settings.workedColumns[i]}: `);
        for(key in DB) console.log(key);
        await question(`${settings.workedColumns[i]}: `).then(ans => settings.configOfColumns[settings.workedColumns[i]] = ans);
    }
    await question('Count of loops: ').then((ans) => settings.counter = +ans);
    await question('Output file: ').then((ans) => settings.fileName = ans);
    rl.close();
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
        '${getRandomData(DB.works)}',
        '${getRandomData(DB.names)}',
        '${getRandomData(DB.surnames)}',
        '${getRandomData(DB.genders)}',
        '${getRandomPhoneNumber()}',
        '${getRandomEmail()}',
        '${getRandomData(DB.countries)}',
        ${getRandomNum(100000)},
        ${0}
    )`
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

const generateObject = (columns, values) => {
    return `(
        
    )`;
}

const generateValues = (counter = settings.counter, callback) => {
    let res = '';
    for(let i = 0; i < counter; i++) {
        if (i !== counter - 1) res += `${callback()},`;
        else res += `${callback()};`
    }
    return res;
}

const makeFile = (settings, values) => fs.writeFile(`${__dirname}/${settings.fileName}`, `INSERT INTO ${settings.tableName} ${settings.columns} VALUES ${values}`, err => console.log(err));

const startProgram = async () => {
    await setSettings();
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
