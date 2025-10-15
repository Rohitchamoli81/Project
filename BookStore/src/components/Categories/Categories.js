const categoryMapping = {
  // PROFESSIONAL CATEGORIES
    "Technology & Computing": [
    "Computers",
    "C (Computer program language)",
    "C# (Computer program language)",
    "COBOL (Computer program language)",
    "Ruby (Computer program language)",
    "Object-oriented programming",
    "Computer programs",
    "Android development",
    "SwiftUI development",
    "Google services",
    "Data mining",
    "Bilgisayar Ağ Protokolü" // Network protocols in Turkish
    ],

    "Business & Finance": [
    "Business & Economics",
    "Law",
    "Econometrics",
    "Reference"
    ],

    "Science & Academics": [
    "Science",
    "Mathematics",
    "Nature",
    "Medical",
    "Architecture",
    "Chemistry",
    "Physics",
    "Thermodynamics",
    "Microcirculation",
    "Erythema",
    "Bird watching",
    "Ants",
    "Poland",
    "Classical literature"
],

  // PERSONAL CATEGORIES
    "Arts & Literature": [
    "Fiction",
    "Biography & Autobiography",
    "Comics & Graphic Novels",
    "Literary Collections",
    "Language Arts & Disciplines",
    "Performing Arts",
    "Poetry"
    ],

    "Sports & Recreation": [
    "Sports & Recreation",
    "Cricket",
    "Football",
    "Soccer",
    "Swimming",
    "Cricket players"
],

    "Lifestyle & General": [
    "Health & Fitness",
    "Self-Help",
    "Cooking",
    "Gardening",
    "Antiques & Collectibles",
    "History",
    "Social Science",
    "Juvenile Nonfiction",
    "Apples"
    ]
};

export function determineMainCategory(apiCategory) {
  // Convert string to array if it's not already an array
  const categories = Array.isArray(apiCategory) ? apiCategory : [apiCategory];
  
  if (!categories || categories.length === 0) return "Uncategorized";
  
  for (const [mainCategory, subCategories] of Object.entries(categoryMapping)) {
    const matches = categories.some(apiCat => 
      subCategories.some(subCat => apiCat.includes(subCat))
    );
    if (matches) return mainCategory;
  }
  
  return "Uncategorized";
}

export function groupBooksByCategory(books) {
  return books.reduce((acc, book) => {
    
    const category = determineMainCategory(book.category);
    
    if (!acc[category]) acc[category] = [];
    acc[category].push(book);
    return acc;
  }, {});
}



