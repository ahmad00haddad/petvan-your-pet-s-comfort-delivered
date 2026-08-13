// Mock database for Lovable preview environment compatibility
// Replaces actual PrismaClient to prevent native binary crashes in Cloudflare/WebContainers

const generateId = () => Math.random().toString(36).substring(2, 11);

const products = [
  { id: "p1", name: "Reflex Plus Adult Cat Food", price: 25.0, category: "Food", description: "Premium dry food for adult cats", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=2688" },
  { id: "p2", name: "Whiskas Wet Food Pouches", price: 12.5, category: "Food", description: "Delicious meat selection in gravy", image: "" },
  { id: "p3", name: "Royal Canin Mini Adult", price: 35.0, category: "Food", description: "Specialized nutrition for small dogs", image: "" },
  { id: "p4", name: "Furminator Deshedding Tool", price: 20.0, category: "Tools", description: "Professional grooming brush", image: "" },
  { id: "p5", name: "Interactive Laser Pointer", price: 8.0, category: "Games", description: "Endless fun for energetic cats", image: "" }
];

let users: any[] = [];
let pets: any[] = [];
let orders: any[] = [];
let adoptionListings: any[] = [];

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
    }
  },
  product: {
    findMany: async () => products
  },
  order: {
    findUnique: async ({ where }: any) => orders.find(o => o.id === where.id) || null,
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
        result = result.map(al => ({
          ...al,
          pet: pets.find(p => p.id === al.petId),
          lister: users.find(u => u.id === al.listerId) || { name: "User" }
        }));
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
