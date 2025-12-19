#!/usr/bin/env python3
import re

# Read the file
with open('routes.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the broken MongoDB query
content = content.replace(
    '{"": {"role": role_update.role}}',
    '{"$set": {"role": role_update.role}}'
)

# Write it back
with open('routes.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed routes.py - replaced '' with '$set'")
