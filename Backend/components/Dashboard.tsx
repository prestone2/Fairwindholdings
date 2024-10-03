"use client";

import React, { useState, useEffect } from "react";
import { useAction } from "@/lib/safe-action/hook";
import { getUserData } from "@/app/actions/getuserData";
import { useUser } from "@clerk/nextjs";
import { Header } from "./Header";
import Sidebar from "./Sidebar";
import StatCard from "./StatCard";
import TradingResults from "./TradingResults";
import AccountPanel from "./Accountpanel";
import SuccessRateChart from "./SuccessRateChart";
import Verification from "./Verification";
import PersonalInfo from "./PersonalInfo";
import Withdrawal from "./withdrawal";
import Accounts from "./Accounts";
import LiveChat from "./Livechat";
import Savings from "./Savings";
import Settings from "./Settings";
import Deposit from "./Deposit";

interface UserData {
  balance: number;
  leverage: string;
  credit: number;
  totalDeposits: number;
  fullName: string;
  firstName: string; // Add this line
  email: string;
  profileImage: string;
}

interface Stats {
  pnl: number;
  profit: number;
  loss: number;
  profitableOrders: string;
}

export function Dashboard() {
  const [currentView, setCurrentView] = useState("dashboard");
  const { execute, result, status } = useAction(getUserData);
  const { user } = useUser();

  useEffect(() => {
    execute();
  }, [execute]);

  if (status === "executing" || !user) {
    return <div>Loading...</div>;
  }

  if (result.error) {
    return <div>Error: {result.error}</div>;
  }

  const { data } = result;

  const userDataForSidebar: UserData = {
    firstName: user.firstName || "",
    fullName: user.fullName || "",
    email: user.primaryEmailAddress?.emailAddress || "",
    profileImage: user.imageUrl || "/images/placeholder-avatar.png",
  };

  const renderView = () => {
    switch (currentView) {
      case "verification":
        return <Verification />;
      case "personal-info":
        return <PersonalInfo />;
      case "withdrawal":
        return <Withdrawal />;
      case "accounts":
        return <Accounts />;
      case "live-chat":
        return <LiveChat />;
      case "savings":
        return <Savings />;
      case "settings":
        return <Settings />;
      case "deposit":
        return <Deposit />;
      default:
        return (
          <>
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-[600px] lg:grid-cols-2">
                <StatCard
                  title="Total Balance"
                  value={`$${data.balance.toFixed(2)}`}
                  icon="wallet"
                  note="* using current exchange rate"
                />
                <StatCard
                  title="Total PNL"
                  value={`$${data.pnl.toFixed(2)}`}
                  icon="coins"
                  note="* using current exchange rate"
                />
                <StatCard
                  title="Profitable Orders"
                  value={data.profitableOrders}
                  icon="flask"
                />
                <StatCard
                  title="Total Deposits"
                  value={`$${data.totalDeposits.toFixed(2)}`}
                  icon="chart"
                  note="* using current exchange rate"
                />
              </div>
              <div className="flex-grow flex justify-end">
                <SuccessRateChart profit={data.profit} loss={data.loss} />
              </div>
            </div>
            <div className="mb-6">
              <TradingResults className="h-64 w-full overflow-x-auto" />
            </div>
            <AccountPanel
              balance={data.balance}
              leverage={data.leverage}
              credit={data.credit}
              className="lg:w-[300px] w-full"
            />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#111827] text-white overflow-hidden">
      <Header />
      <div className="flex flex-1">
        <Sidebar onNavigate={setCurrentView} userData={userDataForSidebar} />
        <main className="flex-grow p-6 mx-20">{renderView()}</main>
      </div>
    </div>
  );
}

export default Dashboard;
