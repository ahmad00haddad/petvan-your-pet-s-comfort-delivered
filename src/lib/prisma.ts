// Mock database for Lovable preview environment compatibility
// Replaces actual PrismaClient to prevent native binary crashes in Cloudflare/WebContainers

const generateId = () => Math.random().toString(36).substring(2, 11);

const users: any[] = [
  { id: "u1", email: "user1@petvan.com", name: "Ahmad Haddad", password: "password" },
  { id: "u2", email: "user2@petvan.com", name: "Sarah Smith", password: "password" },
  { id: "u3", email: "user3@petvan.com", name: "Omar Ali", password: "password" },
  { id: "u4", email: "user4@petvan.com", name: "Lina Noor", password: "password" },
];
let pets: any[] = [
  {
    id: "pet1",
    ownerId: "u1",
    name: "Zazo",
    type: "Cats",
    gender: "M",
    breed: "Persian",
    weight: "4.5 kg",
    birthDate: "2022-04-12",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    medicalReports: [
      {
        id: "mr1",
        date: "2023-10-01",
        doctor: "Dr. Haddad",
        diagnosis: "Routine Checkup",
        prescription: "None",
        notes: "Healthy and active.",
      },
      {
        id: "mr2",
        date: "2024-02-15",
        doctor: "Dr. Haddad",
        diagnosis: "Mild ear infection",
        prescription: "Ear drops 2x daily",
        notes: "Follow up in 2 weeks.",
      },
    ],
    vaccinations: [{ id: "v1", name: "FVRCP", dateGiven: "2023-05-10", nextDueDate: "2024-05-10" }],
  },
  {
    id: "pet2",
    ownerId: "u2",
    name: "Lely",
    type: "Dogs",
    gender: "F",
    breed: "Golden Retriever",
    weight: "28 kg",
    birthDate: "2021-08-05",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800",
    medicalReports: [],
    vaccinations: [],
  },
  {
    id: "pet3",
    ownerId: "u3",
    name: "Kiwi",
    type: "Birds",
    gender: "M",
    breed: "Cockatiel",
    weight: "0.09 kg",
    birthDate: "2023-11-20",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
    medicalReports: [],
    vaccinations: [],
  },
  {
    id: "pet4",
    ownerId: "u4",
    name: "Fully",
    type: "Cats",
    gender: "F",
    breed: "Siamese",
    weight: "3.8 kg",
    birthDate: "2020-01-30",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800",
    medicalReports: [],
    vaccinations: [],
  },
  {
    id: "pet5",
    ownerId: "u1",
    name: "Rex",
    type: "Dogs",
    gender: "M",
    breed: "German Shepherd",
    weight: "32 kg",
    birthDate: "2019-05-10",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
    medicalReports: [],
    vaccinations: [],
  },
  {
    id: "pet6",
    ownerId: "u2",
    name: "Nemo",
    type: "Fish",
    gender: "M",
    breed: "Clownfish",
    weight: "0.01 kg",
    birthDate: "2023-01-01",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800",
    medicalReports: [],
    vaccinations: [],
  },
  {
    id: "pet7",
    ownerId: "u3",
    name: "Bella",
    type: "Cats",
    gender: "F",
    breed: "Maine Coon",
    weight: "7.2 kg",
    birthDate: "2018-09-15",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800",
    medicalReports: [],
    vaccinations: [],
  },
  {
    id: "pet8",
    ownerId: "u4",
    name: "Max",
    type: "Dogs",
    gender: "M",
    breed: "Bulldog",
    weight: "24 kg",
    birthDate: "2020-11-22",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800",
    medicalReports: [],
    vaccinations: [],
  },
  {
    id: "pet9",
    ownerId: "u1",
    name: "Luna",
    type: "Cats",
    gender: "F",
    breed: "Sphynx",
    weight: "3.1 kg",
    birthDate: "2022-07-08",
    image: "https://images.unsplash.com/photo-1614989647360-1e523f380fa0?w=800",
    medicalReports: [],
    vaccinations: [],
  },
  {
    id: "pet10",
    ownerId: "u2",
    name: "Charlie",
    type: "Dogs",
    gender: "M",
    breed: "Poodle",
    weight: "12 kg",
    birthDate: "2021-03-14",
    image: "https://images.unsplash.com/photo-1605897472359-85e4b94d685d?w=800",
    medicalReports: [],
    vaccinations: [],
  },
];
const orders: any[] = [
  { id: "ORD-1001", userId: "u1", status: "Delivered", total: 45.5, items: [], type: "SHOP" },
  {
    id: "ORD-1002",
    userId: "u1",
    status: "Scheduled",
    total: 35.0,
    type: "SERVICE",
    serviceType: "Grooming",
    date: "2024-05-15",
    time: "10:00 AM",
    petId: "pet1",
  },
];
const adoptionListings: any[] = [
  {
    id: "a1",
    name: "Mishmish",
    breed: "Shirazi",
    age: "2 months",
    gender: "Male",
    description:
      "Playful and litter trained. Mishmish is very affectionate and loves to play with yarn.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    ownerId: "u2",
    petId: "pet_mock_1",
    type: "Cats",
    status: "AVAILABLE",
  },
  {
    id: "a2",
    name: "Lucy",
    breed: "Mixed",
    age: "1 year",
    gender: "Female",
    description:
      "An incredibly emotional, heartwarming rescued puppy. Lucy is very calm, looking for a loving home with a backyard. She is great with kids and deeply moving.",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800",
    ownerId: "u3",
    petId: "pet_mock_2",
    type: "Dogs",
    status: "AVAILABLE",
  },
  {
    id: "a3",
    name: "Rio",
    breed: "Macaw",
    age: "3 years",
    gender: "Male",
    description:
      "Talkative and colorful. Rio requires a large cage and plenty of interaction. Beautiful vibrant feathers.",
    image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800",
    ownerId: "u1",
    petId: "pet_mock_3",
    type: "Birds",
    status: "AVAILABLE",
  },
  {
    id: "a4",
    name: "Simba",
    breed: "British Shorthair",
    age: "6 months",
    gender: "Male",
    description:
      "Loves to sleep all day. A truly majestic cat with a calm demeanor and perfect for apartment living.",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800",
    ownerId: "u4",
    petId: "pet_mock_4",
    type: "Cats",
    status: "AVAILABLE",
  },
  {
    id: "a5",
    name: "Daisy",
    breed: "Beagle",
    age: "2 years",
    gender: "Female",
    description:
      "Great with kids and very active. Daisy loves long walks in the park and is fully vaccinated.",
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800",
    ownerId: "u2",
    petId: "pet_mock_5",
    type: "Dogs",
    status: "AVAILABLE",
  },
  {
    id: "a6",
    name: "Oliver",
    breed: "Scottish Fold",
    age: "1.5 years",
    gender: "Male",
    description:
      "Very gentle and loves to cuddle. Oliver had a tough start but is now looking for a forever home where he can be the center of attention.",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800",
    ownerId: "u3",
    petId: "pet_mock_6",
    type: "Cats",
    status: "AVAILABLE",
  },
  {
    id: "a7",
    name: "Ruby",
    breed: "Cocker Spaniel",
    age: "3 years",
    gender: "Female",
    description:
      "Ruby is a sweet soul who loves everyone she meets. She was rescued from a shelter and needs a family who can give her lots of love.",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800",
    ownerId: "u1",
    petId: "pet_mock_7",
    type: "Dogs",
    status: "AVAILABLE",
  },
  {
    id: "a8",
    name: "Peanut",
    breed: "Guinea Pig",
    age: "6 months",
    gender: "Female",
    description:
      "Peanut is a curious little guinea pig. Very vocal when it's veggie time! Needs a spacious enclosure.",
    image: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800",
    ownerId: "u2",
    petId: "pet_mock_8",
    type: "Other",
    status: "AVAILABLE",
  },
  {
    id: "a9",
    name: "Shadow",
    breed: "Husky Mix",
    age: "2 years",
    gender: "Male",
    description:
      "High energy and extremely smart. Shadow needs an active owner who loves running or hiking. He's very loyal.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
    ownerId: "u4",
    petId: "pet_mock_9",
    type: "Dogs",
    status: "AVAILABLE",
  },
  {
    id: "a10",
    name: "Cleo",
    breed: "Sphynx",
    age: "4 years",
    gender: "Female",
    description:
      "Cleo is a sophisticated lady who enjoys warm blankets and sunbathing. She is incredibly affectionate and purrs loudly.",
    image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800",
    ownerId: "u1",
    petId: "pet_mock_10",
    type: "Cats",
    status: "AVAILABLE",
  },
  {
    id: "a11",
    name: "Coco",
    breed: "Parrot",
    age: "5 years",
    gender: "Female",
    description:
      "Coco loves to sing and whistle. She comes with her large cage and toys. Needs an experienced bird owner.",
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=800",
    ownerId: "u3",
    petId: "pet_mock_11",
    type: "Birds",
    status: "AVAILABLE",
  },
  {
    id: "a12",
    name: "Leo",
    breed: "Bengal",
    age: "1 year",
    gender: "Male",
    description:
      "Leo is like a mini leopard! Extremely active, loves to climb, and very intelligent. Needs lots of stimulation.",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800",
    ownerId: "u2",
    petId: "pet_mock_12",
    type: "Cats",
    status: "AVAILABLE",
  },
  {
    id: "a13",
    name: "Buddy",
    breed: "Labrador",
    age: "8 months",
    gender: "Male",
    description:
      "A goofy puppy who is still growing into his paws. Buddy loves water, playing fetch, and everyone he meets.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800",
    ownerId: "u1",
    petId: "pet_mock_13",
    type: "Dogs",
    status: "AVAILABLE",
  },
  {
    id: "a14",
    name: "Bubbles",
    breed: "Goldfish",
    age: "Unknown",
    gender: "Female",
    description:
      "Beautiful fantail goldfish. Needs a proper tank setup, not a bowl. Very relaxing to watch.",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800",
    ownerId: "u4",
    petId: "pet_mock_14",
    type: "Fish",
    status: "AVAILABLE",
  },
  {
    id: "a15",
    name: "Milo",
    breed: "Ragdoll",
    age: "2 years",
    gender: "Male",
    description:
      "Milo goes completely limp when you pick him up. He's a large, fluffy boy who just wants to be loved and brushed.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    ownerId: "u2",
    petId: "pet_mock_15",
    type: "Cats",
    status: "AVAILABLE",
  },
];
const products: any[] = [
  {
    id: "p1",
    name: "Royal Canin Indoor 27",
    brand: "Royal Canin",
    flavor: "Chicken & Turkey",
    ageGroup: "Adult (1-7 years)",
    description:
      "Premium dry cat food formulated for indoor cats. Reduces stool odor, supports weight management, and limits hairball formation.",
    price: 35.99,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800",
    targetPet: "Cats",
  },
  {
    id: "p2",
    name: "Whiskas Tuna Flavor 1+ Years",
    brand: "Whiskas",
    flavor: "Tuna",
    ageGroup: "Adult",
    description:
      "100% complete and balanced nutrition for your cat. Crunchy outside with a soft and meaty center.",
    price: 15.5,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800",
    targetPet: "Cats",
  },
  {
    id: "p3",
    name: "Reflex Plus Adult Dog Food",
    brand: "Reflex",
    flavor: "Lamb & Rice",
    ageGroup: "Adult",
    description:
      "Fully balanced, lamb protein-containing dry dog food carefully formulated by cat / dog nutritionists to meet the nutritional requirements of all adult dog breeds.",
    price: 45.0,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800",
    targetPet: "Dogs",
  },
  {
    id: "p4",
    name: "TetraMin Tropical Flakes",
    brand: "Tetra",
    flavor: "Fish Mix",
    ageGroup: "All Ages",
    description:
      "Nutritionally balanced diet for optimal health, color and vitality. Clean & clear water formula.",
    price: 8.99,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=800",
    targetPet: "Fish",
  },
  {
    id: "p5",
    name: "Interactive Laser Mouse Toy",
    brand: "PetVan",
    flavor: "N/A",
    ageGroup: "All Ages",
    description:
      "A sophisticated, colorful interactive pet toy. Keeps your cat engaged for hours with safe laser tracking.",
    price: 12.5,
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=800",
    targetPet: "Cats",
  },
  {
    id: "p6",
    name: "Heavy Duty Dog Leash & Harness",
    brand: "Kong",
    flavor: "N/A",
    ageGroup: "All Ages",
    description:
      "Durable, reflective leash and comfortable harness set for large dogs. Perfect for safe night walks.",
    price: 24.0,
    category: "Tools",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
    targetPet: "Dogs",
  },
  {
    id: "p7",
    name: "Premium Silica Gel Cat Litter",
    brand: "Sanicat",
    flavor: "Lavender",
    ageGroup: "All Ages",
    description:
      "Ultra absorbent silica gel cat litter with odor control and a light lavender scent. Lasts up to a month per bag.",
    price: 15.0,
    category: "Tools",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800",
    targetPet: "Cats",
  },
  {
    id: "p8",
    name: "Chewmaster Bone Toy",
    brand: "Nylabone",
    flavor: "Bacon",
    ageGroup: "Puppy/Adult",
    description:
      "Tough, durable chew toy for aggressive chewers. Helps clean teeth and control plaque and tartar.",
    price: 9.5,
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800",
    targetPet: "Dogs",
  },
  {
    id: "p9",
    name: "Orijen Original Grain-Free Dog Food",
    brand: "Orijen",
    flavor: "Chicken, Turkey & Fish",
    ageGroup: "All Life Stages",
    description:
      "Biologically appropriate dog food featuring fresh or raw free-run chicken and turkey, wild-caught fish, and cage-free eggs.",
    price: 85.0,
    category: "Food",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
    targetPet: "Dogs",
  },
  {
    id: "p10",
    name: "Frontline Plus Flea & Tick Treatment",
    brand: "Frontline",
    flavor: "N/A",
    ageGroup: "Adult Cats",
    description:
      "Fast-acting, long-lasting flea and tick protection for cats. Kills fleas, flea eggs, lice, and ticks.",
    price: 32.5,
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800",
    targetPet: "Cats",
  },
  {
    id: "p11",
    name: "Kong Classic Dog Toy",
    brand: "Kong",
    flavor: "N/A",
    ageGroup: "Adult Dogs",
    description:
      "The gold standard of dog toys. Made from ultra-durable all-natural rubber. Great for stuffing with treats.",
    price: 18.0,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800",
    targetPet: "Dogs",
  },
  {
    id: "p12",
    name: "Trixie Scratching Post",
    brand: "Trixie",
    flavor: "N/A",
    ageGroup: "All Ages",
    description:
      "Tall sisal scratching post with a plush base and a dangling toy. Protects your furniture while keeping your cat entertained.",
    price: 45.0,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800",
    targetPet: "Cats",
  },
  {
    id: "p13",
    name: "Tetra AquaSafe Water Conditioner",
    brand: "Tetra",
    flavor: "N/A",
    ageGroup: "N/A",
    description:
      "Makes tap water safe for fish instantly. Neutralizes chlorine, chloramines, and heavy metals.",
    price: 12.99,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800",
    targetPet: "Fish",
  },
  {
    id: "p14",
    name: "ZuPreem FruitBlend Bird Food",
    brand: "ZuPreem",
    flavor: "Fruit",
    ageGroup: "Adult Birds",
    description:
      "Premium daily bird food for medium birds. Contains 21 vitamins and minerals for exceptional health.",
    price: 22.5,
    category: "Food",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
    targetPet: "Birds",
  },
  {
    id: "p15",
    name: "Furminator Deshedding Tool",
    brand: "Furminator",
    flavor: "N/A",
    ageGroup: "All Ages",
    description:
      "Reduces loose hair from shedding up to 90% on regularly shed dogs. Stainless steel edge.",
    price: 38.0,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800",
    targetPet: "Dogs",
  },
  {
    id: "p16",
    name: "Applaws Chicken Breast with Rice",
    brand: "Applaws",
    flavor: "Chicken & Rice",
    ageGroup: "Adult Cats",
    description:
      "100% natural wet cat food. Made with nothing more than the ingredients listed. High protein.",
    price: 2.5,
    category: "Food",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
    targetPet: "Cats",
  },
  {
    id: "p17",
    name: "Earthbath Oatmeal & Aloe Shampoo",
    brand: "Earthbath",
    flavor: "Vanilla & Almond",
    ageGroup: "All Ages",
    description:
      "Totally natural pet shampoo. Promotes healing and relieves itching for dogs and cats with dry skin.",
    price: 16.5,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800",
    targetPet: "Dogs",
  },
  {
    id: "p18",
    name: "Catit Flower Fountain",
    brand: "Catit",
    flavor: "N/A",
    ageGroup: "All Ages",
    description:
      "3L drinking fountain with triple-action filter. Encourages your cat to drink more water.",
    price: 29.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    targetPet: "Cats",
  },
  {
    id: "p19",
    name: "Seresto Flea and Tick Collar",
    brand: "Seresto",
    flavor: "N/A",
    ageGroup: "Adult Dogs",
    description:
      "Provides 8 months of continuous flea and tick prevention for large dogs. Odorless and non-greasy.",
    price: 65.0,
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800",
    targetPet: "Dogs",
  },
  {
    id: "p20",
    name: "JW Pet Hol-ee Roller Dog Toy",
    brand: "JW Pet",
    flavor: "N/A",
    ageGroup: "All Ages",
    description:
      "Fun, versatile dog toy that can be used for fetching, tugging, and stuffing with treats. Made from tough rubber.",
    price: 11.5,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800",
    targetPet: "Dogs",
  },
  {
    id: "p21",
    name: "Hagen Vision Bird Cage",
    brand: "Hagen",
    flavor: "N/A",
    ageGroup: "All Ages",
    description:
      "Spacious, easy-to-clean bird cage. Designed to keep debris inside. Includes perches and food dishes.",
    price: 85.0,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
    targetPet: "Birds",
  },
  {
    id: "p22",
    name: "API Stress Coat Water Conditioner",
    brand: "API",
    flavor: "N/A",
    ageGroup: "N/A",
    description:
      "Makes tap water safe and protects fish with soothing aloe vera. Reduces stress by 40%.",
    price: 14.5,
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800",
    targetPet: "Fish",
  },
  {
    id: "p23",
    name: "Chuckit! Ultra Ball",
    brand: "Chuckit!",
    flavor: "N/A",
    ageGroup: "All Ages",
    description:
      "Durable, high-bounce rubber dog ball. Floats on water and is easy to clean. Perfect for fetch.",
    price: 7.99,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800",
    targetPet: "Dogs",
  },
  {
    id: "p24",
    name: "SmartyKat Skitter Critters",
    brand: "SmartyKat",
    flavor: "Catnip",
    ageGroup: "All Ages",
    description: "Pack of 3 catnip-filled mice toys. Perfectly sized to bat and carry.",
    price: 5.5,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800",
    targetPet: "Cats",
  },
  {
    id: "p25",
    name: "Merrick Grain-Free Wet Dog Food",
    brand: "Merrick",
    flavor: "Beef & Sweet Potato",
    ageGroup: "Adult",
    description:
      "Real deboned beef is the first ingredient. Grain-free nutrition for healthy skin and coat.",
    price: 34.0,
    category: "Food",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
    targetPet: "Dogs",
  },
  {
    id: "p26",
    name: "Burt's Bees Itch Soothing Spray",
    brand: "Burt's Bees",
    flavor: "Honeysuckle",
    ageGroup: "All Ages",
    description: "Natural itch soothing spray for dogs with honeysuckle. pH balanced for pets.",
    price: 11.99,
    category: "Medicine",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800",
    targetPet: "Dogs",
  },
  {
    id: "p27",
    name: "Arm & Hammer Clump & Seal",
    brand: "Arm & Hammer",
    flavor: "N/A",
    ageGroup: "All Ages",
    description: "7-day odor-free guarantee. Micro-particles seal in and destroy odors instantly.",
    price: 24.5,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800",
    targetPet: "Cats",
  },
  {
    id: "p28",
    name: "Marina LED Aquarium Kit",
    brand: "Marina",
    flavor: "N/A",
    ageGroup: "N/A",
    description:
      "10-gallon glass aquarium kit with LED lighting and a clip-on filter. Perfect for beginners.",
    price: 65.0,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800",
    targetPet: "Fish",
  },
];

export const prisma = {
  user: {
    findUnique: async ({ where }: any) =>
      users.find((u) => u.id === where.id || u.email === where.email) || null,
    create: async ({ data }: any) => {
      const user = { id: generateId(), ...data };
      users.push(user);
      return user;
    },
  },
  pet: {
    findUnique: async ({ where }: any) => pets.find((p) => p.id === where.id) || null,
    findMany: async ({ where }: any) => {
      if (!where) return pets;
      return pets.filter((p) => p.ownerId === where.ownerId);
    },
    create: async ({ data }: any) => {
      const pet = { id: generateId(), ...data };
      pets.push(pet);
      return pet;
    },
    delete: async ({ where }: any) => {
      pets = pets.filter((p) => p.id !== where.id);
      return { id: where.id };
    },
  },
  product: {
    findMany: async () => products,
  },
  order: {
    findUnique: async ({ where }: any) => orders.find((o) => o.id === where.id) || null,
    findMany: async ({ where }: any) => {
      if (!where) return orders;
      return orders.filter((o) => o.userId === where.userId);
    },
    create: async ({ data }: any) => {
      const order = { id: generateId(), ...data };
      orders.push(order);
      return order;
    },
  },
  adoptionListing: {
    findMany: async ({ where, include }: any) => {
      let result = adoptionListings.filter((al) => !where || al.status === where.status);
      if (include) {
        const singular = (t: string) =>
          t === "Cats"
            ? "Cat"
            : t === "Dogs"
              ? "Dog"
              : t === "Birds"
                ? "Bird"
                : t === "Fishes" || t === "Fish"
                  ? "Fish"
                  : t;
        result = result.map((al) => {
          const u = users.find((x) => x.id === (al.listerId ?? al.ownerId));
          const linked = pets.find((p) => p.id === al.petId);
          const pet = linked ?? {
            id: al.petId ?? al.id,
            name: al.name,
            type: singular(al.type ?? ""),
            breed: al.breed,
            gender: al.gender === "Female" ? "F" : "M",
            image: al.image,
          };
          return {
            ...al,
            pet: { ...pet, type: singular(pet.type ?? "") },
            lister: u
              ? { name: u.name, email: u.email }
              : { name: "PetVan Community", email: "contact@petvan.com" },
          };
        });
      }

      return result;
    },
    upsert: async ({ where, create, update }: any) => {
      const index = adoptionListings.findIndex((al) => al.petId === where.petId);
      if (index >= 0) {
        adoptionListings[index] = { ...adoptionListings[index], ...update };
        return adoptionListings[index];
      } else {
        const item = { id: generateId(), ...create, status: "AVAILABLE" };
        adoptionListings.push(item);
        return item;
      }
    },
  },
};
