import os
import re

path = "src/routes/index.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# The user is complaining about the dog image overflowing its boundaries and looking ugly.
# Let's replace the whole hero image container with a clean, perfectly clipped circle.

# 1. Find the parent container and replace the contents entirely.
# The parent is: <div className="relative order-2 lg:order-1 h-[400px] sm:h-[600px] w-full mt-12 lg:mt-0 transition-transform duration-300 ease-out" style={{ transform: 'translate(calc(var(--mouse-x, 0) * -1), calc(var(--mouse-y, 0) * -1))' }}>

new_html = '''<div className="relative order-2 lg:order-1 h-[400px] sm:h-[600px] w-full mt-12 lg:mt-0 transition-transform duration-300 ease-out flex items-center justify-center" style={{ transform: 'translate(calc(var(--mouse-x, 0) * -1), calc(var(--mouse-y, 0) * -1))' }}>
          
          <div className="relative w-[300px] sm:w-[450px] aspect-square rounded-full shadow-[0_0_80px_rgba(255,255,255,0.05)] pulsing-glow overflow-hidden border-4 border-foreground/10 group">
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <img
              key={globalPetType || "default"}
              src={getHeroImage(globalPetType)}
              alt="Happy pet"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="absolute size-2 rounded-full bg-primary/40 animate-float"
                style={{ 
                  top: \\%\, 
                  left: \\%\, 
                  animationDelay: \\s\,
                  animationDuration: \\s\
                }}
              />
            ))}
          </div>
        </div>'''

# We need to replace everything between <div className="relative order-2... and the closing </div> before <div className="order-1 lg:order-2...
# Using regex to extract and replace the hero image block:
content = re.sub(
    r'<div className="relative order-2 lg:order-1 h-\[400px\].*?</div>\s*</div>\s*<div className="order-1 lg:order-2',
    new_html + '\n\n        <div className="order-1 lg:order-2',
    content,
    flags=re.DOTALL
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)