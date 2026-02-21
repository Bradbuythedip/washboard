# 🚀 PumpFun Washboard

A comprehensive decentralized application (DApp) for tracking and trading cryptocurrency tokens on the Solana blockchain. Built with modern web technologies and designed for the PumpFun ecosystem.

![PumpFun Washboard](https://img.shields.io/badge/status-active-success.svg)
![React](https://img.shields.io/badge/react-19.2.4-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 🔗 Wallet Integration
- Connect/Disconnect Web3 wallet
- Display wallet address
- Real-time wallet status

### 📊 Token Dashboard
- Live token tracking with real-time updates
- 6+ pre-loaded tokens (expandable)
- Price, market cap, and volume statistics
- 24-hour price change indicators
- Search functionality
- Filter by gainers/losers

### 📈 Advanced Charting
- Interactive price charts using Recharts
- Real-time data updates every 5 seconds
- 24-hour historical data
- Custom tooltips with detailed information

### 💰 Trading Interface
- Buy/Sell functionality
- Customizable slippage tolerance (0.5%, 1%, 2%, custom)
- Real-time price calculations
- Trade summary before execution
- Wallet connection validation

### 👛 Portfolio Management
- Track your holdings
- Real-time portfolio value
- Profit/Loss tracking
- Asset allocation percentages
- Individual token performance

### 🎨 Modern UI/UX
- Beautiful gradient design
- Responsive layout (desktop, tablet, mobile)
- Smooth animations and transitions
- Card-based token display
- Glassmorphism effects

## 🛠 Technologies Used

- **React 19** - Modern UI framework
- **Webpack 5** - Module bundler
- **Babel** - JavaScript compiler
- **Recharts** - Chart library for React
- **Solana Web3.js** - Blockchain integration
- **Axios** - HTTP client
- **CSS3** - Advanced styling with animations

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Bradbuythedip/washboard.git

# Navigate to project directory
cd washboard

# Install dependencies
npm install
```

## 🚀 Running the Application

### Development Mode
```bash
npm start
```
The application will be available at http://localhost:3000 with hot-reloading enabled.

### Production Build
```bash
npm run build
```
The production-ready files will be in the `dist` directory.

## 📱 Usage

1. **Connect Wallet**: Click the "Connect Wallet" button in the top-right corner
2. **Browse Tokens**: View all available tokens in the dashboard
3. **Search/Filter**: Use the search bar or filter buttons to find specific tokens
4. **View Charts**: Click on any token card to view its price chart
5. **Trade**: Use the trading panel to buy or sell tokens
6. **Track Portfolio**: View your holdings in the portfolio section

## 🏗 Project Structure

```
washboard/
├── src/
│   ├── components/
│   │   ├── WalletConnect.js       # Wallet connection component
│   │   ├── WalletConnect.css      # Wallet styling
│   │   ├── TokenCard.js           # Token display card
│   │   ├── TokenCard.css          # Token card styling
│   │   ├── PriceChart.js          # Price chart component
│   │   ├── PriceChart.css         # Chart styling
│   │   ├── TradingPanel.js        # Trading interface
│   │   ├── TradingPanel.css       # Trading panel styling
│   │   ├── Portfolio.js           # Portfolio tracker
│   │   └── Portfolio.css          # Portfolio styling
│   ├── App.js                     # Main application component
│   ├── App.css                    # Global styles
│   └── index.js                   # Application entry point
├── public/
│   └── index.html                 # HTML template
├── dist/                          # Production build output
├── package.json                   # Dependencies and scripts
├── webpack.config.js              # Webpack configuration
├── .babelrc                       # Babel configuration
├── vercel.json                    # Vercel deployment config
└── README.md                      # Project documentation
```

## 🌐 Deployment

This project is configured for easy deployment on Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel
```

Alternatively, push to GitHub and connect your repository to Vercel for automatic deployments.

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env` file in the root directory:

```env
REACT_APP_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
REACT_APP_API_ENDPOINT=your-api-endpoint
```

## 🎯 Roadmap

- [ ] Real Solana blockchain integration
- [ ] Live API data integration
- [ ] Transaction history
- [ ] Advanced charting tools (candlesticks, volume charts)
- [ ] Token creation interface
- [ ] Social features (comments, ratings)
- [ ] Mobile app version
- [ ] Multi-chain support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Bradbuythedip**
- GitHub: [@Bradbuythedip](https://github.com/Bradbuythedip)

## 🙏 Acknowledgments

- PumpFun community
- Solana ecosystem
- React community
- All contributors

## 📞 Support

For support, please open an issue on GitHub or reach out to the community:
- Twitter: [@pumpfun](https://twitter.com/pumpfun)
- Discord: [Join our server](https://discord.gg/pumpfun)

---

**Built with ❤️ for the PumpFun community**
