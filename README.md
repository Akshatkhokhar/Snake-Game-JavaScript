🐍 Snake Game (Vanilla JavaScript)

A classic Snake Game built from scratch using pure HTML, CSS, and JavaScript.
No frameworks. No libraries. Just clean logic, proper state management, and a focus on fundamentals.

This project demonstrates game loops, grid-based movement, collision detection, timer handling, and persistent scoring.

🚀 Features

🎮 Grid-based Snake movement

🐍 Distinct snake head with direction-aware design

🍎 Random food generation

📈 Score system (+10 points per food)

🏆 Persistent High Score (saved using localStorage)

⏱ Live game timer (starts/stops with game)

💀 Game-over detection (wall & self collision)

🔁 Restart game functionality

⌨️ Keyboard controls (Arrow keys)

🛠️ Tech Stack

HTML – Structure

CSS – Layout & styling

JavaScript (Vanilla) – Game logic & state management

No external libraries or frameworks were used.

🎮 Controls
Key	Action
⬆️ Arrow Up	Move Up
⬇️ Arrow Down	Move Down
⬅️ Arrow Left	Move Left
➡️ Arrow Right	Move Right
⏱ Timer Logic (How it Works)

Timer starts when the game starts

Updates every second

Stops immediately on game over

Resets on restart

Displayed in mm:ss format

Timer logic is separated from rendering logic to avoid bugs and timing drift.

🧠 Game Logic Overview

The snake moves using a fixed interval game loop

The snake’s head position is calculated before every move

Collisions are checked before rendering

Food consumption increases score and snake length

High score is stored using localStorage

Game state resets cleanly on restart

📂 Project Structure
snake-game/
│
├── index.html
├── style.css
├── script.js
└── README.md

▶️ How to Run Locally

Clone the repository

Open index.html in your browser
(No server required)

That’s it.

📌 Why This Project Matters

This project was built to:

Strengthen JavaScript fundamentals

Understand real-time game loops

Practice clean state management

Avoid dependency-based shortcuts

Everything here is intentional.

🔮 Possible Improvements

Speed increase with score or time

Pause / Resume feature

Mobile swipe controls

Sound effects

Dark / Light theme toggle

👤 Author

Built by Akshat
Focused on learning by building — not copying.
