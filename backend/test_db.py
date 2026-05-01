from pymongo import MongoClient
from config import settings

try:
    client = MongoClient(settings.mongodb_url, serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print('✓ MongoDB connection successful!')
    db = client[settings.database_name]
    print(f'✓ Database "{settings.database_name}" accessible')
    collection = db.users
    count = collection.count_documents({})
    print(f'✓ Found {count} users in database')
    client.close()
except Exception as e:
    print(f'✗ Error: {type(e).__name__}: {e}')
