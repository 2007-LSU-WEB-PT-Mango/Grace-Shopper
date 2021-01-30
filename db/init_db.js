// code to build and initialize DB goes here
const {
  client,
  // other db methods
  getAllProducts,
  createProduct,
  getProduct,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  getOrderByID,
  getAllOrders,
  getOrdersbyUser,
} = require("./index");

async function dropTables() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS orderedproducts;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `);
  } catch (error) {
    console.error("error dropping tables");

    throw error;
  }
}

async function buildTables() {
  try {
    // "trackList" TEXT NOT NULL
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" VARCHAR(255),
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        "imageURL" TEXT DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/12in-Vinyl-LP-Record-Angle.jpg/1920px-12in-Vinyl-LP-Record-Angle.jpg',
        "inStock" BOOLEAN DEFAULT false NOT NULL,
        category VARCHAR(255) NOT NULL,
        "trackList" TEXT NOT NULL
        
      );

      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        status VARCHAR(255) DEFAULT 'cart',
        "userID" INTEGER REFERENCES users(id),
        "datePlaced" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE orderedproducts(
        id SERIAL PRIMARY KEY,
        "productID" INTEGER REFERENCES products(id),
        "orderID" INTEGER REFERENCES orders(id),
        quantity INTEGER,
        price INTEGER
      );
    `);
    await populateInitialData();
    await populateInitialUser();
  } catch (error) {
    console.error("error creating tables");
    throw error;
  }
}

async function populateInitialData() {
  try {
    let intialData = [
      {
        name: "Revolver by The Beatles",
        description: "Release Date: 08.5.1966",
        price: 19,
        imageURL:
          "https://images-na.ssl-images-amazon.com/images/I/91ffeWzPNpL._SL1500_.jpg",
        inStock: true,
        category: "Rock",
        trackList: [
                  "Taxman Eleanor Rigby", 
                  "I'm Only Sleeping", 
                  "Love You To", 
                  "Here, There and Everywhere",  
                  "Yellow Submarine", 
                  "She Said She Said", 
                  "Good Day Sunshine", 
                  "And Your Bird Can Sing For No One",
                  "Doctor Robert",
                  "I Want To Tell You", 
                  "Got To Get You Into My Life",
                  "Tomorrow Never Knows"]      
      },
      {
        name: "Abbey Road by The Beatles",
        description: "Release Date: 09.26.1969",
        price: 20,
        imageURL:
          "https://images-na.ssl-images-amazon.com/images/I/81dUVKQDBEL._SL1200_.jpg",
        inStock: true,
        category: "Rock",
        trackList:[
          "Come Together",
          "Something",
          "Maxwell's Silver Hammer",
          "Oh! Darling",
          "Octopus's Garden",
          "I Want You (She's So Heavy)",
          "Here Comes The Sun",
          "Beacause",
          "You Never Give Me Your Money",
          "Sun King. Mean Mr Mustard",
          "Polythene Pam",
          "She Came In Through The Bathroom Window",
          "Golden Slumbers",
          "Carry That Weight",
          "The End",
          "Her Majesty"
        ]
        },
      {
        name: "The Waterfall II by My Morning Jacket",
        description: "Release Date: 07.10.2020",
        price: 27,
        imageURL:
          "data:image/jpeg;base64,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",
        inStock: true,
        category: "Rock",
        trackList:[
          "Spinning My Wheels",
          "Still Thinkin",
          "Climbing The Ladder",
          "Feel You",
          "Beautiful Love (Wasn't Enough)",
          "Magic Bullet",
          "Run It",
          "Wasted",
          "Welcome Home",
          "The First Time"
        ]
        },
      {
        name: "Circles (Deluxe) by Mac Miller",
        description: "Release Date: 01.17.2020",
        price: 35,
        imageURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfqColF4inSfJAhwt1uMwLvUjLWi50wZLHuM-K0fNY_4_Mh4CrO5C3OiMl91wdD7SxMn8-sNA&usqp=CAc",
        inStock: false,
        category: "Rap",
        trackList: [
          "Circles",
          "Complicated",
          "Blue World",
          "Good News",
          "I Can See",
          "Everybody",
          "Woods",
          "Hand Me Downs",
          "That's On Me",
          "Hands",
          "Surf",
          "Once A Day"
        ]
        },
      {
        name: "Cuttin' Grass Vol. 1 by Sturgill Simpson",
        description: "Release Date: 10.16.2020",
        price: 22,
        imageURL:
          "https://media.pitchfork.com/photos/5f8da936e6fc05c7f21c73ca/1:1/w_600/cuttin%20grass%20vol%201_sturgill%20simpson.jpg",
        inStock: true,
        category: "Country",
        trackList: [
          "All Around You",
          "All the Pretty Colors",
          "Breakers Roar",
          "I Don't Mind",
          "I Wonder",
          "Just Let Go",
          "Life Ain't Fair and the World Is Mean",
          "A Little Light",
          "Life of Sin",
          "Long White Line",
          "Living the Dream",
          "Old King Coal",
          "Railroad of Sin",
          "Sitting Here Without You",
          "Sometimes Wine",
          "The Storm",
          "Time After All",
          "Turtles All the Way Down",
          "Voices",
          "Water In A Well"
        ]
      },
      {
        name: "African Giant by Burna Boy",
        description: "Release Date: 07.26.2019",
        price: 25,
        imageURL:
          "https://media.pitchfork.com/photos/5d3871460ad9a700092558ff/1:1/w_320/BurnaBoy_AfricanGiant.jpg",
        inStock: true,
        category: "Rap/Pop/R&B",
        trackList: [
          "African Giant",
          "Anybody",
          "Wetin Man Go Do",
          "Dangote",
          "Gum Body",
          "Killin Dem",
          "Omo",
          "Secret",
          "Collateral Damage",
          "Another Story",
          "Pull Up",
          "Blak Ryno (skit)",
          "Destiny",
          "Different",
          "Gbona", 
          "On the Low",
          "Show & Tell",
          "This Side",
          "Spiritual"
        ]
      },
      {
        name: "Golden Hour by Kacey Musgraves",
        description: "Release Date: 03.30.2018",
        price: 28,
        imageURL:
          "https://media.pitchfork.com/photos/5ab41f308195c0189f1354ee/1:1/w_320/Golden%20hour%20Kacey%20Musgraves.jpg",
        inStock: false,
        category: "Folk/Country",
        trackList: [
          "Slow Burn",
          "Lonely Weekend",
          "Butterflies",
          "Oh, What A World",
          "Mother", 
          "Love Is A Wild Thing",
          "Space Cowboy",
          "Happy & Sad",
          "Velvet Elvis",
          "Wonder Woman",
          "High Horse",
          "Golden Hour",
          "Rainbow",
        ]
      },
      {
        name: "House of Balloons by The Weeknd",
        description: "Release Date: 03.21.2011",
        price: 20,
        imageURL:
          "https://media.pitchfork.com/photos/5929ae575e6ef95969321c2d/1:1/w_320/59e88335.jpg",
        inStock: true,
        category: "Pop/R&B",
        trackList: [
          "High For This",
          "What You Need",
          "House of Balloons/ Glass Table Girls",
          "The Morning",
          "Wicked Games", 
          "The Party & the After Party",
          "Coming Down",
          "Loft Music",
          "The Knowing",
          "Twenty Eight",
        ]
      },
      {
        name: "Pieces of a Man by Gil Scott-Heron",
        description: "Release Date: 04.11.1971",
        price: 22,
        imageURL:
          "https://media.pitchfork.com/photos/5fcfc4d0c61c34a7841b204d/1:1/w_320/pieces%20of%20a%20man_gil%20scott-heron.jpeg",
        inStock: true,
        category: "Jazz",
        trackList: [
          "The Revolution Will Not Be Televised",
          "Save the Children",
          "Lady Day and John Coltrane",
          "Home Is Where the Hatred Is",
          "When You Are Who You Are",
          "I Think I'll Call It Morning",
          "Pieces of a Man",
          "A Sign of the Ages",
          "Or Down You Fall",
          "The Needle's Eye",
          "The Prisoner",
          "Chains",
          "Peace",
          "A Toast to the People"
        ]
      },
      {
        name: "Madvillainy by Madvillain",
        description: "Release Date: 03.23.2004",
        price: 22,
        imageURL:
          "https://media.pitchfork.com/photos/5929c458ea9e61561daa811a/1:1/w_320/0bc6101d.jpg",
        inStock: false,
        category: "Rap",
        trackList: [
          "The Illest Villains",
          "Accordion",
          "Meat Grinder",
          "Bistro",
          "Raid (Ft. M.E.D.)",
          "America's Most Blunted (Ft. Quasimoto)",
          "Sickfit",
          "Rainbows",
          "Curls",
          "Do Not Fire!",
          "Money Folder",
          "Shadows of Tomorrow (Ft. Quasimoto)",
          "Operation Lifesaver AKA Mint Test",
          "Figaro",
          "Hardcore Hustle (Ft. Wildchild)",
          "Strange Ways",
          "Fancy Clown (Ft. Viktor Vaughn)",
          "Eye (Ft. Stacy Epps)",
          "Supervillian Theme",
          "All Caps",
          "Great Day",
          "Rhinestone Cowboy",
        ]
      },
      {
        name: "Tha Carter II by Lil Wayne",
        description: "Release Date: 12.06.2005",
        price: 22,
        imageURL:
          "https://media.pitchfork.com/photos/5929bdf1ea9e61561daa77f5/1:1/w_320/00445c9a.jpg",
        inStock: true,
        category: "Rap",
        trackList: [
          "Tha Mobb",
          "Fly In",
          "Money on My Mind",
          "Fireman",
          "Mo Fire",
          "On the Block #1 (skit)",
          "Best Rapper Alive",
          "Lock and Load",
          "Oh No",
          "Grown Man",
          "On the Block #2 (skit)",
          "Hit Em Up",
          "Carter II",
          "Hustler Musik",
          "Receipt",
          "Shooter",
          "Weezy Baby",
          "On the Block #3 (skit)",
          "I'm a D-Boy",
          "Feel Me",
        ]
      },
      {
        name: "Emotionalism by The Avett Brothers",
        description: "Release Date: 05.15.2007",
        price: 22,
        imageURL:
          "https://media.pitchfork.com/photos/5929b2f8ea9e61561daa69f5/1:1/w_320/191e2bc3.jpg",
        inStock: true,
        category: "Rock",
        trackList: [
          "Die Die Die",
          "Shame",
          "Paranoia in B flat major",
          "The Weight of Lies",
          "Will You Return?",
          "The Ballad of Love and Hate",
          "Salina",
          "Pretty Girl From Chile",
          "All My Mistakes",
          "Living of Love",
          "I Would Be Sad",
          "Pretty Girl From San Diego",
          "Go to Sleep",
          "Hand-Me-Down Tune",
        ]
      },
    ];

    intialData = intialData.map((product) => createProduct(product));
    Promise.all(intialData);
  } catch (error) {
    throw error;
  }
}

async function populateInitialUser() {
  try {
    const userOne = await createUser({
      firstName: "Brandon",
      lastName: "Albright",
      email: "brandon4692@gmail.com",
      imageURL: "none",
      username: "brandonalbright92",
      password: "mypassword",
      isAdmin: true,
    });

    return [userOne];
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
  } catch (error) {
    throw error;
  }
}
rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
