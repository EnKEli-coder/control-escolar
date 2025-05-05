"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

type ColumnProps = {
  onEdit: (tipoPersonal: TipoPersonal) => void
  onDelete: (tipoPersonal: TipoPersonal) => void
};

export const getTipoPersonalColumns = ({ onEdit, onDelete }: ColumnProps): ColumnDef<TipoPersonal>[] => [

  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "sueldoMinimo",
    header: "Sueldo mínimo",
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("sueldoMinimo"));
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(value);
    }
  },
  {
    accessorKey: "sueldoMaximo",
    header: "Sueldo máximo",
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("sueldoMaximo"));
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(value);
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tipoPersonal = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(tipoPersonal)}
          >
            Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(tipoPersonal)}
          >
            Eliminar
          </Button>
        </div>

      );
    },
  },
]