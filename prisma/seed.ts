import { prisma } from '../src/lib/prisma'

async function main() {
  const products = [
    {
      name: "Reflex Plus Adult Cat Food",
      description: "Premium adult cat food with salmon.",
      price: 19.99,
      category: "Food",
      stock: 50,
      brand: "Reflex",
      targetPet: "Cats",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=200",
    },
    {
      name: "Whiskas Tasty Mix",
      description: "Delicious wet food for cats.",
      price: 4.99,
      category: "Food",
      stock: 100,
      brand: "Whiskas",
      targetPet: "Cats",
      image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=200",
    },
    {
      name: "Royal Canin Mini Adult",
      description: "Nutritious dry food for small dogs.",
      price: 24.99,
      category: "Food",
      stock: 30,
      brand: "Royal Canin",
      targetPet: "Dogs",
      image: "https://images.unsplash.com/photo-1584022880193-4a6c8b939fde?auto=format&fit=crop&q=80&w=200",
    },
    {
      name: "Grooming Brush",
      description: "Soft grooming brush for all pets.",
      price: 7.99,
      category: "Tools",
      stock: 200,
      brand: "PetCare",
      targetPet: "All",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=200",
    },
    {
      name: "Feather Wand Toy",
      description: "Interactive feather wand for cats.",
      price: 6.50,
      category: "Games",
      stock: 150,
      brand: "PlayPet",
      targetPet: "Cats",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=200",
    },
    {
      name: "Chew Bone",
      description: "Durable chew bone for dogs.",
      price: 14.99,
      category: "Games",
      stock: 80,
      brand: "DogJoy",
      targetPet: "Dogs",
      image: "https://images.unsplash.com/photo-1605332616223-9599525c56c7?auto=format&fit=crop&q=80&w=200",
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Seeded products!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
