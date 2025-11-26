import React, { useState, useEffect } from 'react';
import { AppState, PlantData } from './types';
import { analyzePlantImage, createChatSession } from './services/geminiService';
import ImageUpload from './components/ImageUpload';
import PlantCard from './components/PlantCard';
import ChatInterface from './components/ChatInterface';
import Loading from './components/Loading';
import { Leaf, ArrowLeft, RotateCcw } from 'lucide-react';
import { Chat } from '@google/genai';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [plantImage, setPlantImage] = useState<string | null>(null);
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = async (base64: string) => {
    setPlantImage(base64);
    setState(AppState.ANALYZING);
    setError(null);

    try {
      const data = await analyzePlantImage(base64);
      setPlantData(data);
      
      // Initialize chat with context
      const session = createChatSession(data);
      setChatSession(session);
      
      setState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError("Could not identify the plant. Please ensure the image is clear and contains a plant.");
      setState(AppState.ERROR);
    }
  };

  const resetApp = () => {
    setState(AppState.IDLE);
    setPlantImage(null);
    setPlantData(null);
    setChatSession(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-bloom-50 text-gray-800 font-sans selection:bg-bloom-200">
      {/* Navigation Bar */}
      <nav className="bg-white/70 backdrop-blur-lg sticky top-0 z-50 border-b border-white/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={resetApp}>
            <div className="w-10 h-10 bg-gradient-to-br from-leaf-400 to-leaf-600 rounded-xl flex items-center justify-center shadow-lg shadow-leaf-500/30 group-hover:scale-110 transition-transform duration-300">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-leaf-600 to-leaf-800 tracking-tight">LeafLens</span>
          </div>
          {state !== AppState.IDLE && (
            <button 
              onClick={resetApp}
              className="text-sm font-bold text-gray-500 hover:text-bloom-600 transition-colors flex items-center gap-2 px-4 py-2 rounded-full hover:bg-bloom-50"
            >
              <RotateCcw className="w-4 h-4" />
              New Scan
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* IDLE STATE */}
        {state === AppState.IDLE && (
          <div className="animate-in slide-in-from-bottom-8 duration-700 fade-in">
            <div className="text-center mb-16 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-bloom-300/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-sun-300/20 rounded-full blur-3xl -z-10"></div>
              
              <h1 className="text-4xl md:text-7xl font-display font-extrabold text-gray-900 mb-6 leading-tight">
                Your Personal <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-leaf-500 via-leaf-600 to-bloom-500">AI Botanist</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
                Instantly identify plants, diagnose issues, and get tailored care advice powered by Gemini 2.0.
              </p>
            </div>
            <ImageUpload onImageSelected={handleImageSelected} />
            
            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24">
              {[
                { title: "Instant ID", desc: "99.9% accuracy in plant identification.", color: "bg-leaf-50 border-leaf-100 text-leaf-700" },
                { title: "Care Guides", desc: "Water, light, and soil requirements customized for you.", color: "bg-sun-50 border-sun-100 text-sun-700" },
                { title: "Expert Chat", desc: "Ask follow-up questions to our AI expert.", color: "bg-bloom-50 border-bloom-100 text-bloom-700" }
              ].map((feature, i) => (
                <div key={i} className={`p-6 md:p-8 rounded-3xl border-2 ${feature.color} hover:-translate-y-1 transition-transform duration-300 shadow-sm`}>
                  <h3 className="font-display font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="opacity-80 font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYZING STATE */}
        {state === AppState.ANALYZING && (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            {plantImage && (
              <div className="relative w-48 h-48 mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-r from-leaf-400 to-bloom-400 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
                <img 
                  src={plantImage} 
                  alt="Analyzing" 
                  className="relative w-full h-full object-cover rounded-3xl shadow-2xl ring-4 ring-white transform transition-transform group-hover:scale-105 duration-500"
                />
              </div>
            )}
            <Loading text="Analyzing plant biology..." />
            <p className="text-gray-400 text-sm mt-4 font-medium tracking-wider uppercase">This may take a few seconds</p>
          </div>
        )}

        {/* RESULTS STATE */}
        {state === AppState.RESULTS && plantData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
            {/* Left Column: Image & Chat */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-3 rounded-3xl shadow-xl shadow-leaf-900/5 border border-white/50">
                <img 
                  src={plantImage!} 
                  alt={plantData.name} 
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
              
              {/* Sticky Chat on Desktop, normal flow on mobile */}
              <div className="lg:sticky lg:top-24">
                 <ChatInterface 
                    chatSession={chatSession} 
                    initialMessage={`I've identified this as ${plantData.name}. What would you like to know about it?`} 
                 />
              </div>
            </div>

            {/* Right Column: Plant Details */}
            <div className="lg:col-span-2">
               <PlantCard data={plantData} />
               
               {/* Mobile only spacer for chat visibility */}
               <div className="h-8 lg:hidden"></div>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {state === AppState.ERROR && (
          <div className="text-center py-20">
            <div className="inline-flex bg-red-50 text-red-500 p-6 rounded-full mb-6 shadow-lg shadow-red-100">
              <Leaf className="w-10 h-10 rotate-180" />
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Oops! Something went wrong.</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8 font-medium">{error}</p>
            <button 
              onClick={resetApp}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-bold transition-all hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
