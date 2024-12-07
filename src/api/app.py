from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open('data.json') as f:
    slates = json.load(f)

@app.route('/operators', methods=['GET'])
def get_unique_operators():
    operators = [slate['operator'] for slate in slates]
    unique_operators = list(set(operators))
    return jsonify(unique_operators)

@app.route('/gameTypes', methods=['GET'])
def get_unique_gameTypes():
    # Get the operator from query params
    operator = request.args.get('operator')
    if not operator:
        return jsonify({"error": "Operator parameter is required"}), 400

    # Find all gameType values for the given operator
    game_types = [slate['operatorGameType'] for slate in slates if slate['operator'] == operator]

    # Get unique gameTypes
    unique_game_types = list(set(game_types))

    return jsonify(unique_game_types)

@app.route('/operatorNames', methods=['GET'])
def get_unique_operatorNames():
    # Get operator and gameType from query params
    operator = request.args.get('operator')
    operator_game_type = request.args.get('operatorGameType')

    # Ensure both parameters are provided
    if not operator or not operator_game_type:
        return jsonify({"error": "Both operator and operatorGameType parameters are required"}), 400

    # Find all operatorName values for the given operator and operatorGameType
    operator_names = [
        slate['operatorName'] for slate in slates
        if slate['operator'] == operator and slate['operatorGameType'] == operator_game_type
    ]

    # Get unique operatorNames
    unique_operator_names = list(set(operator_names))

    return jsonify(unique_operator_names)

@app.route('/players', methods=['GET'])
def get_dfsSlatePlayers():
    operator = request.args.get('operator')
    operator_game_type = request.args.get('operatorGameType')
    operator_name = request.args.get('operatorName')
    page_number = request.args.get('page', default=1, type=int)
    page_size = request.args.get('offset', default=10, type=int)

    if not operator or not operator_game_type or not operator_name:
        return jsonify({"error": "Operator, operatorGameType, and operatorName parameters are required"}), 400

    matching_slate = next((
        slate for slate in slates
        if slate['operator'] == operator and slate['operatorGameType'] == operator_game_type and slate['operatorName'] == operator_name
    ), None)

    if matching_slate:
        # Pagination logic
        total_players = len(matching_slate['dfsSlatePlayers'])
        start_index = (page_number - 1) * page_size
        end_index = start_index + page_size
        dfs_slate_players_filtered = [
            {"id": player['slatePlayerId'], "name": player['operatorPlayerName'], "team": player['team'], "position": player['operatorPosition'], "salary": player['operatorSalary'], "fantasyPoints": player.get('fantasyPoints', 0)}
            for player in matching_slate['dfsSlatePlayers'][start_index:end_index]
        ]
        return jsonify({
            "total_count": total_players,  # Add total count of players
            "players": dfs_slate_players_filtered
        })
    else:
        return jsonify({"error": "No matching slate found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
