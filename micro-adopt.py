import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

# 2. Double Tap Heart in adopt/index.tsx
adopt = rd('src/routes/adopt/index.tsx')
if "handleDoubleTap" not in adopt:
    adopt = adopt.replace(
        '  const [loading, setLoading] = useState(true);',
        '''  const [loading, setLoading] = useState(true);
  const [heartAnim, setHeartAnim] = useState<string | null>(null);

  const handleDoubleTap = (id: string) => {
    setHeartAnim(id);
    setTimeout(() => setHeartAnim(null), 1000);
  };'''
    )
    
    # Apply to image container
    adopt = adopt.replace(
        '<div className="aspect-[4/3] bg-secondary relative">',
        '<div className="aspect-[4/3] bg-secondary relative cursor-pointer" onDoubleClick={() => handleDoubleTap(listing.id)}>'
    )
    
    # Add floating heart
    adopt = adopt.replace(
        '{listing.pet.image ? (',
        '''{heartAnim === listing.id && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <Heart className="size-24 text-red-500 fill-red-500 animate-[ping_1s_ease-out_forwards]" />
                  </div>
                )}
                {listing.pet.image ? ('''
    )
    rw('src/routes/adopt/index.tsx', adopt)

print("Done adopt")