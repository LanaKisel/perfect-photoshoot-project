#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
import base64
# Local imports
from app import app
from models import db, Photographer, Photoshoot

fake = Faker()

#customized bio
# fake.add_provider(bio_provider)

# def bio_provider(fake):
#     bio = ["Hello there! I'm, a passionate photographer dedicated to freezing moments in time and crafting memories that last a lifetime. With a keen eye for detail and a heart full of creativity, I specialize in portrait, landscape, fashion, events photography.", "Hey there, I'm a lifestyle photographer with a passion for capturing the beauty of everyday moments. From candid family gatherings to intimate newborn sessions, I believe that life's most precious memories are found in the simplest of moments.",'Soo-ji', 'Jae-won', 'Hae-rin', 'Hyun-jin', 'Sung-hoon', 'Eun-ji', 'Joon-hyuk', 'Yoo-na', 'Min-seo']
#     return fake.random_element(bio)

def create_photographers():
    photographers = []
    ph1 = Photographer(
        name = 'Matthew Ellis',
        zip_code = 95665,
        profile_picture = "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        bio ="Hello there! I'm a passionate photographer with a keen eye for detail and a heart full of creativity, I specialize in portrait photography.",
        portfolio_pictures="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  
    )
    ph2= Photographer(
        name='Erica Perez',
        zip_code= 75137,
        profile_picture="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        bio = "Hey there, I'm a lifestyle photographer with a passion for capturing the beauty of everyday moments. From candid family gatherings to intimate newborn sessions, I believe that life's most precious memories are found in the simplest of moments.",
        portfolio_pictures = "https://cdn.create.vista.com/api/media/medium/275774780/stock-photo-happy-family-mother-father-children-son-and-daughter-on-sunse?token=|https://cdn.create.vista.com/api/media/medium/129210614/stock-photo-happy-family-walking-in-park?token=|https://cdn.create.vista.com/api/media/medium/36646291/stock-photo-smiling-family-on-carpet?token="
    )
    ph3= Photographer(
        name='John Chandler',
        zip_code = 39150,
        profile_picture="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        bio="Whether it's the grandeur of a wedding or the joyous chaos of a birthday bash, I thrive on the unique energy and emotion that fill these occasions. From the exchange of vows to the blowing out of candles, I am dedicated to preserving every heartfelt smile, tear of joy, and loving embrace.",
        portfolio_pictures = "https://cdn.create.vista.com/api/media/medium/116368304/stock-photo-married-couple-walking-in-the-city?token=|https://cdn.create.vista.com/api/media/medium/138947778/stock-photo-bride-and-groom-with-groomsmen-and-bridesmaids?token=|https://cdn.create.vista.com/api/media/medium/162041044/stock-photo-happy-kids-at-birthday-table?token="
    )
    ph4= Photographer(
        name="Cole Vasquez",
        zip_code = 61179,
        profile_picture="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        bio = "As a sport photographer, I live and breathe the adrenaline-fueled world of athletics through the lens of my camera. With an insatiable passion for both sports and photography, I've embarked on a thrilling journey to freeze moments of triumph, defeat, and pure emotion in the world of sports.",
        portfolio_pictures="https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2|https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2|https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2|https://images.pexels.com/photos/269948/pexels-photo-269948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    )
    ph5= Photographer(
        name = "Jennifer Sanchez",
        zip_code = 47106,
        profile_picture="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        bio = "Whether you're strolling through a sun-dappled park, savoring a quiet moment at home, or embarking on a new adventure, I am here to capture the magic and beauty of your life's journey. Together, let's create images that celebrate the richness and diversity of the human experience, one moment at a time.",
        portfolio_pictures="https://images.pexels.com/photos/888894/pexels-photo-888894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2|https://images.pexels.com/photos/1024963/pexels-photo-1024963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2|https://images.pexels.com/photos/1021145/pexels-photo-1021145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    )
    ph6 = Photographer(
        name="Angela Smith",
        zip_code=86873,
        profile_picture="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        bio="Whether you're seeking to document a special occasion or simply celebrate the beauty of everyday life, I invite you to join me on this journey of discovery and creativity. Together, let's capture the fleeting moments, the hidden gems, and the everyday miracles that make life truly extraordinary.",
        portfolio_pictures="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2|https://images.pexels.com/photos/14410563/pexels-photo-14410563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2|https://images.pexels.com/photos/14912472/pexels-photo-14912472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    )
    ph7= Photographer(
        name="Joseph Tran",
        zip_code=78680,
        profile_picture="https://images.pexels.com/photos/2589650/pexels-photo-2589650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        bio="Nature is my muse, a boundless wellspring of inspiration and wonder. Whether it's the golden light of dawn breaking over the horizon or the delicate beauty of a blooming flower, I find peace and inspiration in the natural world, and I seek to share that sense of wonder through my photography.",
        portfolio_pictures="https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2|https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2|https://images.pexels.com/photos/395196/pexels-photo-395196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    )

    # for _ in range(10):
    #     a= Photographer(
    #         name=fake.name(),
    #         zip_code=fake.postcode(),
    #         # profile_picture='',
    #         profile_picture=base64.b64encode(fake.image()),

    #         bio=fake.paragraph(),
    #         # portfolio_pictures='',
    #         portfolio_pictures=base64.b64encode(fake.image())
    #     )
    #     photographers.append(a)    
    photographers.append(ph1)
    photographers.append(ph2)
    photographers.append(ph3)
    photographers.append(ph4)
    photographers.append(ph5)
    photographers.append(ph6)
    photographers.append(ph7)

    return photographers
if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():        
        print("Starting seed...")
        # Seed code goes here!
        Photoshoot.query.delete()
        Photographer.query.delete()

        print('Seeding Photographers')
        photographers = create_photographers()
        db.session.add_all(photographers)
        db.session.commit()

            
                