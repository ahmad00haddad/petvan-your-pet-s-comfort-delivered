import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdoptionsFn } from "../../api/adopt";
import { useAppStore } from "../../lib/store";
import { ArrowLeft, Heart, Cat, Dog, Bird, Fish, Loader2 } from "lucide-react";

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
  const globalPetType = useAppStore((state) => state.globalPetType);
  const setGlobalPetType = useAppStore((state) => state.setGlobalPetType);
  const [listings, setListings] = useState<any[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdoptionsFn().then((data) => {
      setListings(data);
      setLoading(false);
    });
  }, []);

  const activeFilter = filter || globalPetType;
  const filtered = activeFilter ? listings.filter((l) => l.pet.type === activeFilter) : listings;

  return (
    <div className="mx-auto max-w-5xl p-5 py-10 sm:p-8 min-h-screen animate-fade-in-up">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>

      <div className="text-center mb-12">
        <h1 className="font-display text-5xl font-extrabold text-primary mb-4">Find a Friend</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Open your home and your heart to a pet in need. Browse our community's adoption board to
          find your new best friend.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          {kinds.map((k) => {
            const isActive = activeFilter === k.key;
            return (
              <button
                key={k.key}
                onClick={() => {
                  setFilter(isActive ? null : k.key);
                  setGlobalPetType(isActive ? null : k.key); // also update global context
                }}
                className={`group flex flex-col items-center gap-3 transition-colors ${isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-primary"}`}
              >
                <span
                  className={`grid size-16 place-items-center rounded-full transition-all ${isActive ? "bg-primary text-primary-foreground shadow-[var(--shadow-gold)] ring-4 ring-primary/20 glow-primary" : "glass-panel border border-border shadow-[var(--shadow-card)] group-hover:border-primary group-hover:glow-primary group-hover:scale-105"}`}
                >
                  <k.icon className="size-8" />
                </span>
                <span className="text-xs font-bold">{k.key}s</span>
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4 text-primary">
          <Loader2 className="size-10 animate-spin" />
          <p className="font-bold animate-pulse">Finding friends...</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center">
          <Heart className="size-12 mx-auto text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-bold mb-2">No pets available right now</h2>
          <p className="text-muted-foreground">Check back later for new adoption listings.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center p-10 text-muted-foreground">
          No {filter}s available for adoption right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((listing) => (
            <figure
              key={listing.id}
              className="group rounded-3xl border border-border glass-panel overflow-hidden shadow-[var(--shadow-card)] transition-all hover:-translate-y-2 hover:glow-primary"
            >
              <div className="aspect-[4/3] bg-secondary relative">
                {listing.pet.image ? (
                  <img
                    src={listing.pet.image}
                    alt={listing.pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    {listing.pet.type === "Cat"
                      ? "🐱"
                      : listing.pet.type === "Dog"
                        ? "🐶"
                        : listing.pet.type === "Bird"
                          ? "🦜"
                          : "🐟"}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md rounded-full px-3 py-1 text-xs font-bold">
                  {listing.pet.gender === "M" ? "♂ Male" : "♀ Female"}
                </div>
              </div>
              <figcaption className="p-6">
                <h3 className="font-display text-2xl font-bold mb-1">{listing.pet.name}</h3>
                <p className="text-sm font-medium text-primary mb-4">{listing.pet.type}</p>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                  {listing.description}
                </p>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                      {listing.lister.name.charAt(0)}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Listed by {listing.lister.name}
                    </span>
                  </div>
                  <a
                    href={`mailto:${listing.lister.email}?subject=Regarding adopting ${listing.pet.name}`}
                    className="rounded-full bg-primary/10 text-primary px-4 py-2 text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
