#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Photographer, User, Photoshoot
from datetime import datetime
# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Photographers(Resource):
    def get(self):
        photographer = [photographer.to_dict() for photographer in Photographer.query.all()]
        return make_response(photographer, 200)

    def post(self):
        data = request.get_json()
        try:
            new_photographer = Photographer(
                name=data['name'],
                zip_code=data['zip_code'],
                profile_picture=data['profile_picture'],
                bio= data['bio'],
                portfolio_pictures=data['portfolio_pictures']
            )
            db.session.add(new_photographer)
            db.session.commit()
            if new_photographer:
                return make_response(new_photographer.to_dict(), 201)
        except:
            return {'errors': 'validation errors'}, 400
api.add_resource(Photographers, '/photographers')     

class PhotographersById(Resource):
    def get(self, id):
        photographer= Photographer.query.filter(Photographer.id == id).first()
        if photographer:
            return make_response(photographer.to_dict(), 200)
        return {'error':'Photographer not found'}, 404

    def patch(self, id):
        photographer = Photographer.query.filter(Photographer.id==id).first()
        data = request.get_json()
        if photographer:
            for attr in data:
                try:
                    setattr(photographer, attr, data[attr])
                except:
                    return {'errors': ['validation errors']}, 400
            db.session.add(photographer)
            db.session.commit()
            return make_response(photographer.to_dict(), 202)
        return {'error': 'Photographer not found'}, 404  
api.add_resource(PhotographersById, '/photographers/<int:id>')        

class Photoshoots(Resource):
    def get(self):
        photoshoot = [photoshoot.to_dict() for photoshoot in Photoshoot.query.all()]
        return make_response(photoshoot, 200)
        
    def post(self):
        data = request.get_json()
        try:
            new_photoshoot = Photoshoot(
                user_id=data['user_id'],
                photographer_id=data['photographer_id'],
                location = data['location'],
                date_time=datetime.strptime(data['date_time'], '%m/%d/%Y %H:%M').date()
            )
            db.session.add(new_photoshoot)
            db.session.commit()
            if new_photoshoot:
                return make_response(new_photoshoot.to_dict(), 201) 
        except Exception as e:
            print(e)
            return {'errors':['validation errors']}, 400      
api.add_resource(Photoshoots, '/photoshoots')

class PhotoshootsById(Resource):
    def get(self, id):
        photoshoot=Photoshoot.query.filter(Photoshoot.id==id).first()
        if photoshoot:
            return make_response(photoshoot.to_dict(), 200)
        return {'error': 'Photoshoot not found'}, 404
    def patch(self, id):
        data = request.get_json()
        photoshoot=Photoshoot.query.filter(Photoshoot.id==id).first()
        if photoshoot:            
            for attr in data:
                try:
                    setattr(photoshoot, attr, data[attr])
                except:
                    return {'errors':['validation errors']}, 400
            db.session.add(photoshoot)
            db.session.commit()
            return make_response(photoshoot.to_dict(), 202)
        return {'error':'Photoshoot not found'}, 404  

    def delete(self, id):
        photoshoot = Photoshoot.query.filter(Photoshoot.id==id).first()
        if photoshoot:
            db.session.delete(photoshoot)
            db.session.commit()
            return {}, 204
        return {'error':'Photoshoot not found'}, 404    
api.add_resource(PhotoshootsById, '/photoshoots/<int:id>')

class Users(Resource):
    def get(self):
        user=[user.to_dict() for user in User.query.all()]
        return make_response(user, 200)

    def post(self):
        data = request.get_json()
        try:
            new_user = User(
                name= data['name'],
                photographer_id = data['photographer_id']
            )
            db.session.add(new_user)
            db.session.commit()
            if new_user:
                return make_response(new_user.to_dict(), 201)
        except:
            return {'error':'error creating new user'}, 400            

api.add_resource(Users, '/users')                
if __name__ == '__main__':
    app.run(port=5555, debug=True)

