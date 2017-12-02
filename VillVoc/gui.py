from flask import Flask
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
import json
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'


def oxford_part_of_speech(word):
    http = urllib3.PoolManager()
    # r = http.request('GET', 'http://www.khanacademy.org')
    # print(r.data.decode("utf-8"))

    app_id = '98fb53c8'
    app_key = '958cabdbdf0e85c68812191facf199af'

    language = 'en'
    word_id = word

    url = 'https://od-api.oxforddictionaries.com:443/api/v1/inflections/' + language + '/' + word_id.lower()
    r = http.request('GET', url, headers = {'app_id': app_id, 'app_key': app_key})
    response = json.loads(r.data.decode("utf-8"))
    results = response["results"]
    parts_of_speech = []
    for i in results:
        for j in i["lexicalEntries"]:
            parts_of_speech.append({"part": j["lexicalCategory"], "word": j["inflectionOf"][0]["text"]})

    print(word_id)
    print("PARTS OF SPEECH")
    for i in range(len(parts_of_speech)):
        print("\t%d. %s" % (i + 1, parts_of_speech[i]["part"]))
    return parts_of_speech[0]["word"]


def oxford_define(word):
    http = urllib3.PoolManager()
    # r = http.request('GET', 'http://www.khanacademy.org')
    # print(r.data.decode("utf-8"))

    app_id = '98fb53c8'
    app_key = '958cabdbdf0e85c68812191facf199af'

    language = 'en'
    word_id = word

    url = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/' + language + '/' + word_id.lower()
    r = http.request('GET', url, headers={'app_id': app_id, 'app_key': app_key})
    response = json.loads(r.data.decode("utf-8"))
    definitions = []
    for i in response["results"]:
        for y in i["lexicalEntries"]:
            for x in y["entries"]:
                for j in x["senses"]:
                    for k in j["definitions"]:
                        definitions.append(k)
    print("FROM OXFORD:")
    for i in range(len(definitions)):
        print("\t%d. %s" % (i + 1, definitions[i]))
    return definitions


def oxford_sentences(word):
    http = urllib3.PoolManager()
    # r = http.request('GET', 'http://www.khanacademy.org')
    # print(r.data.decode("utf-8"))

    app_id = '98fb53c8'
    app_key = '958cabdbdf0e85c68812191facf199af'

    language = 'en'
    word_id = word

    url = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/' + language + '/' + word_id.lower()
    r = http.request('GET', url, headers={'app_id': app_id, 'app_key': app_key})
    response = json.loads(r.data.decode("utf-8"))
    print(response)

is_word = False
word = ""
try:
    word = oxford_part_of_speech(input("Input a word: "))
    is_word = True
except:
    print("Word not found")

if is_word:
    try:
        print("DEFINITIONS")
        oxford_define(word)
    except:
        print("No definitions from Oxford were found!")

    try:
        print("SENTENCES")
        oxford_sentences(word)

    except:
        print("No sentences found")

