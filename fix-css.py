with open('src/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove the block exactly
block = '''/* Hide default cursor on desktop when using custom cursor */
@media (min-width: 768px) {
  body {
    cursor: none;
  }
  a, button, [role="button"], input, select, textarea {
    cursor: none !important;
  }
}'''

if block in css:
    css = css.replace(block, '')
else:
    # try replacing with different newlines or spacing
    import re
    css = re.sub(r'/\* Hide default cursor.*?\n@media \(min-width: 768px\) \{[\s\S]*?cursor: none !important;\n  \}\n\}', '', css)

with open('src/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

# Also let's fix CustomCursor.tsx checkHover crash
with open('src/components/CustomCursor.tsx', 'r', encoding='utf-8') as f:
    cc = f.read()

cc = cc.replace(
    'target.tagName.toLowerCase()',
    'target.tagName?.toLowerCase()'
)

with open('src/components/CustomCursor.tsx', 'w', encoding='utf-8') as f:
    f.write(cc)
print('Done fixing cursor')