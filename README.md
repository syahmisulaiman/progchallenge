# Random Objects Generator & Classifier

## Prerequisite
- Node.js
- Docker 

## Running Local
1. Install dependencies (if needed):
   ```sh
   npm install
   ```
2. Run the script:
   ```sh
   node script.js
   ```
3. Check the output files:
   - `random_objects.txt` (Generated random objects)
   - `processed_output.txt` (Classified objects)

## Running w Docker
1. Build the Docker image:
   ```sh
   docker build -t my-random-objects .
   ```
2. Run the container:
   ```sh
   docker run --rm my-random-objects
   ```
3. To save processed files on the host machine:
   ```sh
   docker run --rm -v $(pwd)/output:/app/output my-random-objects
   ```
   The processed output will be available in the `output` folder.

