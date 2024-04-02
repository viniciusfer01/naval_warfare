# Naval Warfare

## Description

This is a multiplayer naval warfare game. The game is played on a 10x10 grid. Each player has 5 ships to place on the grid. The ships are: Carrier (5 spaces), Battleship (4 spaces), Cruiser (3 spaces), Submarine (3 spaces), and Destroyer (2 spaces). The players take turns guessing the location of the other player's ships. The game ends when all of one player's ships have been sunk.

## How to Play

Open two instances of the client in your browser. Then try to guess where the other
player's ships are located. The game will tell you if you hit or missed. The game ends when all of one player's ships have been sunk.

## How to Run

cd into the server directory and run the following commands:

```
# Install dependencies
$ npm install

# Start the server
$ npm start
```

cd into the client directory and run the following commands:

```
# Install dependencies
$ npm install / yarn

# Start the server
$ npm start / yarn dev
```

Then navigate to `http://localhost:port/` in your browser.
the port number will be displayed in the terminal where you started the client.
