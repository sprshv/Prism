#!/usr/bin/env python3
import re

# Read the file
with open('routes.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all broken MongoDB queries that are missing $set
# Pattern 1: {"": {"role": ...}}
content = content.replace(
    '{"": {"role": role_update.role}}',
    '{"$set": {"role": role_update.role}}'
)

# Pattern 2: {"": update_data}
content = content.replace(
    '{"": update_data}',
    '{"$set": update_data}'
)

# Write it back
with open('routes.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed routes.py - replaced all '' with '$set'")
