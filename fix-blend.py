import os
import re

def fix_images():
    for root, dirs, files in os.walk('src/routes'):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if 'mix-blend-multiply' in content:
                    content = content.replace(' mix-blend-multiply', '')
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)

fix_images()
