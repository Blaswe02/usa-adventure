import { LocationData } from './types';

export const LOCATIONS: LocationData[] = [
  {
    id: 'liberty',
    name: 'Statue of Liberty',
    shortDescription: 'A torch. A gift. A new life.',
    introImage: '/Liberty.jpg',
    readingText: [
      "The Statue of Liberty is in New York Harbor.",
      "It is a giant green statue of a woman.",
      "She holds a torch high in her right hand.",
      "The torch is a symbol of freedom and light.",
      "France gave the statue to the United States in 1886.",
      "It was a gift of friendship between the two countries.",
      "Millions of immigrants saw the statue when they arrived in America.",
      "For many people, the statue meant hope and a new life.",
      "There are 354 steps inside the statue to reach the top.",
      "The date 1776 is written on a tablet in her left hand.",
      "The statue stands on a small island in the water.",
      "Some say the spirit of liberty still welcomes all who arrive by sea."
    ],
    mysterySentence: "Some say the spirit of liberty still welcomes all who arrive by sea.",
    symbol: 'Flame',
    symbolMeaning: 'Liberty & Light',
    questions: [
      {
        id: 1,
        text: "Where is the Statue of Liberty?",
        options: ["In Paris", "In New York Harbor", "In Washington D.C."],
        correctIndex: 1,
        hint: "Read the first sentence."
      },
      {
        id: 2,
        text: "What does she hold in her right hand?",
        options: ["A sword", "A book", "A torch"],
        correctIndex: 2,
        hint: "It is a symbol of freedom and light."
      },
      {
        id: 3,
        text: "Who gave the statue to the United States?",
        options: ["England", "France", "Spain"],
        correctIndex: 1,
        hint: "Look for a country name in the text."
      },
      {
        id: 4,
        text: "What date is written on the tablet in her hand?",
        options: ["1886", "1776", "1492"],
        correctIndex: 1,
        hint: "It is the year of the Declaration of Independence."
      },
      {
        id: 5,
        text: "How many steps are inside the statue?",
        options: ["100 steps", "245 steps", "354 steps"],
        correctIndex: 2,
        hint: "Look for the number of steps in the text."
      }
    ],
    sentenceBuilderTasks: [
      {
        id: 1,
        blocks: ["France", "gave", "the statue", "to", "the United States"]
      },
      {
        id: 2,
        blocks: ["The torch", "is", "a symbol", "of", "freedom"]
      }
    ],
    missingWordsTasks: [
      {
        id: 1,
        sentenceParts: ["The Statue of Liberty is in New York", "."],
        options: ["Harbor", "Park", "City"],
        correctOption: "Harbor"
      },
      {
        id: 2,
        sentenceParts: ["France gave the statue as a gift of", "."],
        options: ["friendship", "war", "money"],
        correctOption: "friendship"
      },
      {
        id: 3,
        sentenceParts: ["She holds a", "high in her right hand."],
        options: ["torch", "sword", "flag"],
        correctOption: "torch"
      }
    ]
  },
  {
    id: 'rushmore',
    name: 'Mount Rushmore',
    shortDescription: 'Four presidents. Sacred hills. Old spirits.',
    introImage: '/mountrushmore.jpg',
    readingText: [
      "Mount Rushmore is in the Black Hills of South Dakota.",
      "Four famous presidents are carved into the rock.",
      "The four presidents are Washington, Jefferson, Roosevelt, and Lincoln.",
      "The carvings are about 18 meters tall.",
      "Workers started building Mount Rushmore in 1927.",
      "It took 14 years to finish the project.",
      "The Black Hills are also sacred land for the Lakota people.",
      "The Lakota are an indigenous group who have lived there for centuries.",
      "The Lakota name for the mountain is Six Grandfathers.",
      "Many Native Americans say the carvings should not be there.",
      "Every year, millions of tourists visit this mountain.",
      "Some Lakota people say the spirits of their ancestors still watch over these hills."
    ],
    mysterySentence: "Some Lakota people say the spirits of their ancestors still watch over these hills.",
    symbol: 'Star',
    symbolMeaning: 'History & Pride',
    questions: [
      {
        id: 1,
        text: "Where is Mount Rushmore?",
        options: ["In the Rocky Mountains", "In the Black Hills of South Dakota", "In Washington D.C."],
        correctIndex: 1,
        hint: "Look for the name of the hills."
      },
      {
        id: 2,
        text: "How many presidents are carved into the rock?",
        options: ["Two", "Three", "Four"],
        correctIndex: 2,
        hint: "Count the names mentioned in the text."
      },
      {
        id: 3,
        text: "When did construction start?",
        options: ["In 1776", "In 1927", "In 1865"],
        correctIndex: 1,
        hint: "Look for a year in the text."
      },
      {
        id: 4,
        text: "What is the Lakota name for the mountain?",
        options: ["Black Mountain", "Six Grandfathers", "Four Faces"],
        correctIndex: 1,
        hint: "Look for the Lakota name in the text."
      },
      {
        id: 5,
        text: "How long did it take to finish the project?",
        options: ["4 years", "14 years", "40 years"],
        correctIndex: 1,
        hint: "Look for the number of years in the text."
      }
    ],
    sentenceBuilderTasks: [
      {
        id: 1,
        blocks: ["Four", "famous", "presidents", "are carved", "into the rock"]
      },
      {
        id: 2,
        blocks: ["The Black Hills", "are", "sacred land", "for", "the Lakota people"]
      }
    ],
    missingWordsTasks: [
      {
        id: 1,
        sentenceParts: ["Mount Rushmore is in the Black Hills of South", "."],
        options: ["Dakota", "Carolina", "Africa"],
        correctOption: "Dakota"
      },
      {
        id: 2,
        sentenceParts: ["The carvings are about 18", "tall."],
        options: ["meters", "miles", "inches"],
        correctOption: "meters"
      },
      {
        id: 3,
        sentenceParts: ["It took 14 years to", "the project."],
        options: ["finish", "start", "sell"],
        correctOption: "finish"
      }
    ]
  },
  {
    id: 'goldengate',
    name: 'Golden Gate Bridge',
    shortDescription: 'Orange and tall. Fog. Island of secrets.',
    introImage: '/Goldengatebridge.jpg',
    readingText: [
      "The Golden Gate Bridge is in San Francisco, California.",
      "It is one of the most famous bridges in the world.",
      "The bridge is painted a special orange-red color.",
      "It opened in 1937 after four years of construction.",
      "The bridge connects San Francisco to the county of Marin.",
      "On foggy days, the top of the bridge disappears into the clouds.",
      "Just next to the bridge is a famous island called Alcatraz.",
      "Alcatraz was once a very tough prison for dangerous criminals.",
      "The cold water and strong currents made swimming away nearly impossible.",
      "Famous criminals were kept there because it was so hard to escape.",
      "The prison closed in 1963 and is now a museum.",
      "Nobody knows if anyone ever truly escaped from Alcatraz alive."
    ],
    mysterySentence: "Nobody knows if anyone ever truly escaped from Alcatraz alive.",
    symbol: 'Anchor',
    symbolMeaning: 'Mystery & Gateway',
    questions: [
      {
        id: 1,
        text: "Where is the Golden Gate Bridge?",
        options: ["In New York", "In San Francisco, California", "In Miami, Florida"],
        correctIndex: 1,
        hint: "Read the first sentence."
      },
      {
        id: 2,
        text: "What color is the bridge painted?",
        options: ["Blue and white", "Orange-red", "Golden yellow"],
        correctIndex: 1,
        hint: "It is a special color mentioned in the text."
      },
      {
        id: 3,
        text: "When did the bridge open?",
        options: ["In 1927", "In 1776", "In 1937"],
        correctIndex: 2,
        hint: "Look for the year in the text."
      },
      {
        id: 4,
        text: "What was Alcatraz?",
        options: ["A museum", "A tough prison", "A bridge"],
        correctIndex: 1,
        hint: "Dangerous criminals were kept there."
      },
      {
        id: 5,
        text: "When did the Alcatraz prison close?",
        options: ["In 1937", "In 1963", "In 1900"],
        correctIndex: 1,
        hint: "Look for the year the prison closed."
      }
    ],
    sentenceBuilderTasks: [
      {
        id: 1,
        blocks: ["The bridge", "connects", "San Francisco", "to", "Marin"]
      },
      {
        id: 2,
        blocks: ["On foggy days", "the top", "of the bridge", "disappears", "into the clouds"]
      }
    ],
    missingWordsTasks: [
      {
        id: 1,
        sentenceParts: ["The Golden Gate Bridge is in San", ", California."],
        options: ["Francisco", "Diego", "Jose"],
        correctOption: "Francisco"
      },
      {
        id: 2,
        sentenceParts: ["Alcatraz was once a very tough", "for dangerous criminals."],
        options: ["prison", "school", "hotel"],
        correctOption: "prison"
      },
      {
        id: 3,
        sentenceParts: ["The prison closed in 1963 and is now a", "."],
        options: ["museum", "house", "park"],
        correctOption: "museum"
      }
    ]
  },
  {
    id: 'whitehouse',
    name: 'The White House',
    shortDescription: 'Capital city. Oval Office. Past presidents.',
    introImage: '/thewhitehouse.jpg',
    readingText: [
      "The White House is in Washington D.C., the capital of the USA.",
      "It is the official home of the President of the United States.",
      "Every president since John Adams in 1800 has lived there.",
      "The building has 132 rooms and 35 bathrooms.",
      "The White House has its own bowling alley and swimming pool.",
      "The president works in a special room called the Oval Office.",
      "The Oval Office has no corners because its walls are curved.",
      "In 2008, Barack Obama became the first Black president.",
      "He lived in the White House with his family for eight years.",
      "Many important decisions about the world are made in the Oval Office.",
      "Guards and workers say strange things happen at night.",
      "Some people believe that the ghosts of past presidents still walk the hallways."
    ],
    mysterySentence: "Some people believe that the ghosts of past presidents still walk the hallways.",
    symbol: 'Shield',
    symbolMeaning: 'Power & Democracy',
    questions: [
      {
        id: 1,
        text: "Where is the White House?",
        options: ["In New York", "In Los Angeles", "In Washington D.C."],
        correctIndex: 2,
        hint: "It is in the capital of the USA."
      },
      {
        id: 2,
        text: "How many rooms does the White House have?",
        options: ["32 rooms", "132 rooms", "232 rooms"],
        correctIndex: 1,
        hint: "Look for the number in the text."
      },
      {
        id: 3,
        text: "What is the president's special office called?",
        options: ["The Round Room", "The Oval Office", "The Blue Room"],
        correctIndex: 1,
        hint: "Look for the word 'office' in the text."
      },
      {
        id: 4,
        text: "Who became the first Black president?",
        options: ["Martin Luther King", "Barack Obama", "Abraham Lincoln"],
        correctIndex: 1,
        hint: "He was elected in 2008."
      },
      {
        id: 5,
        text: "Why does the Oval Office have no corners?",
        options: ["It is very small", "Its walls are curved", "It was not finished"],
        correctIndex: 1,
        hint: "Look at the shape of the room in the text."
      }
    ],
    sentenceBuilderTasks: [
      {
        id: 1,
        blocks: ["The White House", "is", "the official home", "of", "the President"]
      },
      {
        id: 2,
        blocks: ["Barack Obama", "became", "the first", "Black president", "in 2008"]
      }
    ],
    missingWordsTasks: [
      {
        id: 1,
        sentenceParts: ["The White House is in Washington D.C., the", "of the USA."],
        options: ["capital", "center", "museum"],
        correctOption: "capital"
      },
      {
        id: 2,
        sentenceParts: ["The president works in a room called the Oval", "."],
        options: ["Office", "Room", "House"],
        correctOption: "Office"
      },
      {
        id: 3,
        sentenceParts: ["The building has 132 rooms and 35", "."],
        options: ["bathrooms", "windows", "doors"],
        correctOption: "bathrooms"
      }
    ]
  }
];
