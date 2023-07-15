import {
  Collection,
  Db,
  Document,
  Filter,
  FindOptions,
  MongoClient,
  ObjectId,
  OptionalId,
} from 'mongodb'
import { config, logger } from 'server'

// TODO: refactor; 1 and 0 return types is not ok

type Collections = 'items' | 'orders'

export class Database {
  private client: MongoClient
  private db: Db
  private items: Collection<Document>

  async connect(dbName = 'tsicava', collectionName: Collections = 'items') {
    this.client = new MongoClient('mongodb+srv://' + config.mongodb.accessKey)

    await this.client.connect()

    logger.info('Succesfully connected to Database')

    this.db = this.client.db(dbName)
    this.items = this.db.collection(collectionName)
  }

  async setProducts() {
    await this.addBreakfast()
    await this.addSandwiches()
    await this.addBouls()
    await this.addSalads()
    await this.addDesserts()
    await this.addDrinks()
    await this.addCoffee()
    await this.addSoup()
  }

  async addBreakfast() {
    const type = 11
    await this.items.insertMany([
      {
        name: 'Сирники',
        desc: `Домашній сир, яйця, борошно, ванільний цукор, обсмажуються на вершковому маслі, подаються з джемом та сметаною`,
        price: 135,
        type: type,
        img: 'Cheesecakes.webp',
        extras: [
          {
            name: 'сирник',
            price: 30,
          },
        ],
      },
      {
        name: 'Туна нісуаз',
        desc: 'Свіжий тунець, запечена картопля, спаржева квасоля, половинка булочки бейгл, смажене яйце, фета, оливки, свіжі овочі, ромен, зелене масло, лимон.',
        price: 210,
        type: type,
        img: 'tuna_nisuaz.webp',
        extras: [
          {
            name: 'смажене яйце',
            price: 10,
          },
        ],
      },
      {
        name: 'Сніданок континентальний з лососем',
        desc: 'Слабосолений лосось, половинка авокадо, крем-сир, мікс оливок, огірок, помідор, мікс салату, оливкова олія, смажене яйце, булочка бейгл. В додатках може додати ще додаткове смажене яйце або замінити його на скрамбл з двох яєць.',
        price: 200,
        type: type,
        img: 'continental_breakfast_with_salmon.webp',
        extras: [
          {
            name: 'смажене яйце',
            price: 10,
          },
          {
            name: 'скрамбл з 2-x яєць',
            price: 30,
          },
          {
            name: 'лосось',
            price: 60,
          },
          {
            name: 'авокадо',
            price: 45,
          },
        ],
      },
      {
        name: 'Сніданок континентальний з прошуто',
        desc: 'Прошуто, половинка авокадо, крем-сир, мікс оливок, огірок, помідор, мікс салату, оливкова олія, смажене яйце, булочка бейгл. В додатках може додати ще додаткове смажене яйце або замінити його на скрамбл з двох яєць.',
        price: 200,
        type: type,
        img: 'continental_breakfast_with_prosciutto.webp', //нет фото
        extras: [
          {
            name: 'смажене яйце',
            price: 10,
          },
          {
            name: 'скрамбл з 2-x яєць',
            price: 30,
          },
          {
            name: 'авокадо',
            price: 45,
          },
        ],
      },
      {
        name: 'Скрамбл авокадо шрімпс',
        desc: 'Скрамбл з двох яєць, на тості з вугільного хліба, креветки на грилі, половинка авокадо,міні салат, кулька рікоти.',
        price: 200,
        type: type,
        img: 'scramble_avocado_shrimp.webp',
        extras: [
          {
            name: 'креветки',
            price: 65,
          },
          {
            name: 'авокадо',
            price: 45,
          },
          {
            name: 'яйце',
            price: 10,
          },
        ],
      },
      {
        name: "Омлет м'ясний",
        desc: "Мікс м'яса (курка, індичка, телятина), омлет з трьох яєць на вершках та вершковому маслі, зелене масло, міні салат(листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом та міксом насіння і горіхів) та два шматочки хліба на грилі",
        price: 150,
        type: type,
        img: 'meat_omelet.webp',
        extras: [
          {
            name: 'моцарела',
            price: 40,
          },
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
      {
        name: 'Омлет сирний',
        desc: 'Моцарела, бринза, кулька рікоти, дор блю, омлет з трьох яєць на вершках та вершковому маслі, зелене масло, міні салат(листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом та міксом насіння і горіхів) та два шматочки хліба на грилі',
        price: 150,
        type: type,
        img: 'cheese_omelette.webp',
        extras: [
          {
            name: 'курка',
            price: 35,
          },
          {
            name: 'індичка',
            price: 40,
          },
          {
            name: 'яловичина',
            price: 50,
          },
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
      {
        name: 'Скрамбл на тості',
        desc: 'Грінка з бездріжджового хліба, скрамб з трьох яєць з вершками, смажений на вершковому маслі, зелене масло, міні салат(листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом та міксом насіння і горіхів)',
        price: 130,
        type: type,
        img: 'scramble_on_toast.webp',
        extras: [
          {
            name: 'моцарела',
            price: 40,
          },
          {
            name: 'лосось',
            price: 60,
          },
          {
            name: 'запечені овочі',
            price: 35,
          },
          {
            name: 'курка',
            price: 35,
          },
          {
            name: 'індичка',
            price: 40,
          },
          {
            name: 'яловичина',
            price: 50,
          },
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
      {
        name: 'Тост зелений',
        desc: 'Тост з бездріжджового хліба, хумус, авокадо, огірок, боби едамаме, оливки, спаржева квасоля або броколі, мікс зелені.',
        price: 150,
        type: type,
        img: 'green_toast.webp',
        extras: [
          {
            name: 'авокадо',
            price: 45,
          },
          {
            name: 'лосось',
            price: 60,
          },
          {
            name: 'курка',
            price: 35,
          },
          {
            name: 'індичка',
            price: 40,
          },
          {
            name: 'яловичина',
            price: 50,
          },
          {
            name: 'креветки',
            price: 65,
          },
          {
            name: 'яйце смажене',
            price: 10,
          },
        ],
      },
      {
        name: 'Шакшука',
        desc: 'Томатно-овочеве рагу, подвійна яєшня, зелене масло, міні салат(листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом та міксом насіння і горіхів) та два шматочки хліба на грилі',
        price: 150,
        type: type,
        img: 'shakshuka.webp',
        extras: [
          {
            name: 'моцарела',
            price: 40,
          },
          {
            name: 'курка',
            price: 35,
          },
          {
            name: 'індичка',
            price: 40,
          },
          {
            name: 'яловичина',
            price: 50,
          },
          {
            name: 'додаткове яйце',
            price: 10,
          },
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
    ])
  }

  async addBouls() {
    const type = 10
    await this.items.insertMany([
      {
        name: 'Боул зелений',
        desc: 'Запечені та свіжі овочі, мікс бобових та зернових(булгур, сочевиця, боби маш, кіноа, чорний рис), зелене масло, лимонний дресінг, яйце смажене. Вага: 360 гр.',
        price: 160,
        type: type,
        img: 'Bowl_green.webp',
        extras: [
          {
            name: 'лосось',
            price: 60,
          },
          {
            name: 'тунець у власному соці',
            price: 30,
          },
          {
            name: 'креветки',
            price: 65,
          },
          {
            name: 'яйце варене',
            price: 10,
          },
          {
            name: 'яйце смажене',
            price: 10,
          },
          {
            name: 'авокадо',
            price: 45,
          },
        ],
      },
      {
        name: 'Боул з куркою',
        desc: 'Запечені та свіжі овочі, мікс бобових та зернових(булгур, сочевиця, боби маш, кіноа, чорний рис), зелене масло, лимонний дресінг, курка печена. Вага: 360 гр.',
        price: 170,
        type: type,
        img: 'Bowl_chicken.webp',
        extras: [
          {
            name: 'яйце варене',
            price: 10,
          },
          {
            name: 'яйце смажене',
            price: 10,
          },
        ],
      },
      {
        name: 'Боул з індиком',
        desc: 'Запечені та свіжі овочі, мікс бобових та зернових(булгур, сочевиця, боби маш, кіноа, чорний рис), зелене масло, лимонний дресінг, індичка печена. Вага: 360 гр.',
        price: 180,
        type: type,
        img: 'Bowl_turkey.webp',
        extras: [
          {
            name: 'яйце варене',
            price: 10,
          },
          {
            name: 'яйце смажене',
            price: 10,
          },
        ],
      },
      {
        name: 'Боул з яловичиною',
        desc: 'Запечені та свіжі овочі, мікс бобових та зернових(булгур, сочевиця, боби маш, кіноа, чорний рис), зелене масло, лимонний дресінг, яловичина печена. Вага: 360 гр.',
        price: 190,
        type: type,
        img: 'Bowl_beef.webp',
        extras: [
          {
            name: 'яйце варене',
            price: 10,
          },
          {
            name: 'яйце смажене',
            price: 10,
          },
        ],
      },
      {
        name: 'Хумус класичний',
        desc: 'Нутове пюре з тахінною пастою, томатно-овочеве рагу з грінками',
        price: 150,
        type: type,
        img: 'Hummus_classic.webp',
        extras: [
          {
            name: 'курка',
            price: 35,
          },
          {
            name: 'індичка',
            price: 40,
          },
          {
            name: 'телятина',
            price: 50,
          },
          {
            name: 'креветки',
            price: 65,
          },
          {
            name: 'запечені овочі',
            price: 35,
          },
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
    ])
  }

  async addSandwiches() {
    const type = 8
    await this.items.insertMany([
      {
        name: 'Сендвіч з куркою',
        desc: 'Булочка бріош, курка печена, помідор, зелене масло, соус ніжний карі, листя салату. Вага: 260 гр.',
        price: 110,
        type: type,
        img: 'chicken_sandwich.webp',
        extras: [
          {
            name: 'моцарела',
            price: 40,
          },
          {
            name: 'фета',
            price: 35,
          },
        ],
        options: [{ name: 'Булка', contains: ['бріош', 'бейгл', 'хліб вугільний пшеничний'] }],
      },
      {
        name: 'Сендвіч з індиком',
        desc: 'Булка бріош, індичка печена, грильований кабачок, зелене масло, соус ніжний карі, листя салату. Вага: 300 гр.',
        price: 120,
        type: type,
        img: 'turkey_sandwich.webp',
        extras: [
          {
            name: 'моцарела',
            price: 40,
          },
          {
            name: 'фета',
            price: 35,
          },
          {
            name: 'помідор',
            price: 15,
          },
        ],
        options: [
          {
            name: 'Булка',
            contains: ['бріош', 'бейгл', 'хліб вугільний пшеничний', 'хліб житній на заквасці'],
          },
        ],
      },
      {
        name: 'Сендвіч з моцарелою',
        desc: 'Булка бейгл, рікота, моцарела, томати, зелене масло, листя салату/шпинат. Вага: 250 гр.',
        price: 120,
        type: type,
        img: 'mozzarella_sandwich.webp',
        extras: [
          {
            name: 'курка',
            price: 35,
          },
          {
            name: 'індик',
            price: 40,
          },
          {
            name: 'телятина',
            price: 50,
          },
          {
            name: 'лосось',
            price: 60,
          },
          {
            name: 'запечені овочі',
            price: 35,
          },
        ],
        options: [{ name: 'Булка', contains: ['бейгл', 'бріош', 'хліб вугільний пшеничний'] }],
      },
      {
        name: 'Сендвіч з лососем',
        desc: 'Булка бейгл, рікота, слабосолений лосось, свіжий огірок, зелене масло, тапенад з темних маслин, листя салату/шпинат. Вага: 250 гр.',
        price: 140,
        type: type,
        img: 'salmon_sandwich.webp',
        options: [{ name: 'Булка', contains: ['бейгл', 'бріош', 'хліб вугільний пшеничний'] }],
      },
      {
        name: 'Сендвіч з тунцем',
        desc: 'Булка бейгл, тунець у власному соці, мариновий огірок, яйце варене, соус солодко-пряний, зелене масло, листя салату/шпинату. Вага: 300 гр.',
        price: 135,
        type: type,
        img: 'tuna_sandwich.webp',
        extras: [
          {
            name: 'моцарела',
            price: 40,
          },
        ],
        options: [{ name: 'Булка', contains: ['бейгл', 'бріош', 'хліб вугільний пшеничний'] }],
      },
      {
        name: 'Сендвіч з фетою',
        desc: 'Булка бейгл, рікота, фета, тапенад з темних маслин, помідори, зелене масло, листя салату. Вага: 230 гр.',
        price: 120,
        type: type,
        img: 'feta_sandwich.webp',
        extras: [
          {
            name: 'курка',
            price: 35,
          },
          {
            name: 'індик',
            price: 40,
          },
          {
            name: 'телятина',
            price: 50,
          },
          {
            name: 'лосось',
            price: 60,
          },
          {
            name: 'запечені овочі',
            price: 35,
          },
        ],
        options: [{ name: 'Булка', contains: ['бейгл', 'бріош', 'хліб вугільний пшеничний'] }],
      },
      {
        name: 'Сендвіч з яловичиною',
        desc: `Бездріжджовий вугільний хліб, яловина печена, маринований огірок, соус солодко-пряний, зелене масло, листя салату/шпинату. Вага 350 гр.`,
        price: 138,
        type: type,
        img: 'Beef_sandwich.webp',
        extras: [
          {
            name: 'моцарела',
            price: 40,
          },
          {
            name: 'фета',
            price: 35,
          },
          {
            name: 'запечені овочі',
            price: 35,
          },
        ],
        options: [{ name: 'Булка', contains: ['хліб вугільний пшеничний', 'бріош', 'бейгл'] }],
      },
    ])
  }

  async addSalads() {
    const type = 9
    await this.items.insertMany([
      {
        name: 'Салат з куркою',
        desc: 'Листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом, зеленим маслом та міксом насіння і горіхів, курка запечена. Вага: 250 гр.',
        price: 140,
        type: type,
        img: 'Chicken_salad.webp',
        extras: [
          {
            name: 'моцарела',
            price: 40,
          },
          {
            name: 'фета',
            price: 35,
          },
          {
            name: 'рікота',
            price: 35,
          },
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
      {
        name: 'Салат з яловичиною',
        desc: 'Листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом, зеленим маслом та міксом насіння і горіхів, яловичина печена. Вага: 250 гр.',
        price: 175,
        type: type,
        img: 'Beef_salad.webp',
        extras: [
          {
            name: 'моцарела',
            price: 40,
          },
          {
            name: 'фета',
            price: 35,
          },
          {
            name: 'рікота',
            price: 35,
          },
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
      {
        name: 'Салат з індичкою',
        desc: 'Листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом, зеленим маслом та міксом насіння і горіхів, індичка печена. Вага: 250 гр.',
        price: 160,
        type: type,
        img: 'Salad_turkey.webp',
        extras: [
          {
            name: 'моцарела',
            price: 40,
          },
          {
            name: 'фета',
            price: 35,
          },
          {
            name: 'рікота',
            price: 35,
          },
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
      {
        name: 'Салат з тунцем',
        desc: 'Листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом, зеленим маслом та міксом насіння і горіхів, тунець у власному соці, яйце варене. Вага: 300 гр.',
        price: 190,
        type: type,
        img: 'Tuna_salad.webp',
        extras: [
          {
            name: 'яйце варене',
            price: 10,
          },
          {
            name: 'яйце смажене',
            price: 10,
          },
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
      {
        name: 'Салат з лососем',
        desc: 'Листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом, зеленим маслом та міксом насіння і горіхів, лосось слабосолений, рікота. Вага: 270 гр.',
        price: 190,
        type: type,
        img: 'Salmon_salad.webp',
        extras: [
          {
            name: 'моцарела',
            price: 40,
          },
          {
            name: 'фета',
            price: 35,
          },
          {
            name: 'яйце варене',
            price: 10,
          },
          {
            name: 'яйце смажене',
            price: 10,
          },
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
      {
        name: 'Салат з сирами',
        desc: 'Листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом, зеленим маслом та міксом насіння і горіхів, рікота, моцарела, дор блю, бринза/фета. Вага: 270 гр.',
        price: 160,
        type: type,
        img: 'Cheese_salad.webp',
        extras: [
          {
            name: 'курка',
            price: 35,
          },
          {
            name: 'індичка',
            price: 40,
          },
          {
            name: 'яловичина',
            price: 50,
          },
          {
            name: 'лосось',
            price: 60,
          },
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
      {
        name: 'Салат авокадо шрімпс',
        desc: 'Креветки на грилі, авокадо, рікота, листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом, зеленим маслом та міксом насіння і горіхів.',
        price: 220,
        type: type,
        img: 'Shrimp_avocado_salad.webp',
        extras: [
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
      {
        name: 'Салат з прошуто',
        desc: 'Листовий мікс з сезонними овочами та фруктами, заправлений лимонним дресінгом, зеленим маслом та міксом насіння і горіхів, прошуто',
        price: 175,
        type: type,
        img: 'Prosciutto_salad.webp',
        extras: [
          {
            name: 'моцарела',
            price: 40,
          },
          {
            name: 'фета',
            price: 35,
          },
          {
            name: 'рікота',
            price: 35,
          },
          {
            name: 'авокадо',
            price: 45,
          },
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
    ])
  }

  async addDesserts() {
    const type = 5
    await this.items.insertMany([
      {
        name: 'Шоколадний мус',
        desc: 'Молочний шоколад, білий шоколад, вершки, яйця, кюлі манго-маракуя, чіа. Вага: 130 гр.',
        price: 75,
        type: type,
        img: 'Chocolate_mousse.webp',
      },
      {
        name: 'Наполеон',
        desc: 'Листкове тісто, заварний крем. Вага: 250 гр.',
        price: 68,
        type: type,
        img: 'Napoleon.webp',
      },
      {
        name: 'Тірамісу',
        desc: 'Печиво савоярді, еспресо, маскарпоне, цукор, яйце, какао. Вага: 125 гр.',
        price: 70,
        type: type,
        img: 'Tiramisu.webp',
      },
      {
        name: 'Горішки класичні',
        desc: 'Згущене молоко, масло, грецький горіх, пісочне тісто. Вага: 120 гр.',
        price: 55,
        type: type,
        img: 'classic_nuts.webp',
      },
      {
        name: 'Горішки веганські',
        desc: 'Два види фініків, журавлина, кокосові вершки, грецький горіх, тісто без яєць та цукру з маком, стевія. Вага: 120 гр.',
        price: 65,
        type: type,
        img: 'Vegan_nuts.webp',
      },
      {
        name: 'Лимонний тарт',
        desc: 'Пісочна основа, лимонний курд, меренга',
        price: 58,
        type: type,
        img: 'Lemon_tart.webp',
      },
      {
        name: 'Шоколадний тарт з солоною карамеллю',
        desc: 'Пісочна основа, солена карамель, шоколадний ганаш, горіхи',
        price: 58,
        type: type,
        img: 'Chocolate_tart_with_salted_caramel.webp',
      },
      {
        name: 'Фісташковий профітроль',
        desc: 'Заварний крем, фісташкова паста, заварне тісто.',
        price: 60,
        type: type,
        img: 'Pistachio_profiteroles.webp',
      },
      {
        name: 'Карамельний профітроль',
        desc: 'Заварний крем, солена карамель, заварне тісто.',
        price: 53,
        type: type,
        img: 'Caramel_profiteroles.webp',
      },
      {
        name: 'Ягідний пай',
        desc: 'Пісочне тісто, слива, чорна смородина, полуниця, вишня, кранч з маку, горіхів та цедри апельсину.',
        price: 55,
        type: type,
        img: 'Berry_pie.webp',
      },
      {
        name: 'Яблучний пай',
        desc: 'Пісочне тісто, яблука, коряця',
        price: 55,
        type: type,
        img: 'Apple_pie.webp',
      },
      {
        name: 'А-ля штрудель',
        desc: 'Масляне тісто, вишня, яблуко, грецький горіх, цукор, крихта.',
        price: 75,
        type: type,
        img: 'A_la_strudel.webp',
      },
      {
        name: 'Гранола',
        desc: 'Вівсяні пластівці, сушена журавлина, родзинки, фініки, курага, мед, соняшникове насіння, гарбузове насіння, кунжутна паста, соняшникова олія. Вага: 100 гр.',
        price: 55,
        type: type,
        img: 'Granola.webp',
      },
      {
        name: 'Печиво вівсяне',
        desc: 'Печиво вівсяне. Вага: 100 гр.',
        price: 50,
        type: type,
        img: 'Oatmeal_cookies.webp',
      },
      {
        name: 'Печиво шоколадне',
        desc: 'Печиво шоколадне. Вага: 100 гр.',
        price: 70,
        type: type,
        img: 'Chocolate_cookies.webp',
      },
    ])
  }

  async addDrinks() {
    const type = 6
    await this.items.insertMany([
      {
        name: 'Цитрусовий лимонад',
        desc: "Лимонний та апельсиновий фреш, імбир, цукор, вода. Об'єм 330 мл.",
        price: 35,
        type: type,
        img: 'citrus_lemonade.webp',
      },
      {
        name: 'А-ля камбуча',
        desc: "Ячмінний напій з цикорієм природної ферментації. Об'єм 330 мл.",
        price: 40,
        type: type,
        img: 'a_la_kambucha.webp',
      },
      {
        name: 'Смузі банан/полуниця',
        desc: "Банан, полуниця, ванільний цукор, готується на основі освітленого яблучного соку або молока. Об'єм 330 мл.",
        price: 80,
        type: type,
        img: 'banana_strawberry_strips.webp',
        options: [{ name: 'Основа', contains: ['яблучний сік', 'молоко'] }],
      },
      {
        name: 'Смузі буряк/чорна смородина/чорниця',
        desc: "Буряк, чорна смородина, чорниця, м'ята, готується на основі освітленого яблучного соку або води. Об'єм 330 мл.",
        price: 80,
        type: type,
        img: 'beet_black_currant_blueberry_strips.webp',
        options: [{ name: 'Основа', contains: ['яблучний сік', 'вода'] }],
      },
      {
        name: 'Смузі шпинат/ківі',
        desc: "Шпинат, ківі, огірок, чіа, м'ята, готується на основі освітленого яблучного соку або води. Об'єм 330 мл.",
        price: 80,
        type: type,
        img: 'spinach_kiwi_strips.webp',
        options: [{ name: 'Основа', contains: ['яблучний сік', 'вода'] }],
      },
      {
        name: 'Фреш',
        desc: "Об'єм 330 мл.",
        price: 100,
        type: type,
        img: 'Fresh.webp',
        options: [{ name: 'Наповнення', contains: ['апельсин', 'яблуко', 'грейпфрут', 'морква'] }],
      },
      {
        name: 'Обліпиховий чай',
        desc: "Обліпиха, цукор, аніс, апельсин. Чай відправляємо напівфабрикатом(заморожене пюре). Вам потрібно лише залити його кип'ятком",
        price: 55,
        type: type,
        img: 'Sea_buckthorn_tea.webp',
      },
      {
        name: 'Смородиновий чай',
        desc: "Смородина, цукор, розмарин. Чай відправляємо напівфабрикатом(заморожене пюре). Вам потрібно лише залити його кип'ятком",
        price: 50,
        type: type,
        img: 'Currant_tea.webp',
      },
      {
        name: 'Чай калина-малина',
        desc: "Калина, малина, цукор, яблуко. Чай відправляємо напівфабрикатом(заморожене пюре). Вам потрібно лише залити його кип'ятком",
        price: 50,
        type: type,
        img: 'Viburnum_raspberry_tea.webp',
      },
    ])
  }

  async addCoffee() {
    const type = 3
    await this.items.insertMany([
      {
        name: 'Бразилія Сантос в зернах',
        desc: '100% арабіка обсмажена під еспресо. Вага: 150 гр.',
        price: 150,
        type: type,
        img: 'Brazil_Santos_in_grains.webp',
      },
      {
        name: 'Ефіопія фільтр',
        desc: '100% арабіка обсмажена та змелена під фільтр. Вага: 150 гр.',
        price: 150,
        type: type,
        img: 'Ethiopia_filter.webp',
      },
      {
        name: 'Бразилія Сантос мелена',
        desc: '100% арабіка обсмажена під еспресо. Вага: 150 гр.',
        price: 150,
        type: type,
        img: 'Brazil_Santos_ground.webp',
      },
    ])
  }

  async addSoup() {
    const type = 4
    await this.items.insertMany([
      {
        name: 'Суп дня',
        desc: `Щодня готуємо різноманітні крем супи. В нас бувають: томатний, грибний, гарбузовий, кукурудзяний, сочевичний, квасолевий з беконом, шпинатний з зеленим горошком, цвітна капуста з болгарським перцем. Можеш просто замовити або зателефонувати в кав'ярню, щоб дізнатись чи сьогоднішній суп тобі до вподоби)<br/>Подається з двома грінками. Об'єм 350 мл.`,
        price: 75,
        type: type,
        img: 'soup.webp',
        extras: [
          {
            name: 'хліб',
            price: 0,
          },
        ],
      },
    ])
  }

  async getProducts() {
    return await this.items.find().toArray()
  }

  async close() {
    await this.client.close()
  }

  async addOne(obj: OptionalId<Document>, collection: Collections = 'items') {
    try {
      const result = await this.db.collection(collection).insertOne(obj)

      return result.insertedId
    } catch (e) {
      logger.error(e.message)
      return 1
    }
  }

  async updateOne(id: string, update: Partial<Document>, collection: Collections = 'items') {
    try {
      const itemId = new ObjectId(id)

      await this.db.collection(collection).updateOne({ _id: itemId }, { $set: update })

      return 0
    } catch (e) {
      logger.error(e.message)
      return 1
    }
  }

  async deleteOne(id: string, collection: Collections = 'items') {
    try {
      const itemId = new ObjectId(id)

      await this.db.collection(collection).deleteOne({ _id: itemId })

      return 0
    } catch (e) {
      logger.error(e.message)
      return 1
    }
  }

  deleteOld(days: number, collection: Collections) {
    return this.db
      .collection(collection)
      .createIndex({ createdAt: 1 }, { expireAfterSeconds: days * 24 * 60 * 60 })
  }

  async getOne(
    filter = {} as Filter<Document>,
    options = {} as FindOptions<Document>['projection'],
    collection: Collections = 'items',
  ) {
    try {
      const result = await this.db.collection(collection).findOne(filter, { projection: options })

      return result
    } catch (e) {
      logger.error(e.message)
      return 1
    }
  }

  async getMany(
    filter = {} as Filter<Document>,
    options = {} as FindOptions<Document>['projection'],
    collection: Collections = 'items',
  ) {
    try {
      const result = await this.db
        .collection(collection)
        .find(filter, { projection: options })
        .toArray()

      return result
    } catch (e) {
      logger.error(e.message)
      return 1
    }
  }

  async getAdmin() {
    try {
      const result = await this.db.collection('admin').findOne()

      return result
    } catch (e) {
      logger.error(e.message)
      return 1
    }
  }
}
