import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

index = rd('src/routes/index.tsx')

index = index.replace(
    '<h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-foreground mb-6 font-display animate-fade-in-up leading-tight tracking-tight max-w-4xl mx-auto">',
    '<h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-foreground mb-6 font-display leading-tight tracking-tight max-w-4xl mx-auto animate-in slide-in-from-bottom-8 fade-in duration-1000 fill-mode-both" style={{ animationDelay: "200ms" }}>'
)
index = index.replace(
    '<p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: \'100ms\' }}>',
    '<p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-1000 fill-mode-both" style={{ animationDelay: "400ms" }}>'
)
index = index.replace(
    '<div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up" style={{ animationDelay: \'200ms\' }}>',
    '<div className="flex flex-col sm:flex-row gap-5 justify-center animate-in slide-in-from-bottom-8 fade-in duration-1000 fill-mode-both" style={{ animationDelay: "600ms" }}>'
)
index = index.replace(
    'className="group relative bg-card p-6 sm:p-8 rounded-[2rem] border border-border overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,202,40,0.1)] hover:-translate-y-2"',
    'className="group relative bg-card p-6 sm:p-8 rounded-[2rem] border border-border overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,202,40,0.1)] hover:-translate-y-2 [transform-style:preserve-3d] hover:[transform:rotateX(5deg)_rotateY(-5deg)]"'
)
index = index.replace(
    '{t.bookService}',
    '{new Date().getHours() < 12 ? (lang === "ar" ? "ابدأ يوم أليفك بانتعاش" : "Start your pet\'s day right") : (new Date().getHours() > 18 ? (lang === "ar" ? "عناية مسائية تريحه وتريحك" : "Evening pampering for your pet") : t.bookService)}'
)
rw('src/routes/index.tsx', index)

book = rd('src/routes/services/book.tsx')

book = book.replace(
    '<div className="mt-4 flex items-center justify-between">',
    """<div className="mt-4 flex items-center justify-between">
                        {s.id === "SALON" && isSelected && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary/20 backdrop-blur text-primary text-[10px] font-bold px-3 py-1 rounded-full animate-in fade-in slide-in-from-bottom-2 whitespace-nowrap">
                            {lang === "ar" ? "💡 غالباً يضاف معها: تنظيف الأذن" : "💡 Often added: Ear cleaning"}
                          </div>
                        )}"""
)
book = book.replace(
    '<label className="text-sm font-medium">{lang === "ar" ? "OU"O1U,U"O OU"O-U^O" : "Phone Number"}</label>',
    '<label className="text-sm font-medium flex items-center gap-2">{lang === "ar" ? "رقم الهاتف" : "Phone Number"} {phone.length > 8 && <Check className="size-4 text-green-500 animate-in zoom-in" />}</label>'
)
book = book.replace(
    '<label className="text-sm font-medium text-foreground">{lang === "ar" ? "OU"O^U,O OU"U...U OU" (OOOUSOO1US)" : "Preferred Time (Optional)"}</label>',
    '<label className="text-sm font-medium text-foreground flex items-center gap-2">{lang === "ar" ? "الوقت المفضل (اختياري)" : "Preferred Time (Optional)"} {time && <Check className="size-4 text-green-500 animate-in zoom-in" />}</label>'
)
book = book.replace(
    '            <p className="text-muted-foreground mt-2">{t.bookDesc}</p>',
    """            <p className="text-muted-foreground mt-2">{t.bookDesc}</p>
            <div className="inline-flex items-center gap-2 mt-4 bg-green-500/10 text-green-500 px-3 py-1.5 rounded-full text-xs font-bold">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
              </span>
              {lang === "ar" ? "متاحون لخدمتك اليوم في عمان" : "Available to serve you today in Amman"}
            </div>"""
)
rw('src/routes/services/book.tsx', book)

print("Phase 2 & 3 scripts applied.")