with open('main.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the import line
old_import = "from routes import router as auth_router, event_router, user_router, service_hours_router"
new_import = "from routes import router as auth_router, event_router, user_router, service_hours_router\nfrom email_routes import email_router"

content = content.replace(old_import, new_import)

with open('main.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed main.py imports")
