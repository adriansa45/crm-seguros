"use client"
import React from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

type field = {
    id: string,
    name: string
}

export default function App({placeholder, options} : {placeholder: string, options : field[]} ) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Autocomplete 
        label={placeholder}
        className="max-w-xs"
        isDisabled={options.length < 1}
      >
        {options.map((op) => (
          <AutocompleteItem key={op.id} value={op.name}>
            {op.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
