from sqlalchemy import Column, String, Integer, Text, DateTime, Enum
from datetime import datetime
from postgres_db import Base
import enum
import uuid

class ApplicationStatus(str, enum.Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"

class Application(Base):
    __tablename__ = "applications"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Personal Info
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=False)
    team = Column(String, nullable=False)  # "Los Angeles" or "San Diego"
    
    # School Info
    schoolType = Column(String, nullable=False)  # "highschool" or "college"
    school = Column(String, nullable=False)
    grade = Column(String, nullable=False)
    weightedGPA = Column(String, nullable=True)
    unweightedGPA = Column(String, nullable=True)
    
    # Program Info
    stemClasses = Column(Text, nullable=True)
    programInterests = Column(Text, nullable=True)
    whyJoin = Column(Text, nullable=True)
    experience = Column(Text, nullable=True)
    availability = Column(Text, nullable=True)
    
    # Officer Interest
    interestedInOfficer = Column(String, default="false")  # "true" or "false"
    officerRole = Column(String, nullable=True)
    leadershipExperience = Column(Text, nullable=True)
    whyOfficerRole = Column(Text, nullable=True)
    
    # Software Dev Interest
    interestedInSoftwareDev = Column(String, default="false")  # "true" or "false"
    softwareDevExperience = Column(Text, nullable=True)
    
    # Commitment
    understandsCommitment = Column(String, default="false")
    agreeToContact = Column(String, default="false")
    
    # Status Tracking
    status = Column(Enum(ApplicationStatus), default=ApplicationStatus.PENDING)
    trackingToken = Column(String, unique=True, nullable=False)  # For public tracking link
    reviewedBy = Column(String, nullable=True)  # Email of person who reviewed
    reviewedAt = Column(DateTime, nullable=True)
    
    # Timestamps
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
