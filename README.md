# AFCON 2024 Ticketing App

A modern mobile application for purchasing tickets to the African Cup of Nations 2024. Built with React Native and Expo.

## Features

- User authentication (login/register)
- View upcoming matches
- Interactive stadium seat selection
- Purchase tickets
- View purchased tickets
- User profile management
- Multiple ticket categories (VIP, Premium, Regular, Economy)

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/afcon-ticketing-app.git
cd afcon-ticketing-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Project Structure

```
afcon-ticketing-app/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── tickets.tsx
│   ├── buy.tsx
│   └── profile.tsx
├── assets/
│   └── images/
├── components/
├── constants/
└── hooks/
```

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation
- FontAwesome Icons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- African Cup of Nations 2024
- Expo team for the amazing framework
- React Native community
