#!/usr/bin/env python

# server.py
# This script launch a server that will wait GET request and
# sockets to exchange informations with the Dispox Terminal and 
# rabbitmq script
# By Sanix Darker

async_mode = None

import time
import flask
from flask import Flask, render_template, request
import sqlite3

import json
# j = json.loads('{"one" : "1", "two" : "2", "three" : "3"}')

DATABASE = "/home/Sanix/Python-SQLite-API/data/lost.db"

app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = "My precious"

# app.config['DATABASE'] = 'secret!'
# thread = None

table = "lost"
db = sqlite3.connect(app.config['DATABASE'])
db.row_factory = sqlite3.Row
print('Creating table '+str(table))
db.execute('DROP TABLE IF EXISTS '+str(table))
db.execute('CREATE TABLE ' + str(table) + ' ( image text, categorie text, adresse text, lat text, lng text, description text, type text )')
print('Table created')

def init(table):
    db = sqlite3.connect(app.config['DATABASE'])
    db.row_factory = sqlite3.Row
    print('Creating table '+str(table))
    db.execute('DROP TABLE IF EXISTS '+str(table))
    db.execute('CREATE TABLE ' + str(table) + ' ( image text, categorie text, adresse text, lat text, lng text, description text, type text )')
    print('Table created')

# def insert(table, row):
#     db.execute('INSERT INTO ' + str(table) + ' (t1, i1) VALUES (?, ?)', (row['t1'], row['i1']))
#     db.commit()

# def get(table, t1):
#     cursor = db.execute('SELECT * FROM ' + str(table) + ' WHERE t1 = ?', (t1,))
#     return cursor.fetchone()

# def update(table, row):
#     db.execute('UPDATE ' + str(table) + ' SET i1 = ? WHERE t1 = ?', (row['i1'], row['t1']))
#     db.commit()

# def delete(table, t1):
#     db.execute('DELETE FROM ' + str(table) + ' WHERE t1 = ?', (t1,))
#     db.commit()

# def getAll(table):
#     to_return = ""
#     cursor = db.execute('SELECT * FROM ' + str(table))
#     i = 0
#     for row in cursor:
#         if (i >= 1):
#            to_return = to_return + ','
#         to_return = to_return + '{"image":"{}", "categorie":"{}", "adresse":"{}", "lat":"{}", "lng":"{}", "description":"{}", "type":"{}"}'.format(row['image'], row['categorie'], row['adresse'], row['lat'], row['lng'], row['description'], row['type'])
#         print(to_return)
#         i = i + 1
#     return to_return

@app.route('/')
def index():
    response = flask.jsonify({'message': 'Welcome to lost API'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api')
def api():
    response = flask.jsonify({'message': 'Welcome to lost API', "error":"Any model selected"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/lost', methods=['GET'])
def api1():
    method = request.args.get('method')

    db = sqlite3.connect(app.config['DATABASE'])
    db.row_factory = sqlite3.Row
    to_return = ""
    print (str(request.args))
    if(method == "getall"):
        cursor = db.execute('SELECT * FROM lost')
        i = 0
        for row in cursor:
            if (i >= 1):
                to_return = to_return + ','
            # to_return = str(row["image"])
            to_return = to_return + '{\"image\":\"' + str(row["image"]) + '\", \"categorie\":\"' + str(row["categorie"]) + '\", \"adresse\":\"' + str(row["adresse"]) + '\", \"lat\":\"' + str(row["lat"]) + '\", \"lng\":\"' + str(row["lng"]) + '\", \"description\":\"' + str(row["description"]) + '\", \"type\":\"' + str(row["type"]) + '\"}'
            print(to_return)
            i = i + 1
        response = flask.jsonify({'status': 'success', "data": json.loads("["+str(to_return)+"]")})

    elif(method == "get"):
        image = request.args.get('image')
        lat = request.args.get('lat')
        lng = request.args.get('lng')

        cursor = db.execute('SELECT * FROM lost WHERE `image` = ? AND lat=? AND lng=?', (image, lat, lng))
        i = 0
        for row in cursor:
            if (i >= 1):
                to_return = to_return + ','
            # to_return = str(row["image"])
            to_return = to_return + '{\"image\":\"' + str(row["image"]) + '\", \"categorie\":\"' + str(row["categorie"]) + '\", \"adresse\":\"' + str(row["adresse"]) + '\", \"lat\":\"' + str(row["lat"]) + '\", \"lng\":\"' + str(row["lng"]) + '\", \"description\":\"' + str(row["description"]) + '\", \"type\":\"' + str(row["type"]) + '\"}'
            print(to_return)
            i = i + 1
        response = flask.jsonify({'status': 'success', "data": json.loads("["+str(to_return)+"]")})

    elif(method == "post"):
        image = request.args.get('image')
        categorie = request.args.get('categorie')
        adresse = request.args.get('adresse')
        lat = request.args.get('lat')
        lng = request.args.get('lng')
        description = request.args.get('description')
        type_ = request.args.get('type')

        db.execute('INSERT INTO lost (`image`, categorie, adresse, lat, lng, `description`, `type`) VALUES (?, ?, ?, ?, ?, ?, ?)', (image, categorie, adresse, lat, lng, description, type_))
        db.commit()

        cursor = db.execute('SELECT * FROM lost WHERE `image` = ? AND lat=? AND lng=?', (image, lat, lng))
        row = cursor.fetchone()
        to_return = '{\"image\":\"' + str(row["image"]) + '\", \"categorie\":\"' + str(row["categorie"]) + '\", \"adresse\":\"' + str(row["adresse"]) + '\", \"lat\":\"' + str(row["lat"]) + '\", \"lng\":\"' + str(row["lng"]) + '\", \"description\":\"' + str(row["description"]) + '\", \"type\":\"' + str(row["type"]) + '\"}'
        response = flask.jsonify({'status': 'success', "data": json.loads("["+str(to_return)+"]")})
    # elif(method == "put"):

    elif(method == "delete"):
        image = request.args.get('image')
        lat = request.args.get('lat')
        lng = request.args.get('lng')
        db.execute('DELETE FROM lost WHERE `image` = ? AND lat=? AND lng=?', (image, lat, lng))
        db.commit()
        response = flask.jsonify({'status': 'success', "message": "This lost have been deleted"})
    else:
        response = flask.jsonify({'status': 'error', "reason": "Specify the method"})

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/control', methods=['GET', 'POST'])
def control():
    return render_template('control.html')

def main():
    # init("lost")
    # table = "lost"
    # db = sqlite3.connect(app.config['DATABASE'])
    # db.row_factory = sqlite3.Row
    # print('Creating table '+str(table))
    # db.execute('DROP TABLE IF EXISTS '+str(table))
    # db.execute('CREATE TABLE ' + str(table) + ' ( image text, categorie text, adresse text, lat text, lng text, description text, type text )')
    # print('Table created')
    # print('Create rows')
    # insert(db, dict(t1 = 'one', i1 = 1))
    # insert(db, dict(t1 = 'two', i1 = 2))
    # insert(db, dict(t1 = 'three', i1 = 3))
    # insert(db, dict(t1 = 'four', i1 = 4))
    # disp_rows(db)

    # print('Retrieve rows')
    # print(dict(get(db, 'one')), dict(get(db, 'two')))

    # print('Update rows')
    # update(db, dict(t1 = 'one', i1 = 101))
    # update(db, dict(t1 = 'three', i1 = 103))
    # disp_rows(db)

    # print('Delete rows')
    # delete(db, 'one')
    # delete(db, 'three')
    # disp_rows(db)
    app.run(host="0.0.0.0")

if __name__ == "__main__": main()