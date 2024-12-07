import Image from "next/image";
import { PlayerData } from "@/types/types";

interface PlayerBoardProps {
  playerData: PlayerData;
}

const PlayerBoard: React.FC<PlayerBoardProps> = ({ playerData }) => {
  return (
    <div className="flex flex-col w-full sm:w-[400px] rounded-lg">
      <div className="flex justify-center  bg-[#1D1D1D] pt-8">
        <Image
          src="/images/player.png"
          alt="Player Board"
          width={400}
          height={400}
        />
      </div>
      <div className="flex flex-col flex-1 bg-[#2F2F2F] max-h-[350px] rounded-lg justify-center items-center py-4 pb-12">
        <div className="text-[32px] text-white/80">
          {playerData?.name || ""}
        </div>
        <div className="text-[128px] text-white/80">
          {playerData?.fantasyPoints || 0}
        </div>
        <div className="text-[16px] text-white/80">Points</div>
      </div>
    </div>
  );
};

export default PlayerBoard;
