import { Player } from "@/types/types";

interface DataTableProps {
  playersData: Player[];
  currentPlayerData: Player | null;
  selectRow: (selected: Player) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  playersData,
  currentPlayerData,
  selectRow,
}) => {
  return (
    <div className="sm:flex-row overflow-auto">
      <table className="min-w-full bg-gray-800 text-left text-[24px] text-white">
        <thead className="bg-[#1D1D1D]">
          <tr>
            <th className="px-6 py-3 w-[40%]">Name</th>
            <th className="px-6 py-3 w-[15%]">Team</th>
            <th className="px-6 py-3 w-[15%]">Position</th>
            <th className="px-6 py-3 w-[15%]">Salary</th>
            <th className="px-6 py-3 w-[15%]">Points</th>
          </tr>
        </thead>
        <tbody>
          {playersData.map((player: any, index) => (
            <tr
              key={index}
              className={` cursor-pointer ${
                player.id === currentPlayerData?.id
                  ? "bg-[#807B0F] hover:bg-[#807B0F]"
                  : "bg-[#2F2F2F] hover:bg-[#807B0F]/50"
              }`}
              onClick={() => {
                console.log("Player, ", player);
                selectRow(player);
              }}
            >
              <td className="px-6 py-3">{player.name}</td>
              <td className="px-6 py-3">{player.team}</td>
              <td className="px-6 py-3">{player.position}</td>
              <td className="px-6 py-3">${player.salary}</td>
              <td className="px-6 py-3">{player.fantasyPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
