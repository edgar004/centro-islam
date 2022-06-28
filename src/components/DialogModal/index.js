import { Dialog } from "@mui/material";

export default function DialogModal({ component, open, setOpen }) {
  return (
    <Dialog maxWidth={"md"} open={open} onClose={() => setOpen(false)}>
      {component}
    </Dialog>
  );
}
