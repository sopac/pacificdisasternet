import os
from PyPDF2 import PdfFileReader
from datetime import datetime
import pycountry
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base

#folder = "/home/sachin/Documents/VLIB/"
folder = "/home/sachin/Documents/DisasterPlans/"

def get_country(file_name, title):
    country = "Pacific Region"
    for c in pycountry.countries:
        if c.name in file_name.replace("-", " ").replace("_", " ") or c.name in title.replace("-", " ").replace("_", " "):
            country = c.name
        if country == "Pacific Region":
            code = " " + getattr(c, 'official_name', '') + " "
        # print(code),                #if code in file_name.replace("-", " ").replace("_", " ") or code in title.replace("-", " ").replace("_", " "):,                #    country = c.nameif country == "Pacific Region":
            code = " " + c.alpha_2 + " "
            if code in file_name.replace("-", " ").replace("_", " ") or code in title.replace("-", " ").replace("_", " "):
                country = c.name
        if country == "Pacific Region":
            code = " " + c.alpha_3 + " "
            if code in file_name.replace("-", " ").replace("_", " ") or code in title.replace("-", " ").replace("_", " "):
                country = c.name
        country_code_1 = "FSM"
        country_1 = "Federated States of Micronesia"
        if country_code_1 in file_name.replace("-", " ").replace("_", " ") or country_code_1 in title.replace("-", " ").replace("_", " "):
            country = country_1
        if country_1 in file_name.replace("-", " ").replace("_", " ") or country_1 in title.replace("-", " ").replace("_", " "):
            country = country_1
        country_1 = "Solomon"
        if country_1 in file_name.replace("-", " ").replace("_", " ") or country_1 in title.replace("-", " ").replace("_", " "):
            country = "Solomon Islands"

    return country


# db setup
engine = create_engine(
    'postgresql+psycopg2://postgres:erlang44@localhost/pdn', echo=False)
base = automap_base()
base.prepare(engine, reflect=True)
session = Session(engine)


def get_info(path):
    with open(path, 'rb') as f:
        print(f)
        pdf = PdfFileReader(f)        
        info = pdf.getDocumentInfo()
        file_name = f.name
        #number_of_pages = pdf.getNumPages()
        author = ""
        try:
            author = info.author
        except:
            pass
        #creator = info.creator
        #producer = info.producer
        subject = ""
        try:
            subject = info.subject
        except:
            pass
        title = ""
        try:
            title = info.title
        except:
            pass
        date_raw = "20150101142437+1300"
        try:
            date_raw = info['/CreationDate']
            date_raw = date_raw.replace("'", "")
            date_raw = date_raw.replace("D:", "")
            date_raw = date_raw.replace("0000", "")
        except:
            pass
        print(date_raw)
        date = datetime.strptime("20150101", "%Y%m%d")
        try:
            date = datetime.strptime(date_raw, "%Y%m%d%H%M%S%z")
        except ValueError:
            date = datetime.strptime("20150101", "%Y%m%d")
        #date = str(date).split(" ")[0]
        file_size = os.path.getsize(path)

        if title is None:
            title = file_name.replace('.pdf', '').replace(
                "-", " ").replace("_", " ")

        # country
        country = get_country(file_name, title)

        # process
        keywords = ['disaster', 'hazard', 'risk', 'vulnerability', 'climate']
        list = []
        for k in keywords:
            #if k in file_name.lower() or k in title:
                if fn not in list:
                    list.append(fn)
                    print(country + " - " + fn + " - " + str(date))

                    #store in db
                    Document = base.classes.document
                    country_code = "PIC"
                    try:
                        c1 = pycountry.countries.search_fuzzy(country)[0]
                        country_code = c1.alpha_3
                    except:
                        pass
                    series = "Disaster Action Plans"
                    doc = Document(title=title, filename=fn, authors=author, description=subject, filesize=file_size, generalnote=subject, uploaddate=date,
                                   publicationyear=date.year, publicationmonth=date.month, publicationday=date.day, country=country, country_code=country_code, series = series)
                    session.add(doc)
                    session.commit()


#main
entries = os.scandir(folder)
for file in entries:
    fn = file.name
    if (fn.endswith(".pdf")):
        get_info(folder + fn)

#cleanup
session.close()
print("Finished.")