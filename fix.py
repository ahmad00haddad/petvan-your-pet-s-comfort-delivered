import os

files = [
    'src/routes/login.tsx',
    'src/routes/register.tsx',
    'src/routes/install.tsx'
]

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if 'import { copy }' not in content:
        content = "import { useAppStore } from '../lib/store';\nimport { copy } from '../lib/i18n';\n" + content
    
    if 'const t = copy' not in content:
        import re
        content = re.sub(r'(function (Login|Register|Install)\(\) \{)', r'\1\n  const lang = useAppStore((state: any) => state.lang);\n  const t = copy[lang];', content)
        
    if 'login' in f:
        content = content.replace('Enter your details to access your account', '{t.welcomeBackDesc}')
        import re
        content = re.sub(r'>\s*Email\s*</label>', '>{t.emailAddress}</label>', content)
        content = re.sub(r'>\s*Password\s*</label>', '>{t.password}</label>', content)
        content = content.replace('{loading ? "Signing in..." : "Sign in"}', '{loading ? t.signingIn : t.signIn}')
        content = content.replace('Don\'t have an account? {" "}', '{t.noAccount} {" "}')
        content = re.sub(r'>\s*Sign up\s*</Link>', '>{t.signUp}</Link>', content)
        content = re.sub(r'>\s*Home\s*</Link>', '>{t.goBackHome}</Link>', content)
        
    if 'register' in f:
        content = content.replace('Join PetVan today and manage your pet\'s life.', '{t.createAccountDesc}')
        import re
        content = re.sub(r'>\s*Create Account\s*<', '>{t.createAccount}<', content)
        content = re.sub(r'>\s*Full Name\s*</label>', '>{t.fullName}</label>', content)
        content = re.sub(r'>\s*Email\s*</label>', '>{t.emailAddress}</label>', content)
        content = re.sub(r'>\s*Password\s*</label>', '>{t.password}</label>', content)
        content = content.replace('{loading ? "Signing up..." : "Sign up"}', '{loading ? t.signingUp : t.signUp}')
        content = content.replace('Already have an account? {" "}', '{t.alreadyHaveAccount} {" "}')
        content = re.sub(r'>\s*Sign in\s*</Link>', '>{t.signIn}</Link>', content)
        content = re.sub(r'>\s*Home\s*</Link>', '>{t.goBackHome}</Link>', content)
        
    if 'install' in f:
        import re
        content = re.sub(r'>\s*Install PetVan\s*<', '>{t.installApp}<', content)
        content = re.sub(r'Get the full app experience\. Install PetVan on your home screen for faster access, offline\s*mode, and push notifications\.', '{t.installAppDesc}', content)
        content = re.sub(r'>\s*Fast Installation\s*<', '>{t.fastInstall}<', content)
        content = re.sub(r'>\s*Home\s*</Link>', '>{t.goBackHome}</Link>', content)
        content = content.replace('"Install App Now"', 't.installNow')
        content = content.replace('"App is already installed"', 't.alreadyInstalled')
        content = re.sub(r'>\s*Apple iOS Installation\s*<', '>{t.iosInstallTitle}<', content)
        content = re.sub(r'Safari doesn\'t support automatic installation\. Follow these 2 easy steps:', '{t.iosInstallDesc}', content)
        content = content.replace('Tap the Share button at the bottom of Safari', '{t.iosStep1}')
        content = content.replace('Scroll down and tap \'Add to Home Screen\'', '{t.iosStep2}')

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
