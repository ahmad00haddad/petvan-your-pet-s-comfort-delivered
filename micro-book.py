import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

book = rd('src/routes/services/book.tsx')

# Late Booking Hint & Total Pulse
if "isLate" not in book:
    book = book.replace(
        '  const t = copy[lang as keyof typeof copy];',
        '''  const t = copy[lang as keyof typeof copy];
  const currentHour = new Date().getHours();
  const isLate = currentHour >= 22 || currentHour <= 7;'''
    )
    
    # Total Pulse
    book = book.replace(
        '<span className="text-xl sm:text-2xl font-black text-primary">{total} JOD</span>',
        '<span key={total} className="text-xl sm:text-2xl font-black text-primary animate-in zoom-in-50 duration-300">{total} JOD</span>'
    )
    
    # Late booking text under submit button
    book = book.replace(
        '{loading ? t.confirming : t.confirmBooking}\n                </button></Magnetic>\n              </div>\n            </div>',
        '''{loading ? t.confirming : t.confirmBooking}
                </button></Magnetic>
                {isLate && (
                  <p className="text-center text-xs text-muted-foreground mt-4 animate-pulse">
                    🌙 {lang === "ar" ? "الوقت متأخر الآن، سيتم تأكيد حجزك في الصباح الباكر" : "It's late, your booking will be confirmed early morning."}
                  </p>
                )}
              </div>
            </div>'''
    )
    
    # Glowing Popular Service (Golden border for 50 JOD service)
    book = book.replace(
        '                      className={`relative p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${',
        '                      className={`relative p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${s.price === 50 && !isSelected ? "border-primary/50 shadow-[0_0_15px_rgba(255,202,40,0.3)]" : ""} ${'
    )
    
    rw('src/routes/services/book.tsx', book)

print("Done book")