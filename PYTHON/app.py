import json

json_path = "microdados_paraiba.json"

with open(json_path, "r", encoding="utf-8") as f:
    dados = json.load(f)

total = len(dados)

print("quantidade de instituições: ", total)