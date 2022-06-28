import { Dialog } from "@mui/material";

export default function MessageModal({ message, open, setOpen }) {
  return (
    <Dialog maxWidth={"md"} open={open} onClose={() => setOpen(false)}>
      {message}
    </Dialog>
  );
}
