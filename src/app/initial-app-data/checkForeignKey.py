import ast
import re

# Open the log file
with open('logs.txt', 'r', encoding='utf8') as log_file:
    lines = log_file.readlines()

# Strip out the trailing newline characters
lines = [line.rstrip() for line in lines if line.rstrip() != '']

# Initialize an empty dictionary to store values
# and skip empty lines
values_dict = {}

# Define a dictionary to map stmt to table names
stmt_dict = {"A": "mapGroup", "B": "mode", "C": "map", "D": "location", "E": "locationContainedInMap"}

for i, line in enumerate(lines):
    if re.match(r'^[A-E]$', line):  # Matches 'A', 'B', 'C', 'D', 'E'
        print(f"Attempting to parse: {lines[i+3]}")  # Add this line
        values = ast.literal_eval(lines[i+3].strip()) # Use ast.literal_eval() instead of eval()

        # We need to chunk our values list into appropriate sublists
        if line in ['A', 'B']:  # For these, the values are individual items
            pass
        elif line == 'C':  # For 'C', we have groups of 4
            values = [values[n:n+4] for n in range(0, len(values), 4)]
        elif line == 'D':  # For 'D', we have groups of 2
            values = [values[n:n+2] for n in range(0, len(values), 2)]

        # Now we only store the first value from each group, which seems to be the key value
        values_dict[stmt_dict[line]] = [item[0] for item in values]

for key in values_dict:
    # Check for possible violations
    if key == "map":
        mapGroupNames = [value[1] for value in values_dict[key]]
        if not all(mapGroupName in values_dict["mapGroup"] for mapGroupName in mapGroupNames):
            print(f"Possible FOREIGN KEY violation in stmt '{key}': mapGroupName not in mapGroup")

    elif key == "locationContainedInMap":
        locationNames = [value[0] for value in values_dict[key]]
        mapNames = [value[1] for value in values_dict[key]]
        if not all(locationName in values_dict["location"] for locationName in locationNames):
            print(f"Possible FOREIGN KEY violation in stmt '{key}': locationName not in location")
        if not all(mapName in values_dict["map"] for mapName in mapNames):
            print(f"Possible FOREIGN KEY violation in stmt '{key}': mapName not in map")
