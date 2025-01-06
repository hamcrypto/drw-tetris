import { Dispatch, SetStateAction, useState } from "react";
import { Turn, TurnsList } from "../../types";
import { handleSubmitTurn, validateFreeText, processFreeText } from "./utils";
import VisualTurnBuilder from "./VisualTurnBuilder";

interface TurnBuilderProps {
  setTurnsList: Dispatch<SetStateAction<TurnsList>>;
}

type turnBuilderInputTypes = "builder" | "text";

function TurnBuilder({ setTurnsList }: TurnBuilderProps) {
  const [turnInput, setTurnInput] = useState<Turn[]>([]);
  const [freeTextInput, setFreeTextInput] = useState<string>("");
  const [selectedInputType, setSelectedInputType] =
    useState<turnBuilderInputTypes>("builder");

  const handleSelectedInputTypeChange = (newType: turnBuilderInputTypes) => {
    setSelectedInputType(newType);
    setTurnInput([]);
    setFreeTextInput("");
  };
  return (
    <div>
      <h3>Turn builder</h3>
      <div>
        <label>
          <input
            type="radio"
            value="builder"
            checked={selectedInputType === "builder"}
            onChange={() => handleSelectedInputTypeChange("builder")}
          />
          Builder Input
        </label>
        <label>
          <input
            type="radio"
            value="text"
            checked={selectedInputType === "text"}
            onChange={() => handleSelectedInputTypeChange("text")}
          />
          Text Input
        </label>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedInputType === "builder") {
            handleSubmitTurn(turnInput, setTurnsList, setTurnInput);
          } else {
            processFreeText(freeTextInput, setTurnsList);
            setFreeTextInput("");
          }
        }}
      >
        {selectedInputType === "builder" && (
          <VisualTurnBuilder
            turnInput={turnInput}
            setTurnInput={setTurnInput}
          />
        )}

        {selectedInputType === "text" && (
          <input
            type="text"
            placeholder={"e.g. T1,Z3,I4"}
            style={{ width: "100%", fontSize: 15 }}
            value={freeTextInput}
            onChange={(e) => setFreeTextInput(e.target.value)}
          />
        )}

        <button
          type="submit"
          disabled={
            selectedInputType === "builder"
              ? !turnInput.length
              : !validateFreeText(freeTextInput)
          }
        >
          Add turn
        </button>
      </form>
    </div>
  );
}

export default TurnBuilder;
