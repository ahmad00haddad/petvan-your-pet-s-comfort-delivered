// Mock database for Lovable preview environment compatibility
// Replaces actual PrismaClient to prevent native binary crashes in Cloudflare/WebContainers

const generateId = () => Math.random().toString(36).substring(2, 11);

const products = [
  { id: "p1", name: "Reflex Plus Adult Cat Food", price: 25.0, category: "Food", description: "Premium dry food for adult cats", targetPet: "Cats", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=2688" },
  { id: "p2", name: "Whiskas Wet Food Pouches", price: 12.5, category: "Food", description: "Delicious meat selection in gravy", targetPet: "Cats", image: "" },
  { id: "p3", name: "Royal Canin Mini Adult", price: 35.0, category: "Food", description: "Specialized nutrition for small dogs", targetPet: "Dogs", image: "" },
  { id: "p4", name: "Furminator Deshedding Tool", price: 20.0, category: "Tools", description: "Professional grooming brush", targetPet: "Dogs", image: "" },
  { id: "p5", name: "Interactive Laser Pointer", price: 8.0, category: "Games", description: "Endless fun for energetic cats", targetPet: "Cats", image: "" },
  { id: "p6", name: "Premium Bird Seed Mix", price: 15.0, category: "Food", description: "Nutritious blend for all parrots", targetPet: "Birds", image: "" },
  { id: "p7", name: "Tropical Fish Flakes", price: 10.0, category: "Food", description: "Color-enhancing daily diet", targetPet: "Fish", image: "" },
];

let users: any[] = [];
let pets: any[] = [
  { 
    id: "pet1", ownerId: "u1", name: "Zazo", type: "Cats", gender: "M",
    breed: "Persian", weight: "4.5 kg", birthDate: "2022-04-12",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800",
    medicalReports: [
      { id: "mr1", date: "2023-10-01", doctor: "Dr. Haddad", diagnosis: "Routine Checkup", prescription: "None", notes: "Healthy and active." },
      { id: "mr2", date: "2024-02-15", doctor: "Dr. Haddad", diagnosis: "Mild ear infection", prescription: "Ear drops 2x daily", notes: "Follow up in 2 weeks." }
    ],
    vaccinations: [
      { id: "v1", name: "FVRCP", dateGiven: "2023-05-10", nextDueDate: "2024-05-10" },
      { id: "v2", name: "Rabies", dateGiven: "2023-05-10", nextDueDate: "2024-05-10" }
    ]
  },
  { 
    id: "pet2", ownerId: "u2", name: "Lely", type: "Dogs", gender: "F",
    breed: "Golden Retriever", weight: "28 kg", birthDate: "2021-08-05",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800",
    medicalReports: [],
    vaccinations: []
  },
  { 
    id: "pet3", ownerId: "u3", name: "Kiwi", type: "Birds", gender: "M",
    breed: "Cockatiel", weight: "0.09 kg", birthDate: "2023-11-20",
    image: "https://images.unsplash.com/photo-1552728089-57169ab0065c?auto=format&fit=crop&q=80&w=800",
    medicalReports: [],
    vaccinations: []
  },
  { 
    id: "pet4", ownerId: "u4", name: "Fully", type: "Cats", gender: "F",
    breed: "Siamese", weight: "3.8 kg", birthDate: "2020-01-30",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=800",
    medicalReports: [],
    vaccinations: []
  }
];
let orders: any[] = [];
let adoptionListings: any[] = [
  { id: "a1", petId: "pet1", listerId: "u1", status: "AVAILABLE", description: "Very playful and loves to sleep in the sun." },
  { id: "a2", petId: "pet2", listerId: "u2", status: "AVAILABLE", description: "Energetic and trained. Great with kids." },
  { id: "a3", petId: "pet3", listerId: "u3", status: "AVAILABLE", description: "Sings beautifully every morning." },
  { id: "a4", petId: "pet4", listerId: "u4", status: "AVAILABLE", description: "Calm, shy, but very affectionate once comfortable." }
];

export const prisma = {
  user: {
    findUnique: async ({ where }: any) => users.find(u => u.id === where.id || u.email === where.email) || null,
    create: async ({ data }: any) => {
      const user = { id: generateId(), ...data };
      users.push(user);
      return user;
    }
  },
  pet: {
    findUnique: async ({ where }: any) => pets.find(p => p.id === where.id) || null,
    findMany: async ({ where }: any) => {
      if (!where) return pets;
      return pets.filter(p => p.ownerId === where.ownerId);
    },
    create: async ({ data }: any) => {
      const pet = { id: generateId(), ...data };
      pets.push(pet);
      return pet;
    },
    delete: async ({ where }: any) => {
      pets = pets.filter(p => p.id !== where.id);
      return { id: where.id };
    }
  },
  product: {
    findMany: async () => products
  },
  order: {
    findUnique: async ({ where }: any) => orders.find(o => o.id === where.id) || null,
    findMany: async ({ where }: any) => {
      if (!where) return orders;
      return orders.filter(o => o.userId === where.userId);
    },
    create: async ({ data }: any) => {
      const order = { id: generateId(), ...data };
      orders.push(order);
      return order;
    }
  },
  adoptionListing: {
    findMany: async ({ where, include }: any) => {
      let result = adoptionListings.filter(al => !where || al.status === where.status);
      if (include) {
        result = result.map(al => {
          const u = users.find(u => u.id === al.listerId);
          return {
            ...al,
            pet: pets.find(p => p.id === al.petId),
            lister: u ? { name: u.name, email: u.email } : { name: "User", email: "contact@petvan.com" }
          };
        });
      }
      return result;
    },
    upsert: async ({ where, create, update }: any) => {
      let index = adoptionListings.findIndex(al => al.petId === where.petId);
      if (index >= 0) {
        adoptionListings[index] = { ...adoptionListings[index], ...update };
        return adoptionListings[index];
      } else {
        const item = { id: generateId(), ...create, status: "AVAILABLE" };
        adoptionListings.push(item);
        return item;
      }
    }
  }
};
