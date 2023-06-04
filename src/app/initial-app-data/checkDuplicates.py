import re

# Open and read the file
with open(r"C:\Users\folsz\Ionic\GeoChamp\geo-champ\src\app\initial-app-data\locations.ts", "r") as file:
    content = file.readlines()

# Pattern to match the locations in your file
pattern = re.compile(r"new InitialAppLocation\('(.+?)',")

# Keep track of all locations
locations = []

# Iterate over each line in the file
for line in content:
    # If line is not commented out
    if not line.strip().startswith("//"):
        match = pattern.search(line)
        if match:
            # Append the location name to the list
            locations.append(match.group(1))

# Check for duplicates
duplicates = set([loc for loc in locations if locations.count(loc) > 1])

print(f"Duplicates: {duplicates}")
