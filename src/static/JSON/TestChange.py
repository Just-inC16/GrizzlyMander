import json
import random
import time

a_file = open("./SampleTableData.json", "r")
json_object = json.load(a_file)
a_file.close()
    
for i in range(1):
    json_object[0]["col2"] = round(random.uniform(0, float(json_object[0]["col3"])), 2)
    json_object[1]["col2"] = random.randint(int(json_object[1]["col3"]), 3)
    json_object[2]["col2"] = round(random.uniform(0, float(json_object[2]["col3"])), 2)
    json_object[3]["col2"] = random.randint(3, int(json_object[3]["col3"]))
    a_file = open("./SampleTableData.json", "w")
    json.dump(json_object, a_file)
    a_file.close()
    time.sleep(1)