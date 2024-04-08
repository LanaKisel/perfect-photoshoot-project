#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Photographer, User, Photoshoot

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
                date_time=data['date_time']
            )
            db.session.add(new_photoshoot)
            db.session.commit()
            if new_photoshoot:
                return make_response(new_photoshoot.to_dict(), 201) 
        except:
            return {'errors':['validation errors']}, 400      
api.add_resource(Photoshoots, '/photoshoots')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

