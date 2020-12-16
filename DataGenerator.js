const fs = require('fs');
const settings = require('./settings.json');
const DB = require('./data.json');
const readline = require('readline');

const DataGenerator = {
    _dataBase: {
        "companies": ["SaleFilms", "GetFilms", "GetVideos"],
        "genders": ["муж", "жен"],
        "typesOfVideos": ["Фильм", "Сериал", "Клип"],
        "genres": ["Боевик", "Фантастика", "Романтика", "Ужасы", "Комедия", "Детектив"],
        "names" : ["Аалона","Аамаль","Аамир","Аапели","Аапо","Ааран","Аарен","Аариф","Аарн","Аарон","Аарон","Аарон","Ааррон","Ааррон","Аасим","Аасим","Аатос","Аатто","Аату","Аашит","Аб","Аба","Аба","Абабиль","Абади","Абай","Абай","Абай","Абак","Абан","Абармид","Абарран","Абасси","Абаш","Абба","Аббабар","Аббан","Аббас","Аббас","Аббат","Абботт","Абд","Абдельджаффар","Абделькарим","Абделькерим","Абди  К","Абдул","Абдул","Абдула","Абдулазиз","Абдулазим","Абдулахад","Абдулбаки","Абдулбари","Абдулвали","Абдулварис"],
        "surnames" : ["Смирнов","Иванов","Кузнецов","Соколов","Попов","Лебедев","Козлов","Новиков","Морозов","Петров","Волков","Соловьёв","Васильев","Зайцев","Павлов","Семёнов","Голубев","Виноградов","Богданов","Воробьёв","Фёдоров","Михайлов","Беляев","Тарасов","Белов","Комаров","Орлов","Киселёв","Макаров","Андреев","Ковалёв","Ильин","Гусев","Титов","Кузьмин","Кудрявцев","Баранов","Куликов","Алексеев","Степанов","Яковлев","Сорокин","Сергеев","Романов","Захаров","Борисов","Королёв","Герасимов","Пономарёв","Григорьев","Лазарев","Медведев","Ершов","Никитин","Соболев","Рябов","Поляков","Цветков","Данилов","Жуков","Фролов","Журавлёв","Николаев","Крылов","Максимов","Сидоров","Осипов","Белоусов","Федотов","Дорофеев","Егоров","Матвеев","Бобров","Дмитриев","Калинин","Анисимов","Петухов","Антонов","Тимофеев","Никифоров","Веселов","Филиппов","Марков","Большаков","Суханов","Миронов","Ширяев","Александров","Коновалов","Шестаков","Казаков","Ефимов","Денисов","Громов","Фомин","Давыдов","Мельников","Щербаков","Блинов","Колесников"],
        "patronymics" : ["Александрович","Алексеевич","Анатольевич","Андреевич","Антонович","Аркадьевич","Артемович","Бедросович","Богданович","Борисович","Валентинович","Валерьевич","Васильевич","Викторович","Витальевич","Владимирович","Владиславович","Вольфович","Вячеславович","Геннадиевич","Георгиевич","Григорьевич","Данилович","Денисович","Дмитриевич","Евгеньевич","Егорович","Ефимович","Иванович","Иваныч","Игнатьевич","Игоревич","Ильич","Иосифович","Исаакович","Кириллович","Константинович","Леонидович","Львович","Максимович","Матвеевич","Михайлович","Николаевич","Олегович","Павлович","Палыч","Петрович","Платонович","Робертович","Романович","Саныч","Северинович","Семенович","Сергеевич","Станиславович","Степанович","Тарасович","Тимофеевич","Федорович","Феликсович","Филиппович","Эдуардович","Юрьевич","Яковлевич","Ярославович"],
        "countries" : ["Абхазия","Австралия","Австрия","Азербайджан","Албания","Алжир","Ангола","Андорра","Антигуа","Аргентина","Армения","Афганистан","Багамские","Бангладеш","Барбадос","Бахрейн","Белиз","Белоруссия","Бельгия","Бенин","Болгария","Боливия","Босния","Ботсвана","Бразилия","Бруней","Буркина","Бурунди","Бутан","Вануату","Ватикан","Великобритания","Венгрия","Венесуэла","Восточный","Вьетнам","Габон","Гаити","Гайана","Гамбия","Гана","Гватемала","Гвинея","Гвинея","Германия","Гондурас","Государство","Гренада","Греция","Грузия","Дания","Джибути","Доминика","Доминиканская","ДР","Египет","Замбия","Зимбабве","Израиль","Индия","Индонезия","Иордания","Ирак","Иран","Ирландия","Исландия","Испания","Италия","Йемен","Кабо"],
        "functions" : ["Съемка", "Грим", "Декорации"],
        "works" : ["Секретарь", "Кассир", "Бухгалтер"],
        "films" : [{"title": "Green Mile","year": 1999,"mark": 9.0,"money": 634394,"price": 119},{"title": "Shawshank Redemption","year": 1994,"mark": 9.0,"money": 740042,"price": 11},{"title": "Lord of the Rings: The Return of the King","year": 2003,"mark": 8.8,"money": 431934,"price": 11},{"title": "Interstellar","year": 2014,"mark": 8.7,"money": 634528,"price": 119},{"title": "Lord of the Rings: The Fellowship of the Ring","year": 2001,"mark": 8.7,"money": 434876,"price": 11},{"title": "Kchindler\"s List","year": 1993,"mark": 8.7,"money": 345375,"price": 119},{"title": "Forrest Gump","year": 1994,"mark": 8.7,"money": 595832,"price": 11},{"title": "Lord of the Rings: The Two Towers","year": 2002,"mark": 8.7,"money": 401172,"price": 11},{"title": "Intouchables","year": 2011,"mark": 8,"money": 211762,"price": 119},{"title": "Claus","year": "1973","mark": 8.6,"money": 346427,"price": 119},{"title": "Back to the Future","year": 1985,"mark": 8.6,"money": 440844,"price": 119},{"title": "Lion King","year": 1994,"mark": 8.6,"money": 499486,"price": 119},{"title": "Coco","year": 2017,"mark": 8.6,"money": 303140,"price": 119},{"title": "Snatch","year": 2000,"mark": 8.5,"money": 362123,"price": 299},{"title": "Gulp Fiction","year": 1994,"mark": 8.5,"money": 482877,"price": 119},{"title": "Stock and Two Smoking Barrelsock","year": 1998,"mark": 8.5,"money": 362663,"price": 119},{"title": "Inception","year": 2010,"mark": 8.5,"money": 716533,"price": 11},{"title": "Shutter Island","year": 2009,"mark": 8.5,"money": 530945,"price": 119},{"title": "Gentlemen","year": 2019,"mark": 8.5,"money": 532491,"price": 119},{"title": "Gen to Chihiro no kamikakushi","year": 2001,"mark": 8.5,"money": 321482,"price": 9},{"title": "Snockin on Heaven\"s Door","year": 1997,"mark": 8.5,"money": 432267,"price": 119},{"title": "Leon","year": 1994,"mark": 8.5,"money": 489309,"price": 119},{"title": "Night Club","year": 1999,"mark": 8.4,"money": 579004,"price": 119},{"title": "ALLE","year": 2008,"mark": 8.4,"money": 438237,"price": 119},{"title": "Prestige","year": 2006,"mark": 8.4,"money": 487905,"price": 119},{"title": "Catch Me If You Can","year": 2002,"mark": 8.4,"money": 408351,"price": 11},{"title": "12 Angry Men","year": 1956,"mark": 8.4,"money": 408351,"price": 11}]
    },
    _settings: {
        "tableName": "Worker",
        "columns": "C1, C2",
        "workedColumns": [],
        "configOfColumns": {},
        "counter": 3,
        "fileName": "data.txt"
    },
    _rl: readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    _question(str) {
        return new Promise((resolve, reject) => this._rl.question(str, resolve));
    },
    _getRandomData(data) {
        return data[this.getRandomNum(data.length - 1)];
    },

    makeFile(settings, values)  {
        fs.writeFile(`${__dirname}/${this._settings.fileName}`, `INSERT INTO ${this._settings.tableName} ${this._settings.columns} VALUES ${values}`, err => {
            if(err) console.log(err);
        });
    },

    get DB() {
        return this._dataBase;
    },

    set DB(DB) {
        this._dataBase = DB;
    },

    get Settings() {
        return this._settings;
    },

    async setSettings() {
        await this._question('Table Name: ').then(ans => this._settings.tableName = ans);
        await this._question('Columns: ').then(ans => {
            this._settings.columns = `(${ans})`;
            this._settings.workedColumns = ans.split(',');
        });
        for (let i = 0; i < this._settings.workedColumns.length; i++) {
            console.log(`Select one of this data's to ${this._settings.workedColumns[i]}: `);
            this.showData();
            this.showCommands();
            await this._question(`${this._settings.workedColumns[i]}: `).then(ans => this._settings.configOfColumns[this._settings.workedColumns[i]] = ans);
        }
        await this._question('Count of loops: ').then((ans) => this._settings.counter = +ans);
        await this._question('Output file: ').then((ans) => this._settings.fileName = ans);
        this._rl.close();
    },

    getRandomEmail() {
        let result = '';
        const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        const maxPosition = words.length - 1;
        for(let i = 0; i < Math.floor ( Math.random() * 15 + 10); i++ ) {
            const position = Math.floor ( Math.random() * maxPosition );
            result = result + words.charAt(position);
        }
        return result +'@mail.ru';
    },

    getRandomPhoneNumber(div = '-') {
        const randN = () => this.getRandomNum(9);
        return `8${div}9${randN()}${randN()}${div}${randN()}${randN()}${randN()}${div}${randN()}${randN()}${div}${randN()}${randN()}`;
    },

    getRandomDescription(count = 150) {
        let result = '';
        const words = ' ,.:-0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        const maxPosition = words.length - 1;
        for(let i = 0; i < this.getRandomNum(count); i++ ) {
            const position = this.getRandomNum(maxPosition);
            result = result + words.charAt(position);
        }
        return result + '.';
    },

    getRandomNum(count, displacement = 0) {
        return Math.floor(Math.random() * count + displacement);
    },

    generateObject(config = this._settings.configOfColumns) {
        let res = '';
        for(let value in config) {
            if(value.search(/^get/gm) !== -1) res += this[value]() + ',';
            else res += this._getRandomData(this._dataBase[value]) + ',';
        }
        res = res.substr(0, res.length - 1);
        return `(
            ${res}
        )`;
    },

    generateValues(counter = this._settings.counter, callback) {
        let res = '';
        for(let i = 0; i < counter; i++) {
            if (i !== counter - 1) res += `${callback()},`;
            else res += `${callback()};`
        }
        return res;
    },

    showData() {
        for(let key in DB) console.log(key);
    },

    showCommands() {
        for(let key in this) if (key.search(/^get/gm) !== -1 ) console.log(key);
    },

    async start() {
        await this.setSettings();
    }
}

module.exports = DataGenerator;