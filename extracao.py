import pandas as pd

df = pd.read_csv("C:/Users/gamer/Desktop/microdados_censo_escolar_2023/dados/microdados_ed_basica_2023.csv")

json_data = pd.to_json(orient="records", indent=4, force_ascii=False)

with open("C:/Users/gamer/Desktop/microdados_censo_escolar_2023/dados/microdados_ed_basica_2023.csv", "W", encoding="utf-8") as f:
    f.write(json_data)

print("Cloncluido!")