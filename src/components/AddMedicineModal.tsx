
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialForm = { name: "", dosage: "", stock: 0, supplier: "" };

export default function AddMedicineModal({ onAdd }: { onAdd: (data: any) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-2">Add Medicine</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Medicine</DialogTitle>
          <DialogDescription>Enter medicine details to add to inventory.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Medicine Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Input placeholder="Dosage" value={form.dosage} onChange={e => setForm(f => ({ ...f, dosage: e.target.value }))} />
          <Input placeholder="Stock" type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))} />
          <Input placeholder="Supplier" value={form.supplier} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))} />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              onAdd(form);
              setOpen(false);
              setForm(initialForm);
            }}
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
