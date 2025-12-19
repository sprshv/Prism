with open('main.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the import section and add email_routes import
import_line = "from routes import router, event_router, user_router, service_hours_router"
new_import_line = "from routes import router, event_router, user_router, service_hours_router\nfrom email_routes import email_router"

content = content.replace(import_line, new_import_line)

# Find where routers are included and add email_router
include_line = "app.include_router(service_hours_router)"
new_include = "app.include_router(service_hours_router)\napp.include_router(email_router)"

content = content.replace(include_line, new_include)

with open('main.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated main.py with email router")
