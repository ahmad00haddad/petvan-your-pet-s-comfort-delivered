import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

index = rd('src/routes/index.tsx')
if "TRUSTED BY PREMIUM BRANDS" not in index and "نثق بأفضل العلامات التجارية" not in index:
    marquee_html = """
      {/* Brand Partners Marquee */}
      <section className="py-16 bg-background/50 backdrop-blur-sm border-y border-border overflow-hidden">
        <div className="container mx-auto px-4 mb-8 text-center">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            {lang === "ar" ? "نثق بأفضل العلامات التجارية" : "TRUSTED BY PREMIUM BRANDS"}
          </p>
        </div>
        <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[marquee_20s_linear_infinite] gap-16 pr-16 items-center">
            {/* Duplicated for seamless infinite loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                <span className="text-2xl font-black text-muted-foreground/30 hover:text-primary transition-colors cursor-pointer">ROYAL CANIN</span>
                <span className="text-2xl font-black text-muted-foreground/30 hover:text-primary transition-colors cursor-pointer">PURINA</span>
                <span className="text-2xl font-black text-muted-foreground/30 hover:text-primary transition-colors cursor-pointer">WHISKAS</span>
                <span className="text-2xl font-black text-muted-foreground/30 hover:text-primary transition-colors cursor-pointer">PEDIGREE</span>
                <span className="text-2xl font-black text-muted-foreground/30 hover:text-primary transition-colors cursor-pointer">ORIJEN</span>
                <span className="text-2xl font-black text-muted-foreground/30 hover:text-primary transition-colors cursor-pointer">ACANA</span>
              </div>
            ))}
          </div>
        </div>
      </section>
"""
    index = index.replace(
        '      {/* Stats Section */}',
        marquee_html + '\n      {/* Stats Section */}'
    )
    rw('src/routes/index.tsx', index)

    css = rd('src/styles.css')
    if "@keyframes marquee" not in css:
        css += """
@keyframes marquee {
  to { transform: translateX(calc(-50% - 2rem)); }
}
"""
        rw('src/styles.css', css)

print("Phase 5.5 applied.")