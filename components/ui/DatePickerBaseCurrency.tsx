
"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalenderIcon } from "@/svg-icons/SVGIcons";

type DatePickerProps = {
    placeholder: string;
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
};

export default function DatePicker({ placeholder, value, onChange }: DatePickerProps) {
    const [date, setDate] = React.useState<Date>();

    // Update the internal state if the prop `value` changes
    React.useEffect(() => {
        setDate(value);
    }, [value]);

    // Handle selecting a new date
    const handleChange = (date: Date | undefined) => {
        setDate(date);
        onChange(date);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full mt-2 text-base rounded-[10px] h-12 justify-between text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    {date ? (
                        format(date, "MMMM dd")
                    ) : (
                        <span className="text-[#E8E8E8]">{placeholder}</span>
                    )}
                    <CalenderIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={value} onSelect={handleChange} initialFocus />
            </PopoverContent>
        </Popover>
    );
}