import pandas as pd
import pymongo
import json


client = pymongo.MongoClient("mongodb://root:root@localhost:27017")
db = client["solita"]
collection = db["trips"]
#collection = db["places"]
df= pd.read_csv('2021-07.csv')
#df = pd.read_csv('Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat_avoin.csv')
df = df.rename(columns={'Covered distance (m)':'Covered_distance_m'   ,"Duration (sec.)": "Duration_sec"})
data = df.to_dict(orient="records")
valid_data =[]

for record in data:
    if record['Covered_distance_m'] > 10 and record['Duration_sec'] > 10:
       valid_data.append(record)
if valid_data:
    print(len(valid_data))
    collection.insert_many(valid_data)    