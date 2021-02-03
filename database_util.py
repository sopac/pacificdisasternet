import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
import pycountry

engine = create_engine('postgresql+psycopg2://postgres:erlang44@localhost/pdn', echo=False)
base = automap_base()
base.prepare(engine, reflect=True)
session = Session(engine)

#list tables
#for c in base.classes:
#    print(c)
count = 0
#assign country code to documents
def assign_country_code(base, session):    
    document = base.classes.document
    for d in session.query(document).order_by(document.id):
        if d.country.strip() != "":
            try:
                pc = pycountry.countries.search_fuzzy(d.country)[0]
                code = pc.alpha_3
                if d.country_code is not None:
                #print(code + " : " + d.country)
                    count = count + 1
                    d.country_code = code
                    session.commit()
            except:
                print("No Code Found")
                pass
    



def fix_titles(base, session):
    document = base.classes.document
    for d in session.query(document).order_by(document.id):
        title = str(d.title)
        if title.endswith(".rtf"):
            #count = count + 1
            #print(title)
            #title = title.replace("/home/sachin/Documents/DisasterPlans/", " ").strip().title()
            #prefix = title.split(" ")[0]
            #title = title.replace(prefix + " ", prefix.upper() + " ")
            #title = title.replace("Microsoft Word -", "").replace(".doc", "").strip()
            title = title.replace(".rtf", "")
            print(title)
            d.title = title
            session.commit()
    

def missing_files(base, session):
    pass


def remove_french_new_titles(base, session):
    document = base.classes.document
    for d in session.query(document).order_by(document.id):
        title = str(d.title)
        if title.startswith("Deuxieme Annonce et "):
            print(title)     
            session.delete(d)
            session.commit()



#assign_country_code(base, session)
#fix_titles(base, session)
remove_french_new_titles(base, session)

session.close()
print("Finished : " + str(count))