import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

# Phase 4 Scripts

# 1. Shop "In Stock" badge
shop = rd('src/routes/shop/index.tsx')
if "In Stock" not in shop and "متوفر" not in shop:
    shop = shop.replace(
        '<div className="aspect-square bg-secondary relative">',
        '''<div className="aspect-square bg-secondary relative">
                  <div className="absolute top-4 left-4 z-10 bg-green-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <div className="size-1.5 rounded-full bg-white animate-pulse" />
                    {lang === "ar" ? "متوفر" : "In Stock"}
                  </div>'''
    )
    rw('src/routes/shop/index.tsx', shop)

# 2. Empty notes hint in book.tsx
book = rd('src/routes/services/book.tsx')
if "هل حيوانك يخاف من المقص" not in book:
    book = book.replace(
        '<label className="text-sm font-medium text-foreground">{lang === "ar" ? "OU"U...U"O-O,O"O O OU"OU,O OU1US" : "Notes & Medical History"}</label>',
        '<label className="text-sm font-medium text-foreground">{lang === "ar" ? "ملاحظات للطبيب" : "Notes & Medical History"}</label>'
    )
    book = book.replace(
        'placeholder={lang === "ar" ? "OU"US U...U"O-O,O"O O OU" O OU"O O" OU"OUSU^O"U+O O O1O,O" O OU"O O O"O O" U...OO O..." : "Any notes or medical history..."}',
        'placeholder={lang === "ar" ? "أي ملاحظات إضافية؟" : "Any notes..."}'
    )
    book = book.replace(
        '              <textarea\n                id="notes"',
        '''              <textarea
                id="notes"'''
    )
    book = book.replace(
        'onChange={(e) => setNotes(e.target.value)}\n                className="flex min-h-[100px] w-full rounded-xl border border-input bg-background/50 backdrop-blur px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all hover:bg-background/80 mt-2"\n              />\n            </div>',
        '''onChange={(e) => setNotes(e.target.value)}
                className="flex min-h-[100px] w-full rounded-xl border border-input bg-background/50 backdrop-blur px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all hover:bg-background/80 mt-2"
              />
              {!notes && (
                <p className="text-[10px] text-muted-foreground mt-1 ml-1 animate-in fade-in">
                  💡 {lang === "ar" ? "هل حيوانك يخاف من الأصوات العالية أو المقص؟ أخبرنا بذلك!" : "Is your pet afraid of scissors or loud noises? Let us know!"}
                </p>
              )}
            </div>'''
    )
    rw('src/routes/services/book.tsx', book)

# 3. Language Switcher Flip in __root.tsx
root = rd('src/routes/__root.tsx')
if "animate-[flip_0.5s_ease-out]" not in root:
    # Just add a flip transition when clicking the button
    root = root.replace(
        '<button onClick={() => setLang(lang === "en" ? "ar" : "en")} className="font-bold hover:text-primary transition-colors flex items-center gap-1">',
        '<button onClick={(e) => { e.currentTarget.classList.remove("animate-[flip_0.5s_ease-out]"); void e.currentTarget.offsetWidth; e.currentTarget.classList.add("animate-[flip_0.5s_ease-out]"); setLang(lang === "en" ? "ar" : "en"); }} className="font-bold hover:text-primary transition-all flex items-center gap-1 [transform-style:preserve-3d]">'
    )
    # Add flip keyframe to styles.css
    css = rd('src/styles.css')
    if "@keyframes flip" not in css:
        css += '''
@keyframes flip {
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(90deg) scale(1.1); }
  100% { transform: rotateY(0deg); }
}
'''
        rw('src/styles.css', css)
    rw('src/routes/__root.tsx', root)

print("Phase 4 applied.")