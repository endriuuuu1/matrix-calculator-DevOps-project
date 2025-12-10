from flask import Flask, request, jsonify, render_template
from matrix import Matrix
import sys
import os
sys.path.append(os.getcwd())



app = Flask(__name__)

@app.route('/')
def index():
    return "Matrix API is Running"

if __name__ == '__main__':
    app.run(debug=True)