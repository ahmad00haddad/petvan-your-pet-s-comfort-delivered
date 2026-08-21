with open('src/lib/i18n.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Check all duplicate keys in ar block
import re
ar_start = content.find('  ar: {')
ar_end = content.rfind('};')
ar_block = content[ar_start:ar_end]

# Find all property keys
keys = re.findall(r'^\s+(\w+):', ar_block, re.MULTILINE)
seen = set()
dups = []
for k in keys:
    if k in seen:
        dups.append(k)
    seen.add(k)
print('Duplicate keys in ar:', dups)

# Similarly for en block
en_start = content.find('  en: {')
en_end = ar_start
en_block = content[en_start:en_end]
keys_en = re.findall(r'^\s+(\w+):', en_block, re.MULTILINE)
seen_en = set()
dups_en = []
for k in keys_en:
    if k in seen_en:
        dups_en.append(k)
    seen_en.add(k)
print('Duplicate keys in en:', dups_en)