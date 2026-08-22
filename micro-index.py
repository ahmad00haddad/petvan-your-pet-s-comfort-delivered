import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

index = rd('src/routes/index.tsx')

if 'AnimatedCounter' not in index:
    # Insert AnimatedCounter component before Route declaration
    counter_comp = """function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return <>{count}{suffix}</>;
}

"""
    index = index.replace('export const Route = createFileRoute', counter_comp + 'export const Route = createFileRoute')
    
    # Replace static numbers with AnimatedCounter
    index = index.replace(
        '<h3 className="text-5xl lg:text-6xl font-black text-primary font-display mb-2 drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]">10K<span className="text-3xl">+</span></h3>',
        '<h3 className="text-5xl lg:text-6xl font-black text-primary font-display mb-2 drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]"><AnimatedCounter end={10} suffix="K" /><span className="text-3xl">+</span></h3>'
    )
    index = index.replace(
        '<h3 className="text-5xl lg:text-6xl font-black text-primary font-display mb-2 drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]">50<span className="text-3xl">+</span></h3>',
        '<h3 className="text-5xl lg:text-6xl font-black text-primary font-display mb-2 drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]"><AnimatedCounter end={50} /><span className="text-3xl">+</span></h3>'
    )
    index = index.replace(
        '<h3 className="text-5xl lg:text-6xl font-black text-primary font-display mb-2 drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]">4.9<span className="text-3xl">/5</span></h3>',
        '<h3 className="text-5xl lg:text-6xl font-black text-primary font-display mb-2 drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]">4.9<span className="text-3xl">/5</span></h3>'
    )
    index = index.replace(
        '<h3 className="text-5xl lg:text-6xl font-black text-primary font-display mb-2 drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]">24<span className="text-3xl">/7</span></h3>',
        '<h3 className="text-5xl lg:text-6xl font-black text-primary font-display mb-2 drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]"><AnimatedCounter end={24} /><span className="text-3xl">/7</span></h3>'
    )
    
    rw('src/routes/index.tsx', index)

print("Done index")