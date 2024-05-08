import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";
import CheckboxesGroup from "./CheckboxHourGroup";


interface NewAlocationProps {
    open: boolean;
    handleClose: () => void;
}
export function NewAlocation({open, handleClose}: NewAlocationProps) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                },
            }}
            maxWidth="xl"
      >
            <DialogTitle>Nova alocação para sala de aula</DialogTitle>
            <DialogContent sx={{
                display: "flex",
                gap: "0.4rem",
                flexDirection: "column"
            }}>
            <DialogContentText>
                Para realizar uma alocação, preencha os campos necessários.
            </DialogContentText>
            <TextField
                autoFocus
                required
                id="classroom"
                name="classroom"
                label="Sala de aula"
                type="text"
                fullWidth
                variant="outlined"
            />
              <TextField
                required
                id="teacher"
                name="teacher"
                label="Professor"
                type="text"
                fullWidth
                variant="outlined"
                
            />
           <CheckboxesGroup/>
          
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">Alocar</Button>
            </DialogActions>
      </Dialog>
    )
}