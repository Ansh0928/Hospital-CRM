
import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const statusOptions = ["Active", "On Leave", "Inactive"];

type Props = {
  value: string;
  onChange: (newStatus: string) => void;
};

const StaffStatusDropdown = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={value === "Active" ? "default" : "secondary"} size="sm">
          {value}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-30 bg-white">
        {statusOptions.map(opt => (
          <DropdownMenuItem
            key={opt}
            onSelect={() => {
              setOpen(false);
              onChange(opt);
            }}
            className={value === opt ? "font-bold" : ""}
          >
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StaffStatusDropdown;
