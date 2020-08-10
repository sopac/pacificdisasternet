import feedparser
import psycopg2

NewsFeed = feedparser.parse("https://www.gdacs.org/xml/rss_7d.xml")
print(len(NewsFeed.entries))

entry = NewsFeed.entries[1]

print(entry.keys())

countries = ["Fiji", "Tonga", "Vanuatu", "Papua New Guinea", "Guam", "Niue", "Solomon Islands", "New Caledonia", "Palau", "Marshall Islands"]

for e in NewsFeed.entries:
    for c in countries:
        if e.gdacs_country == c:
            print(e.title)
            print(e.gdacs_country)


try:
    connection = psycopg2.connect(user="postgres",
                                  password="erlang44",
                                  host="localhost",
                                  port="5432",
                                  database="pdn")

    cursor = connection.cursor()

    # Print PostgreSQL version
    cursor.execute("SELECT version();")
    record = cursor.fetchone()
    print("Connected PostgreSQL - ", record, "\n")

    cursor.execute("DELETE from recent_alerts")
    connection.commit()

    id =1000
    for e in NewsFeed.entries:
        for c in countries:
            if e.gdacs_country == c:
                print(e.title)
                print(e.summary)
                postgres_insert_query = """ INSERT INTO public.recent_alerts (id, title, summary, gdacs_country, gdacs_eventtype, gdacs_eventid) VALUES (%s,%s,%s,%s,%s,%s)"""
                record_to_insert = (id, str(e.title), str(e.summary),  str(e.gdacs_country), str(e.gdacs_eventtype), str(e.gdacs_eventid))
                id = id + 1
                cursor.execute(postgres_insert_query, record_to_insert)
   
    connection.commit()
    count = cursor.rowcount
    print(count, "Alerts Updated ")

except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL", error)
finally:
    # closing database connection.
    if(connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
