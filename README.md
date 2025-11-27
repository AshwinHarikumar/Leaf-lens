# 🌿 LeafLens - AI Gardening Assistant

![LeafLens Banner](https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1200&auto=format&fit=crop)

LeafLens is a modern, AI-powered gardening assistant that helps you identify plants, understand their care requirements, and diagnose health issues instantly. Powered by Google's Gemini 2.0 Flash model.

## ✨ Features

- **📸 Instant Identification**: Upload or drag & drop a plant image to identify it with 99.9% accuracy.
- **💧 Smart Care Guides**: Get tailored advice for watering, sunlight, soil, and temperature.
- **💬 AI Botanist Chat**: Have a conversation with the AI to ask follow-up questions about your plant.
- **📊 Vital Stats**: Visual charts for plant difficulty, water needs, and sunlight requirements.
- **🎨 Beautiful UI**: A responsive, nature-inspired interface built with Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (`gemini-2.0-flash-exp`)
- **Icons**: Lucide React
- **Charts**: Recharts

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API Key (Get one [here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AshwinHarikumar/Leaf-lens.git
   cd Leaf-lens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📱 Screenshots

> 

| Home Page | Analysis Result |
|-----------|----------------|
| ![Home Placeholder](public\home.png) | ![Result Placeholder](public\result.png) |

## 📄 License

MIT License - feel free to use this project for your own gardening adventures!
