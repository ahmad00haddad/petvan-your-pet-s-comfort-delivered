// Mock database for Lovable preview environment compatibility
// Replaces actual PrismaClient to prevent native binary crashes in Cloudflare/WebContainers

const generateId = () => Math.random().toString(36).substring(2, 11);

const users: any[] = [];
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
    image: "https://images.unsplash.com/photo-1552728089-57169ab0065c?w=800",
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
    description: "Playful and litter trained.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
    ownerId: "u2",
    type: "Cats",
  },
  {
    id: "a2",
    name: "Lucy",
    breed: "Mixed",
    age: "1 year",
    gender: "Female",
    description: "Very calm dog looking for a home.",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800",
    ownerId: "u3",
    type: "Dogs",
  },
  {
    id: "a3",
    name: "Rio",
    breed: "Macaw",
    age: "3 years",
    gender: "Male",
    description: "Talkative and colorful.",
    image: "https://images.unsplash.com/photo-1552728089-57169ab0065c?w=800",
    ownerId: "u1",
    type: "Birds",
  },
  {
    id: "a4",
    name: "Simba",
    breed: "British Shorthair",
    age: "6 months",
    gender: "Male",
    description: "Loves to sleep all day.",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800",
    ownerId: "u4",
    type: "Cats",
  },
  {
    id: "a5",
    name: "Daisy",
    breed: "Beagle",
    age: "2 years",
    gender: "Female",
    description: "Great with kids and very active.",
    image: "https://images.unsplash.com/photo-1537151608804-ea2f1c1fdf4d?w=800",
    ownerId: "u2",
    type: "Dogs",
  },
];
const products: any[] = [
  {
    id: "p1",
    name: "Premium Cat Food",
    price: 25.99,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800",
    targetPet: "Cats",
  },
  {
    id: "p2",
    name: "Dog Chew Toy",
    price: 12.5,
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800",
    targetPet: "Dogs",
  },
  {
    id: "p3",
    name: "Bird Seed Mix",
    price: 8.99,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1552728089-57169ab0065c?auto=format&fit=crop&q=80&w=800",
    targetPet: "Birds",
  },
  {
    id: "p4",
    name: "Fish Flakes",
    price: 5.99,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=800",
    targetPet: "Fish",
  },
  {
    id: "p5",
    name: "Catnip Mouse",
    price: 4.5,
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=800",
    targetPet: "Cats",
  },
  {
    id: "p6",
    name: "Dog Bed",
    price: 45.0,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
    targetPet: "Dogs",
  },
  {
    id: "p7",
    name: "Cat Litter 10kg",
    price: 15.0,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1629897039665-21d45929fde7?auto=format&fit=crop&q=80&w=800",
    targetPet: "Cats",
  },
  {
    id: "p8",
    name: "Dog Leash",
    price: 18.0,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800",
    targetPet: "Dogs",
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
        result = result.map((al) => {
          const u = users.find((u) => u.id === al.listerId);
          return {
            ...al,
            pet: pets.find((p) => p.id === al.petId),
            lister: u
              ? { name: u.name, email: u.email }
              : { name: "User", email: "contact@petvan.com" },
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
