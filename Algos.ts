// S = complexité spatiale 
// T = complexité temporelle 

// Recherche d’un Artiste
// L’algorithme suivant permet de retrouver un artiste dans une liste triée alphabétiquement.


interface Artist {
    id: string;
    name: string;
    genre: string;
    stage: string;
  }

function findArtistIndex(artists: any[], name: string) {
  for (let i = 0; i < artists.length; i++) {    // O(1) S   O(n) T
    if (artists[i].name === name) {     // O(1) S   O(1) T
      return artists[i].id; // O(1) S   O(1) T
    }
  }
  return -1;    // O(1) S   O(1) T
}

// Complexité temporelle : O(n)
// Complexité spatiale : O(1)

function findArtistIndexOpti(artists: any[], name: string) {
  let left = 0; // O(1) S   O(1) T
  let right = artists.length - 1;   // O(1) S   O(1) T
  while (left <= right) {   // O(1) S   O(log(n)) T
    let mid = Math.floor((left + right) / 2);   // O(1) S   O(1) T
    if (artists[mid].name === name) {   // O(1) S   O(1) T
      return artists[mid].id;       // O(1) S   O(1) T
    } else if (artists[mid].name < name) {  // O(1) S   O(1) T
      left = mid + 1;   // O(1) S   O(1) T
    } else {    // O(1) S   O(1) T
      right = mid - 1;  // O(1) S   O(1) T
    }
  }
  return -1;    // O(1) S   O(1) T
}

// Complexité temporelle : O(log(n))
// Complexité spatiale : O(1)





// Attribution des Scènes aux Artistes
// Chaque artiste doit être assigné à une scène en fonction de son genre musical. Le code suivant attribue 
// les artistes un par un en comparant chaque genre à une liste prédéfinie de scènes possibles.
// Précision : un genre de musique n'est présent que sur une scène.

  
  interface Stage {
    id: string;
    name: string;
    genres: Array<string>;
  }
  
  function assignStages(artists: any[], stages: any[]) {
    for (let stage of stages) {  // O(1) S   O(n) T
      for (let artist of artists) { // O(1) S   O(n) T
        if (stage.genres.includes(artist.genre)) {  // O(1) S   O(n) T
          artist.stage = stage.id;  // O(1) S   O(1) T
          break;    
        }
      }
    }
  }

// Complexité temporelle : O(n^2)
// Complexité spatiale : O(1)


function assignStagesOpti(artists: any[], stages: any[]) {
    let genreToStage: { [key: string]: string } = {};  // O(1) S   O(1) T
    for (let stage of stages) {  // O(1) S   O(n) T
      for (let genre of stage.genres) {  // O(1) S   O(n) T
        genreToStage[genre] = stage.id;  // O(1) S   O(1) T
      }
    }
    for (let artist of artists) {  // O(1) S   O(n) T
      artist.stage = genreToStage[artist.genre];  // O(1) S   O(1) T
    }
  }

// Complexité temporelle : O(n)
// Complexité spatiale : O(n)


// Générez la data nécessaire pour tester les algorithmes précédents

// Génération de n noms (ici 20) de scènes aléatoires
const stageNames = Array.from({ length: 20 }, (_, i) => `Stage ${i + 1}`);

const genres = [
  "Rock", "Jazz", "Pop", "Metal", "Hip-Hop", "Electro", "Classical", "Blues",
  "Reggae", "Folk", "Punk", "Techno", "Country", "Funk", "R&B", "Soul",
  "Gospel", "Ska", "House", "Latin"
];

// Associer chaque genre à une seule scène
const genreToStage: Record<string, string> = {};
const stages: Stage[] = stageNames.map((name, index) => {
  const genre = genres[index]; // Chaque scène reçoit un genre unique
  genreToStage[genre] = name;

  return {
    id: (index + 1).toString(),
    name,
    genres: [genre] // Un seul genre par scène
  };
});

// Fonction pour récupérer un élément aléatoire
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Générer n artistes (ici 20) en respectant la correspondance genre → scène
const artists: Artist[] = Array.from({ length: 20 }, (_, index) => {
  const genre = getRandomElement(Object.keys(genreToStage));
  return {
    id: (index + 1).toString(),
    name: `Artist ${index + 1}`,
    genre,
    stage: genreToStage[genre],
  };
});

console.log("Stages:", stages);
console.log("Artists:", artists);



// Test algo artistes
const start2: number = performance.now();
findArtistIndex(artists, "Artist 10"); // Test avec un artiste générique, par exemple "Artist 10"
const end2: number = performance.now();
console.log('Résultat non opti artiste:', end2 - start2);

const start1: number = performance.now();
findArtistIndexOpti(artists, "Artist 10"); // Test avec le même artiste
const end1: number = performance.now();
console.log('Résultat opti artiste :', end1 - start1);

// Test algo stages
const start3: number = performance.now();
assignStages(artists, stages); // Assignation non optimisée des scènes aux artistes
const end3: number = performance.now();
console.log('Résultat non opti stage :', end3 - start3);

const start4: number = performance.now();
assignStagesOpti(artists, stages); // Assignation optimisée des scènes aux artistes
const end4: number = performance.now();
console.log('Résultat opti stage :', end4 - start4);



// Outils de test et rapports
// Vous allez réaliser un outil qui vous permettra de comparer différentes versions d'un algorithme.

interface Test {
  name: string;
  algorithms: AlgorithmVersion[];
}

interface AlgorithmVersion {
  name: string;
  algorithm: Function;
  runs: number;
  execute: Function;
}

class TestSuite {
  tests: Test[];

  constructor() {
    this.tests = [];
  }

  addTest(test: Test) {
    this.tests.push(test);
  }

  async runTests() {
    for (const test of this.tests) {
      console.log(`Running Test: ${test.name}`);
      for (const version of test.algorithms) {
        await this.runAlgorithmTest(version);
      }
    }
  }

  private async runAlgorithmTest(version: AlgorithmVersion) {
    const durations: number[] = [];

    console.log(`  Running Algorithm Version: ${version.name}`);
    for (let i = 0; i < version.runs; i++) {
      const start = performance.now();
      await version.execute();
      const end = performance.now();
      durations.push(end - start);
    }

    const avgTime = durations.reduce((a, b) => a + b, 0) / durations.length;
    const minTime = Math.min(...durations);
    const maxTime = Math.max(...durations);

    console.log(`    Average Time: ${avgTime.toFixed(2)}ms`);
    console.log(`    Fastest Time: ${minTime.toFixed(2)}ms`);
    console.log(`    Slowest Time: ${maxTime.toFixed(2)}ms`);
  }
}

// Algorithmes pour les tests
const containsDuplicate = (array: number[]): boolean => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        return true;
      }
    }
  }
  return false;
};

const findCommonElements = (array1: number[], array2: number[]): number[] => {
  let commonElements: number[] = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        commonElements.push(array1[i]);
      }
    }
  }
  return commonElements;
};

const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// Fonction pour générer des versions d'algorithmes et les configurer
const createAlgorithmVersion = (
  name: string,
  algorithm: Function,
  runs: number,
  params: any[]
): AlgorithmVersion => {
  return {
    name,
    algorithm,
    runs,
    execute: () => algorithm(...params),
  };
};

// Exemple d'utilisation de l'outil de test
const testSuite = new TestSuite();

// Génération de l'algorithme pour `containsDuplicate`
const version1 = createAlgorithmVersion(
  'Naive Contains Duplicate',
  containsDuplicate,
  5,
  [[1, 2, 3, 4, 5, 1]] // Exemple de tableau avec doublons
);

// Génération de l'algorithme pour `findCommonElements`
const version2 = createAlgorithmVersion(
  'Naive Find Common Elements',
  findCommonElements,
  5,
  [[1, 2, 3, 4], [3, 4, 5, 6]] // Exemple de tableaux à comparer
);

// Génération de l'algorithme pour `fibonacci`
const version3 = createAlgorithmVersion(
  'Naive Fibonacci',
  fibonacci,
  5,
  [35] // Exemple de calcul de fibonacci
);

// Création du test avec plusieurs versions
const test = {
  name: 'Algorithm Performance Test',
  algorithms: [version1, version2, version3],
};

testSuite.addTest(test);

// Exécution des tests
testSuite.runTests();