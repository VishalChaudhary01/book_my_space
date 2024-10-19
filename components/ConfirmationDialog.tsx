import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "./ui/button";

interface ConfirmationDialogProps {
     id: string;
     header: string;
     buttonName: string;
     open: boolean;
     setOpen: (o: boolean) => void;
     handleClick: (id: string) => void;
}
export function ConfirmationDialog({ header, buttonName, id,  open, setOpen, handleClick }: ConfirmationDialogProps) {
     return (
          <Dialog open={open} onOpenChange={setOpen}>
               <DialogContent className="sm:max-w-[425px] flex-center flex-col">
                    <DialogHeader>
                         <DialogTitle className="text-xl font-bold text-gray-600">{header}</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                         <Button onClick={() => {
                              handleClick(id);
                              setOpen(false);
                              }} type="submit" className="bg-purple-1 hover:bg-purple-3">{buttonName}
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}