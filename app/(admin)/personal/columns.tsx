"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

type ColumnProps = {
  onEdit: (personal: PersonalResponse) => void
  onDelete: (personal: PersonalResponse) => void
};

export const getPersonalColumns = ({ onEdit, onDelete }: ColumnProps): ColumnDef<PersonalResponse>[] => [

  {
    accessorKey: "numeroControl",
    header: "Numero de control",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "correo",
    header: "Correo",
  },
  {
    accessorKey: "tipoPersonal",
    header: "Tipo de personal",
  },
  {
    accessorKey: "sueldo",
    header: "Sueldo",
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("sueldo"));
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(value);
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tipo = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(tipo)}
          >
            Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(tipo)}
          >
            Eliminar
          </Button>
        </div>

      );
    },
  },
]