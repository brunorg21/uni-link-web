import { Chip } from "@mui/material";

interface PillProps {
  status: "DISPONÍVEL" | "INDISPONÍVEL";
}

export const Pill = ({ status }: PillProps) => {
  return (
    <Chip
      sx={{
        color: "white",
        fontWeight: "bold",
        backgroundColor: status === "DISPONÍVEL" ? "green" : "#FE6767",
      }}
      label={status}
    />
  );
};
