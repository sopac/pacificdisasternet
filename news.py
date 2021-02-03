import urllib.request
import json
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
import urllib


import pycountry
from sqlalchemy.sql.functions import count


Base = declarative_base()


class News(Base):
    __tablename__ = 'news'
    id = Column(Integer, primary_key=True, autoincrement=True)
    source_id = Column(Integer)
    title = Column(String)
    url = Column(String)
    country = Column(String)
    country_code = Column(String)
    date = Column(String)
    source = Column(String)


engine = create_engine(
    'postgresql+psycopg2://postgres:erlang44@localhost/pdn', echo=False)
Base.metadata.create_all(engine)
session = Session(engine)

# clear table
session.query(News).delete()


countries = ["Fiji", "Tonga", "Vanuatu", "Papua New Guinea", "Niue", "Solomon Islands", 'French Polynesia',"New Caledonia", "Palau", "Marshall Islands", "Kiribati", "Micronesia (Federated States of) (Micronesia)", "Samoa", "Tokelau", "Tuvalu"]

country = countries[0]

for c in countries:
    print(c)
    url = "https://api.reliefweb.int/v1/reports?appname=rwint-user-0&profile=list&preset=latest&slim=1&query[value]=" + urllib.parse.quote(
        c) + "&query[operator]=AND"

    with urllib.request.urlopen(url) as f:
        data = json.load(f)
        for d1 in data["data"]:
            id = d1.get("id")
            title = d1['fields'].get('title')
            url = d1['fields'].get('url')
            country = d1['fields'].get('primary_country').get("name")
            date_str = d1['fields'].get('date').get("created")
            source = d1['fields'].get('source')[0].get("name")
            if str(country).lower() != "world":
                country_code = "FJI"
                try:
                    c1 = pycountry.countries.search_fuzzy(country)[0]
                    country_code = c1.alpha_3
                except:
                    pass
                # print(d1['fields'].get('source')[0].get("name"))
                n = News(source_id=id, title=title, url=url, country=country,
                         date=date_str, source=source, country_code=country_code)
                session.add(n)
                session.commit()

# cleanup
session.close()
print("News Imported.")
