import { getGameTypes, getOperatorNames, getOperators } from "@/utils/api";
import { useEffect, useState } from "react";
import Dropdown from "./common/DropDown";

interface FilterProps {
  onChange: (
    currentOperator: string | null,
    currentGameType: string | null,
    currentOperatorName: string | null
  ) => void;
}

const Filter: React.FC<FilterProps> = ({ onChange }) => {
  const [operators, setOperators] = useState<string[]>([]);
  const [gameTypes, setGameTypes] = useState<string[]>([]);
  const [operatorNames, setOperatorNames] = useState<string[]>([]);
  const [currentGameType, setCurrentGameType] = useState<string | null>(null);
  const [currentOperator, setCurrentOperator] = useState<string | null>(null);
  const [currentOperatorName, setCurrentOperatorName] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchOperators = async () => {
      const response = await getOperators();
      const data = await response.json();
      setOperators(data);
      setCurrentOperator(data[0]);
    };
    fetchOperators();
  }, []);

  useEffect(() => {
    if (currentOperator) {
      const fetchGameTypes = async () => {
        const response = await getGameTypes(currentOperator);
        const data = await response.json();
        setGameTypes(data);
        setCurrentGameType(data[0]);
      };
      fetchGameTypes();
    }
  }, [currentOperator]);

  useEffect(() => {
    if (currentOperator && currentGameType) {
      const fetchOperatorNames = async () => {
        const response = await getOperatorNames(
          currentOperator,
          currentGameType
        );
        const data = await response.json();
        setOperatorNames(data);
        setCurrentOperatorName(data[0]);
      };
      fetchOperatorNames();
    }
  }, [currentGameType]);

  useEffect(() => {
    if (currentOperatorName && currentGameType && currentOperator)
      onChange(currentOperator, currentGameType, currentOperatorName);
  }, [currentOperatorName]);
  return (
    <div className="flex flex-col sm:flex-row bg-white/10 p-8 rounded-lg gap-8 ">
      <Dropdown
        options={operators}
        selected={currentOperator || "Select Operator"}
        onSelect={(selected) => {
          setCurrentOperator(selected);
        }}
      />
      <Dropdown
        options={gameTypes}
        selected={currentGameType || "Select Operator"}
        onSelect={(selected) => {
          setCurrentGameType(selected);
        }}
      />
      <Dropdown
        options={operatorNames}
        selected={currentOperatorName || "Select Operator"}
        onSelect={(selected) => {
          setCurrentOperatorName(selected);
        }}
      />
    </div>
  );
};

export default Filter;
