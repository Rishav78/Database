import json, sys, re, os

def read_in():
    info = sys.argv[1]
    return json.loads(info)

def read_files(location, query):
    files = get_files(location+'/structure.txt', query)
    records = '{"records": [';
    for file in files:
        records = records + read_file(location+'/records/'+str(file)+'.txt')
    records = re.sub('\n$|,$', '', records) + ']}'
    records = json.loads(records)
    return filter(records['records'], query)

def filter(records, query):
    sc = query['selectedColumns']
    if('where' in query): 
        where = query['where']
        records = filter_rows(records, where)
    if(len(sc)>0): records = filter_columns(records, sc)
    
    return records

def filter_columns(records, sc):
    for i in records:
        keys = list(i.keys())
        for j in keys:
            if j not in sc:
                del i[j]
    return records

def filter_rows(records, where):
    rl = len(records)
    i=0
    while i!=rl:
        flag=0
        for j in where:
            if(records[i][j]!=where[j]):
                del records[i]
                flag=1
                rl = rl - 1
        else:
            if(not flag):
                i = i + 1
    return records

def read_file(location):
    file = open(location)
    file = file.read()
    return file

def get_files(location, query):
    file = json.loads(read_file(location))
    if 'where' in query:
        return indexes(file['files'], query['where'])
    files = file['files']
    files.append(file['active'])
    return files

def indexes(files, where):
    if 'ID' in where:
        return [primary_index(files,where['ID'])]

def primary_index(files, value):
    i = len(files) - 1;
    while files[i]>value:
        i = i-1
    return files[i]

def join(query, location):
    records = []
    tj1 = query['join']['on'][query['table']]
    tj2 = query['join']['on'][query['join']['table']]
    tables = {
        query['table']: read_files(location+'/'+query['table'], query),
        query['join']['table']: read_files(location+'/'+query['join']['table'], query) 
    }
    for i in tables[query['table']]:
        for j in tables[query['join']['table']]:
            if(i[tj1] == j[tj2]):
                records.append({**i, **j})
    return filter(records, query)


def main():
    info = read_in()
    if 'join' not in info['query']:
        print(json.dumps(read_files(info['location']+'/'+info['query']['table'], info['query'])))
    else:
        print(json.dumps(join(info['query'], info['location'])))

if __name__ == '__main__':
    main()