"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

type ColumnProps = {
  onEdit: (alumno: AlumnoResponse) => void
  onDelete: (alumno: AlumnoResponse) => void
};

export const getAlumnoColumns = ({ onEdit, onDelete }: ColumnProps): ColumnDef<AlumnoResponse>[] => [

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
    id: "actions",
    cell: ({ row }) => {
      const alumno = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(alumno)}
          >
            Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(alumno)}
          >
            Eliminar
          </Button>
        </div>

      );
    },
  },
]