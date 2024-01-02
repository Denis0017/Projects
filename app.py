from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import the CORS module
import json
from datetime import datetime as dt

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

class Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # Define other columns according to your JSON structure
    end_year = db.Column(db.Integer)  # Adjust the data type based on your needs
    intensity = db.Column(db.Integer)
    sector = db.Column(db.String(50))
    topic = db.Column(db.String(50))
    insight = db.Column(db.String(255))
    url = db.Column(db.String(255))
    region = db.Column(db.String(50))
    start_year = db.Column(db.Integer)  # Adjust the data type based on your needs
    impact = db.Column(db.String(255))
    added = db.Column(db.DateTime)  # Adjust the data type based on your needs
    published = db.Column(db.DateTime)  # Adjust the data type based on your needs
    country = db.Column(db.String(50))
    relevance = db.Column(db.Integer)
    pestle = db.Column(db.String(50))
    source = db.Column(db.String(50))
    title = db.Column(db.String(255))
    likelihood = db.Column(db.Integer)

    def serialize(self):
    # Add more attributes as needed
        return {
            'id': self.id,
            'end_year': self.end_year,
            'intensity': self.intensity,
            'sector': self.sector,
            'topic': self.topic,
            'insight': self.insight,
            'url': self.url,
            'region': self.region,
            'start_year': self.start_year,
            'impact': self.impact,
            'added': dt.strftime(self.added, '%B, %d %Y %H:%M:%S') if isinstance(self.added, dt) else None,
            'published': dt.strftime(self.published, '%B, %d %Y %H:%M:%S') if isinstance(self.published, dt) else None,
            'country': self.country,
            'relevance': self.relevance,
            'pestle': self.pestle,
            'source': self.source,
            'title': self.title,
            'likelihood': self.likelihood
        }



@app.route('/api/data', methods=['GET'])
def get_data():
    # Implement filtering logic based on query parameters
    # e.g., filter by end_year, topic, sector, region, etc.
    filters = {}
    for param in ['end_year', 'topic', 'sector', 'region', 'pestle', 'source']:
        if param in request.args:
            filters[param] = request.args[param]

    data = Data.query.filter_by(**filters).all()
    return jsonify([item.serialize() for item in data])

if __name__ == '__main__':
    # Load JSON data
    with open('jsondata.json', encoding='utf-8') as f:
        json_data = json.load(f)

    # Establish the Flask application context
    with app.app_context():
        for item in json_data:
            item['added'] = dt.strptime(item['added'], '%B, %d %Y %H:%M:%S') if item['added'] else None
            item['published'] = dt.strptime(item['published'], '%B, %d %Y %H:%M:%S') if item['published'] else None
            db.session.add(Data(**item))

        # Commit the changes to the database
        db.session.commit()

    # Run the Flask app
    app.run(debug=True)

