# 🎮 10 Simple Games Collection

Tập hợp 10 game HTML5 đơn giản và vui nhộn, được xây dựng với HTML, Tailwind CSS và TypeScript.

## 📁 Cấu trúc dự án

```
├── src/
│   ├── games/              # Thư mục chứa code các game
│   │   ├── 2048/
│   │   │   └── game.ts    # Game 2048
│   │   ├── snake/
│   │   ├── tic-tac-toe/
│   │   └── ...
│   └── main.ts            # File chính - config danh sách game
├── dist/
│   ├── index.html         # Trang chủ - danh sách game
│   ├── games/             # Các file HTML của game
│   │   ├── 2048.html
│   │   ├── snake.html
│   │   └── ...
│   └── js/                # JavaScript đã compile
│       ├── main.js
│       └── games/
├── package.json
├── tsconfig.json
└── tsconfig.base.json
```

## 🎯 Danh sách Game

1. **2048** 🎮 - Game puzzle ghép số gây nghiện
2. **Snake** 🐍 - Game rắn săn mồi cổ điển
3. **Tic Tac Toe** ⭕ - Trò chơi O-X
4. **Memory Cards** 🃏 - Game test trí nhớ
5. **Flappy Bird** 🐦 - Bay qua các ống nước
6. _(Đang phát triển...)_

## 🚀 Cài đặt & Chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Development mode (với hot reload)

```bash
npm run dev
```

Dự án sẽ chạy tại: **http://localhost:3000**

### 3. Build cho production

```bash
npm run build
```

## 📝 Scripts

- `npm run dev` - Chạy development server với auto-reload
- `npm run build` - Compile TypeScript
- `npm run watch:ts` - Watch TypeScript changes
- `npm run serve` - Chạy live server

## 🎨 Thêm Game Mới

### Bước 1: Tạo folder game trong `src/games/`

```
src/games/your-game/
└── game.ts
```

### Bước 2: Tạo file HTML trong `dist/games/`

```html
<!-- dist/games/your-game.html -->
<!DOCTYPE html>
<html lang="vi">
  <head>
    <title>Your Game</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <!-- Game UI -->
    <script src="../js/games/your-game/game.js"></script>
  </body>
</html>
```

### Bước 3: Thêm vào danh sách trong `src/main.ts`

```typescript
const games: Game[] = [
  // ... games hiện có
  {
    id: 'your-game',
    name: 'Your Game',
    description: 'Mô tả game của bạn',
    htmlFile: 'your-game.html',
    icon: '🎲',
    difficulty: 'Easy',
    category: 'Arcade',
  },
];
```

### Bước 4: Build và test

```bash
npm run build
npm run dev
```

## 🛠 Công nghệ sử dụng

- **HTML5** - Cấu trúc trang web
- **Tailwind CSS** (CDN) - Utility-first CSS framework
- **TypeScript** - JavaScript với type safety
- **Live Server** - Development server với hot reload

## ✨ Tính năng

- ✅ TypeScript cho code dễ bảo trì
- ✅ Tailwind CSS (CDN) - không cần build CSS
- ✅ Hot reload trong development
- ✅ Cấu trúc module rõ ràng, dễ mở rộng
- ✅ Responsive design
- ✅ Game list dễ config trong `src/main.ts`

## 📱 Responsive

Tất cả các game đều được thiết kế responsive, chơi được trên:

- 💻 Desktop
- 📱 Mobile
- 📱 Tablet

## 📄 License

MIT License - Tự do sử dụng cho mục đích học tập và giải trí!
