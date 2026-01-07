// Main TypeScript file for 10 Simple Games Collection
console.log('Welcome to 10 Simple Games!');

// Type definitions for better maintainability
interface Game {
  id: string;
  name: string;
  description: string;
  htmlFile: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

// Game list configuration - Easy to add/remove games
const games: Game[] = [
  {
    id: '2048',
    name: '2048',
    description: 'Ghép các ô số để tạo thành 2048. Game puzzle gây nghiện!',
    htmlFile: '2048.html',
    icon: '🎮',
    difficulty: 'Medium',
    category: 'Puzzle',
  },
  {
    id: 'snake',
    name: 'Snake',
    description: 'Game rắn săn mồi cổ điển. Ăn táo và tránh va vào tường!',
    htmlFile: 'snake.html',
    icon: '🐍',
    difficulty: 'Easy',
    category: 'Arcade',
  },
  {
    id: 'tic-tac-toe',
    name: 'Tic Tac Toe',
    description: 'Trò chơi O-X cổ điển. Chơi với bạn bè hoặc máy!',
    htmlFile: 'tic-tac-toe.html',
    icon: '⭕',
    difficulty: 'Easy',
    category: 'Strategy',
  },
  {
    id: 'memory-cards',
    name: 'Memory Cards',
    description: 'Lật thẻ và tìm các cặp giống nhau. Test trí nhớ của bạn!',
    htmlFile: 'memory-cards.html',
    icon: '🃏',
    difficulty: 'Medium',
    category: 'Memory',
  },
  {
    id: 'flappy-bird',
    name: 'Flappy Bird',
    description: 'Bay qua các ống nước. Đơn giản nhưng khó master!',
    htmlFile: 'flappy-bird.html',
    icon: '🐦',
    difficulty: 'Hard',
    category: 'Arcade',
  },
];

// DOM manipulation with TypeScript
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  if (app) {
    app.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
        <!-- Header -->
        <header class="bg-white/10 backdrop-blur-md shadow-lg">
          <div class="max-w-7xl mx-auto px-4 py-6">
            <h1 class="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
              🎮 10 Simple Games Collection
            </h1>
            <p class="text-white/90 text-center mt-2 text-lg">
              Tập hợp các game HTML5 đơn giản và vui nhộn
            </p>
          </div>
        </header>

        <!-- Games Grid -->
        <main class="max-w-7xl mx-auto px-4 py-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${games
              .map(
                (game) => `
              <div class="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <!-- Game Icon/Header -->
                <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
                  <div class="text-6xl mb-2">${game.icon}</div>
                  <h2 class="text-2xl font-bold text-white">${game.name}</h2>
                </div>
                
                <!-- Game Info -->
                <div class="p-6">
                  <p class="text-gray-600 mb-4 min-h-[60px]">${
                    game.description
                  }</p>
                  
                  <!-- Tags -->
                  <div class="flex gap-2 mb-4 flex-wrap">
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      ${game.category}
                    </span>
                    <span class="px-3 py-1 ${
                      game.difficulty === 'Easy'
                        ? 'bg-green-100 text-green-700'
                        : game.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    } rounded-full text-sm font-medium">
                      ${game.difficulty}
                    </span>
                  </div>
                  
                  <!-- Play Button -->
                  <button 
                    class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    data-game-html="${game.htmlFile}"
                    data-game-name="${game.name}"
                  >
                    🎯 Chơi ngay
                  </button>
                </div>
              </div>
            `
              )
              .join('')}
          </div>

          <!-- Footer Info -->
          <div class="mt-12 text-center">
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 inline-block">
              <p class="text-white text-lg font-semibold">
                📊 Tổng số game: <span class="text-yellow-300">${
                  games.length
                }</span>
              </p>
              <p class="text-white/80 mt-2">
                Được xây dựng với ❤️ bằng HTML, TypeScript & Tailwind CSS
              </p>
            </div>
          </div>
        </main>
      </div>
    `;
  }

  // Event listeners for game buttons
  document.querySelectorAll('[data-game-html]').forEach((button) => {
    button.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement;
      const gameHtml = target.dataset.gameHtml;
      const gameName = target.dataset.gameName;

      if (gameHtml) {
        // Navigate to the game HTML file
        window.location.href = `./games/${gameHtml}`;
        console.log(`Starting game: ${gameName}`);
      }
    });
  });
});
