import csv
import json

csv_path = "microdados_ed_basica_2023.csv"
json_path = "microdados_paraiba.json"

instituicoes_pb = []

col_nome_ie = "NO_ENTIDADE"
col_matriculas = "QT_MAT_BAS"
col_cod_uf = "CO_UF"
col_nome_uf = "SG_UF"
col_municipio = "NO_MUNICIPIO"
col_mesorregiao = "CO_MESORREGIAO"
col_microrregiao = "NO_MICRORREGIAO"

with open(csv_path, mode="r", encoding="latin1") as f:
    reader = csv.DictReader(f, delimiter=";")
    for row in reader:
        if row[col_nome_uf].upper() == "PB":
            instituicao = {
                "nome_instituicao": row[col_nome_ie],
                "total_matriculas_basico": row[col_matriculas],
                "codigo_uf": row[col_cod_uf],
                "nome_uf": row[col_nome_uf],
                "municipio": row[col_municipio],
                "mesorregiao": row[col_mesorregiao],
                "microrregiao": row[col_microrregiao],
            }
            instituicoes_pb.append(instituicao)

# Salvar lista em JSON
with open(json_path, mode="w", encoding="utf-8") as f:
    json.dump(instituicoes_pb, f, indent=4, ensure_ascii=False)

print(f"{len(instituicoes_pb)} instituições da Paraíba exportadas para {json_path}")
