import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('anystudy')
majors = db.get_collection('majors')


URL = 'https://www.cornell.edu/academics/fields.cfm'
r = requests.get(URL)

soup = BeautifulSoup(r.content, 'html5lib')

majorSoup = soup.findAll('a', attrs={'aria-describedby': 'majors'})
schoolSoup = list(filter(lambda a: a.attrs != {
                  'aria-describedby': 'majors'}, soup.findAll('td')))

for i in range(len(majorSoup)):
    major = majorSoup[i].text
    school = list(filter(lambda x: x != '',
                  schoolSoup[i].text.strip().replace('\t', '').split('\n')))
    majors.insert_one({"major": major, "college": school})
