import psycopg2

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

    sqlList = []

    cursor.execute('SELECT "Id", "Date", "Year" FROM pdalo;')
    for r in cursor:
        print(r)
        year = r[1].split("/")[0].strip()
        print(year)
        sql = 'UPDATE pdalo SET "Year"=' + year + ' WHERE "Id"=' + str(r[0]) 
        sqlList.append(sql)
        #print(sql)

    #update
    for sql in sqlList:
        cursor.execute(sql)
        connection.commit()
    


except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL", error)
finally:
    # closing database connection.
    if(connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
