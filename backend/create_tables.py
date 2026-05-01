"""
Script to create the applications table in PostgreSQL
Run this once to initialize the database
"""
from postgres_db import Base, engine
from sql_models import Application, ApplicationStatus

# Create all tables
Base.metadata.create_all(bind=engine)

print("✅ Database tables created successfully!")
print("Tables created:")
print("  - applications")
