import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdoptionsFn } from "../../server/adopt";
import { ArrowLeft, Heart, Cat, Dog, Bird, Fish } from "lucide-react";

export const Route = createFileRoute("/adopt/")({
  component: Adopt,
});

const kinds = [
  { icon: Cat, key: "Cat" },
  { icon: Dog, key: "Dog" },
  { icon: Bird, key: "Bird" },
  { icon: Fish, key: "Fish" },
];

function Adopt() {
  const [listings, setListings] = useState<any[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdoptionsFn().then(data => {
      setListings(data);
      setLoading(false);
    });
  }, []);

  const filtered = filter ? listings.filter(l => l.pet.type === filter) : listings;

  return (
    <div className="mx-auto max-w-5xl p-5 py-10 sm:p-8 min-h-screen">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>

      <div className="text-center mb-12">
        <h1 className="font-display text-5xl font-extrabold text-primary mb-4">Find a Friend</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Open your home and your heart to a pet in need. Browse our community's adoption board to find your new best friend.</p>
        
        <div className="mt-8 flex justify-center gap-6">
          {kinds.map((k) => (
            <button
              key={k.key}
              onClick={() => setFilter(filter === k.key ? null : k.key)}
              className={`group flex flex-col items-center gap-3 transition-colors ${filter === k.key ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              <span className={`grid size-16 place-items-center rounded-full transition-all ${filter === k.key ? 'bg-primary text-primary-foreground shadow-[var(--shadow-gold)] scale-110' : 'bg-card border border-border shadow-[var(--shadow-card)] group-hover:border-primary'}`}>
                <k.icon className="size-8" />
              </span>
              <span className="text-xs font-bold">{k.key}s</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center p-10 text-muted-foreground">Loading adoption board...</div>
      ) : listings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center">
          <Heart className="size-12 mx-auto text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-bold mb-2">No pets available right now</h2>
          <p className="text-muted-foreground">Check back later for new adoption listings.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center p-10 text-muted-foreground">No {filter}s available for adoption right now.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((listing) => (
            <figure key={listing.id} className="group rounded-3xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)] transition-transform hover:-translate-y-2">
              <div className="aspect-[4/3] bg-secondary relative">
                {listing.pet.image ? (
                  <img src={listing.pet.image} alt={listing.pet.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    {listing.pet.type === 'Cat' ? '🐱' : listing.pet.type === 'Dog' ? '🐶' : listing.pet.type === 'Bird' ? '🦜' : '🐟'}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md rounded-full px-3 py-1 text-xs font-bold">
                  {listing.pet.gender === 'M' ? '♂ Male' : '♀ Female'}
                </div>
              </div>
              <figcaption className="p-6">
                <h3 className="font-display text-2xl font-bold mb-1">{listing.pet.name}</h3>
                <p className="text-sm font-medium text-primary mb-4">{listing.pet.type}</p>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{listing.description}</p>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                      {listing.lister.name.charAt(0)}
                    </div>
                    <span className="text-xs text-muted-foreground">Listed by {listing.lister.name}</span>
                  </div>
                  <button className="rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                    Contact
                  </button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
