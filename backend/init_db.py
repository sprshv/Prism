"""
Script to initialize PostgreSQL database and create tables for applications.
Run this once before starting the backend.

Usage:
    python init_db.py
"""

from postgres_db import engine, Base
from sql_models import Application

print("Creating PostgreSQL tables...")

try:
    # Create all tables defined in models
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
    print(f"✅ Applications table ready at: {engine.url}")
except Exception as e:
    print(f"❌ Error creating tables: {e}")
    print("\nMake sure PostgreSQL is running and DATABASE_URL in .env is correct.")
    print("Expected format: postgresql://username:password@localhost:5432/database_name")
