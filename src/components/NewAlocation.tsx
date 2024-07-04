import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CheckboxesGroup from "./CheckboxHourGroup";

interface NewAlocationProps {
  open: boolean;
  handleClose: () => void;
}
export function NewAlocation({ open, handleClose }: NewAlocationProps) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle
        sx={{
          fontSize: "1.5rem",
        }}
      >
        Nova alocação para sala de aula
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          gap: "0.4rem",
          flexDirection: "column",
        }}
      >
        <DialogContentText>
          Para realizar uma alocação, preencha os campos necessários.
        </DialogContentText>
        <div className="flex flex-col space-y-1">
          <label className="text-md truncate" htmlFor="classroom">
            Sala de aula
          </label>
          <input
            id="classroom"
            name="classroom"
            placeholder="Sala de aula"
            type="text"
            className="p-4 border-zinc-300 outline-0 border-[2px] rounded-md bg-zinc-200"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-md truncate" htmlFor="teacher">
            Professor
          </label>
          <input
            id="teacher"
            name="teacher"
            placeholder="Professor"
            type="text"
            className="p-4 border-zinc-300 outline-0 border-[2px] rounded-md bg-zinc-200"
          />
        </div>
        <CheckboxesGroup />
      </DialogContent>
      <DialogActions>
        <button
          disabled
          className="p-2 text-lg rounded-md bg-zinc-600 text-white enabled:hover:opacity-80 duration-200 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Alocar
        </button>
      </DialogActions>
    </Dialog>
  );
}
