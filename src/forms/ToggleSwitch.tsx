// src/components/ToggleSwitch.tsx
import React from "react";

interface ToggleSwitchProps {
  checked: boolean; // valor actual (activo/desactivado)
  onChange: (id: string,value: string) => void; // función que actualiza el estado
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
      <input
        type="checkbox"
        onChange={(e) => onChange(e.target.id, e.target.value)}
        style={{ display: "none" }}
      />
      <span
        style={{
          width: "40px",
          height: "20px",
          background: checked ? "#4caf50" : "#ccc",
          borderRadius: "20px",
          position: "relative",
          transition: "background 0.3s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: checked ? "22px" : "2px",
            width: "16px",
            height: "16px",
            background: "#fff",
            borderRadius: "50%",
            transition: "left 0.3s",
          }}
        />
      </span>
      algo
    </label>
  );
};
