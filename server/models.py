from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Photographer(db.Model, SerializerMixin):
    __tablename__ = 'photographers'

    serialize_rules=('-photoshoots.photographer',)

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique = True, nullable = True)
    zip_code = db.Column(db.Integer)
    profile_picture = db.Column(db.String)
    bio = db.Column(db.String)
    portfolio_pictures = db.Column(db.String)
    
    #on to one relationship to user
    user = db.relationship('User', back_populates='photographer')
    #one to many relationship to user
    photoshoots = db.relationship('Photoshoot', back_populates='photographer', cascade = 'all, delete-orphan')
    users = association_proxy('photoshoots', 'user', creator=lambda user_obj: Photoshoot(user=user_obj))
    
    def __repr__(self):
        return f'<Photographer {self.id}: {self.name}, {self.zip_code}, {self.bio}>'

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules=('-photoshoots.user',)

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique= True, nullable = True) 
    photographer_id = db.Column(db.Integer, db.ForeignKey('photographers.id'))
    #on to one relationship to user
    photographer = db.relationship('Photographer', back_populates='user')
    #one to many relationship to users
    photoshoots= db.relationship('Photoshoot', back_populates='user', cascade='all, delete-orphan')
    photographers = association_proxy('photoshoots', 'photographer', creator=lambda photographer_obj: Photoshoot(photographer=photographer_obj))
    
    def __repr__(self):
        return f'<User {user.id}: {user.name}>'

class Photoshoot(db.Model, SerializerMixin):
    __tablename__ = 'photoshoots'

    serialize_rules=('-photographer.photoshoots', '-user.photoshoots',)

    id = db.Column(db.Integer, primary_key = True)
    photographer_id = db.Column(db.Integer, db.ForeignKey('photographers.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    location = db.Column(db.String)
    date_time= db.Column(db.DATETIME)

    photographer= db.relationship('Photographer', back_populates='photoshoots')
    user = db.relationship('User', back_populates='photoshoots')
    
    def __repr__(self):
        return f'<Photoshoot {self.id}: {self.location}, {self.time}>'






