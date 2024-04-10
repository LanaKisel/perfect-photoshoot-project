#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
import base64
# Local imports
from app import app
from models import db, Photographer

fake = Faker()

#customized bio
# fake.add_provider(bio_provider)

# def bio_provider(fake):
#     bio = ["Hello there! I'm, a passionate photographer dedicated to freezing moments in time and crafting memories that last a lifetime. With a keen eye for detail and a heart full of creativity, I specialize in portrait, landscape, fashion, events photography.", "Hey there, I'm a lifestyle photographer with a passion for capturing the beauty of everyday moments. From candid family gatherings to intimate newborn sessions, I believe that life's most precious memories are found in the simplest of moments.",'Soo-ji', 'Jae-won', 'Hae-rin', 'Hyun-jin', 'Sung-hoon', 'Eun-ji', 'Joon-hyuk', 'Yoo-na', 'Min-seo']
#     return fake.random_element(bio)

def create_photographers():
    photographers = []
    for _ in range(10):
        a= Photographer(
            name=fake.name(),
            zip_code=fake.postcode(),
            # profile_picture='',
            profile_picture=base64.b64encode(fake.image()),

            bio=fake.paragraph(),
            # portfolio_pictures='',
            portfolio_pictures=base64.b64encode(fake.image())
        )
        photographers.append(a)
    return photographers
if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():        
        print("Starting seed...")
        # Seed code goes here!
        Photographer.query.delete()

        print('Seeding Photographers')
        photographers = create_photographers()
        db.session.add_all(photographers)
        db.session.commit()

            
                