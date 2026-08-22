import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

def fix_password(filepath):
    content = rd(filepath)
    content = content.replace('import { ArrowLeft } from "lucide-react";', 'import { ArrowLeft, Eye, EyeOff } from "lucide-react";')
    content = content.replace('const [loading, setLoading] = useState(false);', 'const [loading, setLoading] = useState(false);\n  const [showPassword, setShowPassword] = useState(false);')
    
    # Replace type="password" with dynamic
    content = content.replace('type="password"', 'type={showPassword ? "text" : "password"}')
    
    # Replace input class
    old_input = 'className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all hover:bg-background/80 mt-2"\n              />'
    new_input = '''className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur px-4 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all hover:bg-background/80 mt-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>'''
    content = content.replace(old_input, new_input)
    
    # Wrap in relative div
    content = content.replace('<div>\n              <label className="text-sm font-medium leading-none" htmlFor="password">', '<div className="relative">\n              <label className="text-sm font-medium leading-none" htmlFor="password">')
    
    rw(filepath, content)

fix_password('src/routes/login.tsx')
fix_password('src/routes/register.tsx')
print("Done passwords")