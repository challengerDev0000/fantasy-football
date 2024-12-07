"use client";
import DataTable from "@/components/DataTable";
import Filter from "@/components/Filter";
import Header from "@/components/header";
import Pagination from "@/components/Pagination";
import PlayerBoard from "@/components/PlayerBoard";
import { useEffect, useState } from "react";
import { getPlayersData } from "../utils/api";

export default function Home() {
  const [currentGameType, setCurrentGameType] = useState<string | null>(null);
  const [currentOperator, setCurrentOperator] = useState<string | null>(null);
  const [currentOperatorName, setCurrentOperatorName] = useState<string | null>(
    null
  );
  const [playersData, setPlayersData] = useState<any[]>([]);
  const [currentPlayerData, setCurrentPlayerData] = useState<any | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(8);

  useEffect(() => {
    if (currentOperator && currentGameType && currentOperatorName) {
      const fetchPlayersData = async () => {
        const response = await getPlayersData(
          currentOperator,
          currentGameType,
          currentOperatorName,
          page,
          offset
        );
        const data = await response.json();
        setPlayersData(data.players);
        setCurrentPlayerData(data.players[0]);
        setTotalCount(data.total_count);
      };
      fetchPlayersData();
    }
  }, [currentOperatorName, page, offset]);

  const handlePageChange = (selectedPage: string) => {
    setPage(Number(selectedPage));
  };

  const handleOffsetChange = (selectedOffset: string) => {
    setOffset(Number(selectedOffset));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-black/90">
      <Header />
      <main className="flex flex-col items-center gap-8 pt-16">
        <Filter
          onChange={(currentOperator, currentGameType, currentOperatorName) => {
            setCurrentOperator(currentOperator);
            setCurrentGameType(currentGameType);
            setCurrentOperatorName(currentOperatorName);
          }}
        />
        <div className="flex flex-col-reverse sm:flex-row gap-4 w-full container">
          <div className="flex-1 rounded-lg">
            <DataTable
              playersData={playersData}
              currentPlayerData={currentPlayerData}
              selectRow={setCurrentPlayerData}
            />
            <Pagination
              page={page}
              totalCount={totalCount}
              offset={offset}
              onPageChange={handlePageChange}
              onOffsetChange={handleOffsetChange}
            />
          </div>
          <PlayerBoard playerData={currentPlayerData} />
        </div>
      </main>
    </div>
  );
}
