import React, { useState, useEffect } from "react";
import RegisterModal from "@/components/RegisterModal";
import Image from "next/image";
import {
  FaChartLine,
  FaHistory,
  FaCalendarAlt,
  FaNewspaper,
  FaCog,
  FaExpand,
  FaCamera,
  FaChevronDown,
  FaPlus,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import ProfitCalculatorModal from "./Trading/ProfitCalculatorModal";
import MarketWatch from "./MarketWatch";
import EconomicCalendar from "./EconomicCalendar";
import MarketNews from "./MarketNews";
import LoginModal from "./LoginModal";

declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingDashboardProps {
  initialRegisterModalOpen?: boolean;
  initialLoginModalOpen?: boolean;
  onLogin?: (user: any) => void;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export function TradingDashboard({
  initialRegisterModalOpen = false,
  initialLoginModalOpen = false,
  onLogin,
}: TradingDashboardProps & { onLogin?: (user: any) => void }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(
    initialLoginModalOpen
  );

  const [selectedMarket, setSelectedMarket] = useState("GOLD");
  const [timeframe, setTimeframe] = useState("1D");
  const [isProfitCalculatorOpen, setIsProfitCalculatorOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(
    initialRegisterModalOpen
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        autosize: true,
        symbol: "OANDA:XAUUSD",
        interval: timeframe,
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_chart",
        studies: ["Volume@tv-basicstudies"],
        disabled_features: ["use_localstorage_for_settings"],
        enabled_features: ["study_templates"],
        overrides: {
          "paneProperties.background": "#131722",
          "paneProperties.vertGridProperties.color": "#363c4e",
          "paneProperties.horzGridProperties.color": "#363c4e",
          "symbolWatermarkProperties.transparency": 90,
          "scalesProperties.textColor": "#AAA",
        },
      });
    };

    document.getElementById("tradingview_chart")!.innerHTML = "";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [timeframe]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeframesMap: { [key: string]: string } = {
    "1m": "1",
    "5m": "5",
    "15m": "15",
    "1h": "60",
    "4h": "240",
    "1d": "D",
  };

  const toggleWidget = (widget: string) => {
    setActiveWidget((prev) => (prev === widget ? null : widget));
  };
  return (
    <div className="bg-[#1e2329] text-white h-screen flex flex-col">
      <header className="bg-[#2c3035] p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/logo-cita-white.png"
            alt="CITA TRADING GROUP"
            width={150}
            height={45}
          />
          <button className="bg-blue-600 text-white px-3 py-1 rounded flex items-center">
            <Image
              src="/images/gold-icon.png"
              alt="Gold"
              width={40}
              height={40}
            />
            <span className="ml-2">Gold metals</span>
            <FaChevronDown className="ml-2" />
          </button>
          <button className="text-gray-400">
            <FaPlus />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="border-2 border-green-500 text-green-500 px-6 py-3 rounded flex items-center hover:bg-green-500 hover:text-white transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zm3 2a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Deposit
          </button>
          <div className="flex flex-col items-end">
            <span className="text-green-500 text-sm">STANDARD ACCOUNT</span>
            <span className="text-green-500 text-xl font-bold">$0.00</span>
          </div>
          <div className="flex items-center space-x-2">
            <Image
              src="/images/mvp-badge.png"
              alt="MVP"
              width={50}
              height={50}
              className="w-10 h-10"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              onClick={() => setIsRegisterModalOpen(true)}
            >
              Register
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 mr-2"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Login
            </button>
            <button className="bg-gray-700 p-3 rounded-full text-gray-400 hover:text-white">
              <FaUser size={25} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-grow overflow-hidden">
        <aside className="w-20 bg-[#2c3035] flex-shrink-0 flex flex-col py-4">
          <button
            className="flex flex-col items-center justify-center mb-6 text-gray-400 hover:text-white"
            onClick={() => toggleWidget("marketWatch")}
          >
            <FaChartLine size={20} />
            <span className="mt-1 text-xs">MARKET WATCH</span>
          </button>
          <button className="flex flex-col items-center justify-center mb-6 text-gray-400 hover:text-white">
            <FaShoppingCart size={20} />
            <span className="mt-1 text-xs">ACTIVE ORDERS</span>
          </button>
          <button className="flex flex-col items-center justify-center mb-6 text-gray-400 hover:text-white">
            <FaHistory size={20} />
            <span className="mt-1 text-xs">TRADING HISTORY</span>
          </button>
          <button
            className="flex flex-col items-center justify-center mb-6 text-gray-400 hover:text-white"
            onClick={() => toggleWidget("economicCalendar")}
          >
            <FaCalendarAlt size={20} />
            <span className="mt-1 text-xs">ECONOMIC CALENDAR</span>
          </button>
          <button
            className="flex flex-col items-center justify-center mb-6 text-gray-400 hover:text-white"
            onClick={() => toggleWidget("marketNews")}
          >
            <FaNewspaper size={20} />
            <span className="mt-1 text-xs">MARKET NEWS</span>
          </button>
        </aside>

        <section className="bg-[#2c3035] flex-shrink-0 p-4">
          {activeWidget === "marketWatch" && <MarketWatch />}
          {activeWidget === "economicCalendar" && (
            <EconomicCalendar showCalendar={true} />
          )}{" "}
          {/* Pass showCalendar prop */}
          {activeWidget === "marketNews" && <MarketNews />}{" "}
          {/* News Component */}
        </section>

        <main className="flex-grow flex flex-col">
          <div className="flex items-center space-x-4 p-4">
            <h2 className="text-xl font-semibold">{selectedMarket}</h2>
            <div className="flex space-x-2">
              {(["1m", "5m", "15m", "1h", "4h", "1d"] as const).map((tf) => (
                <button
                  key={tf}
                  className={`px-2 py-1 rounded ${
                    timeframe === timeframesMap[tf]
                      ? "bg-blue-500"
                      : "bg-[#2c3035]"
                  }`}
                  onClick={() => setTimeframe(timeframesMap[tf])}
                >
                  {tf}
                </button>
              ))}
            </div>
            <button className="text-gray-400">Indicators</button>
            <div className="flex space-x-2 ml-auto">
              <FaCog className="text-gray-400" />
              <FaExpand className="text-gray-400" />
              <FaCamera className="text-gray-400" />
            </div>
          </div>
          <div id="tradingview_chart" className="flex-grow" />
          <div className="p-4">
            <div className="flex space-x-4 mb-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Active Orders
              </button>
              <button className="bg-[#2c3035] text-white px-4 py-2 rounded">
                Orders History
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400">
                  <th className="text-left">Symbol</th>
                  <th className="text-left">ID</th>
                  <th className="text-left">Type</th>
                  <th className="text-left">Volume</th>
                  <th className="text-left">Open Price</th>
                  <th className="text-left">Open Time</th>
                  <th className="text-left">SL</th>
                  <th className="text-left">TP</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Commission</th>
                  <th className="text-left">Swap</th>
                  <th className="text-left">PnL</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>{/* Add table rows here for active orders */}</tbody>
            </table>
          </div>
        </main>
        <aside className="w-64 bg-[#2c3035] p-4 overflow-y-auto">
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Volume</h3>
            <input
              type="number"
              value="0.01"
              className="w-full bg-[#1e2329] p-2 rounded"
            />
            <div className="grid grid-cols-3 gap-2 mt-2">
              <button className="bg-[#1e2329] px-2 py-1 rounded">lots</button>
              <button className="bg-[#1e2329] px-2 py-1 rounded">units</button>
              <button className="bg-[#1e2329] px-2 py-1 rounded">
                currency
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Contract Details</h3>
            <p>Contract size: 1,000</p>
            <p>Position: 10</p>
            <p>
              Margin: <span className="text-red-500">$531.75</span>
            </p>
            <p>
              Free Margin: <span className="text-green-500">$0.00</span>
            </p>
            <p>Spread: 0.28</p>
            <p>Leverage: 1:50</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Take Profit & Stop Loss</h3>
            <p>Not set</p>
            <button
              className="bg-[#1e2329] px-2 py-1 rounded mt-2"
              onClick={() => setIsProfitCalculatorOpen(true)}
            >
              Profit Calculator
            </button>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Pending</h3>
            <p>Market</p>
          </div>
        </aside>
      </div>
      <footer className="bg-[#2c3035] p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span>Balance: $0.00</span>
          <span>Credit: $0.00</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-blue-500">LIVE CHAT</button>
          <span>CURRENT TIME: {currentTime}</span>
        </div>
      </footer>

      <ProfitCalculatorModal
        isOpen={isProfitCalculatorOpen}
        onClose={() => setIsProfitCalculatorOpen(false)}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={onLogin}
      />
    </div>
  );
}

export default TradingDashboard;
