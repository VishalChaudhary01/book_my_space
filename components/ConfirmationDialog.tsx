import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "./ui/button";

interface ConfirmationDialogProps {
     id?: string;
     title: string;
     desc?: string;
     buttonName?: string;
     open: boolean;
     setOpen: (o: boolean) => void;
     handleClick?: (id: string) => void;
}

export function ConfirmationDialog({ title, desc, buttonName, id,  open, setOpen, handleClick }: ConfirmationDialogProps) {
     return (
          <Dialog open={open} onOpenChange={setOpen}>
               <DialogContent className="sm:max-w-[425px] flex-center flex-col gap-4">
                    <DialogHeader>
                         <DialogTitle className="text-xl font-bold text-green-600">{title}</DialogTitle>
                    </DialogHeader>
                    {desc && <DialogTitle className="text-base font-semibold text-gray-600">{desc}</DialogTitle>}
                    <DialogFooter>                         
                         {(id && handleClick) && <Button onClick={() => {
                                   handleClick(id);
                                   setOpen(false);
                                   }} type="submit"
                                   >
                                        {buttonName}
                              </Button>
                         }
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}