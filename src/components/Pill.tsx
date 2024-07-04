import { Chip } from "@mui/material";

interface PillProps {
  status: "DISPONÍVEL" | "INDISPONÍVEL";
}

export const Pill = ({ status }: PillProps) => {
  return (
    <Chip
      sx={{
        backgroundColor: status === "DISPONÍVEL" ? "green" : "#FE6767",
      }}
      label={status}
    />
  );
};
