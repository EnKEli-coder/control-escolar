"use client"
import { getTipoPersonalColumns } from "./columns";
import DataTable from "@/components/data-table";
import Paginacion from "@/components/paginacion";
import Buscador from "@/components/buscador";
import { FormEvent, useEffect, useState } from "react";
import TipoPersonalDialog from "./components/TipoPersonalDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createTipoPersonal, deleteTipoPersonal, getTipoPersonalById, getTiposPersonal, updateTipoPersonal } from "@/app/api/tiposPersonal/TiposPersonalApi";

const initialStateData: PaginatedList<TipoPersonal> = {
  items: [],
  page: 1,
  pageSize: 10,
  totalCount: 0,
  hasNextPage: false,
  hasPreviousPage: false
}

const TiposPersonal = () => {


  const [data, setData] = useState<PaginatedList<TipoPersonal>>(initialStateData)
  const [busqueda, setBusqueda] = useState<string>("")
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [selectedTipoPersonalToDelete, setSelectedTipoPersonalToDelete] = useState<TipoPersonal | null>(null);
  const [selectedTipoPersonalToUpdate, setSelectedTipoPersonalToUpdate] = useState<TipoPersonal | null>(null);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)

  useEffect(() => {

    (async function () {
      const result = await getTiposPersonal();
      if (result) {
        setData(result)
      }
    })();
  }
    , [])

  const handleSearch = async () => {
    try {
      const result = await getTiposPersonal(busqueda);
      setData(result)

    } catch (error: any) {
      const message = error.response?.data?.title || "Error al crear el tipo de personal";

      toast.error("Hubo un problema", {
        description: message,
      });
    }

  }

  const handlePagination = async (page: number) => {
    try {
      const result = await getTiposPersonal(busqueda, page);
      setData(result)
    } catch (error: any) {
      const message = error.response?.data?.title || "Error al obtener los registros";

      toast.error("Hubo un problema", {
        description: message,
      });
    }
  }

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);

      let tipoPersonal: TipoPersonalCreate = {
        prefijo: formData.get("prefijo") as string,
        nombre: formData.get("nombre") as string,
        sueldoMinimo: Number(formData.get("sueldoMinimo")?.toString() || 0),
        sueldoMaximo: Number(formData.get("sueldoMaximo")?.toString() || 0),
      }

      const result = await createTipoPersonal(tipoPersonal)

      if (result) {
        const tiposPersonal = await getTiposPersonal();
        setData(tiposPersonal)
      }

      setOpenCreate(false)

      toast.success("Tipo de personal creado", {
        description: "El tipo de personal fue creado correctamente",
      });
    } catch (error: any) {
      const message = error.response?.data?.title || "Error al obtener los registros";

      setOpenCreate(false)

      toast.error("Hubo un problema", {
        description: message,
      });
    }

  }

  const closeDeleteConfirmation = async () => {
    setOpenConfirmation(false);
    setSelectedTipoPersonalToDelete(null);
  }

  const openDeleteConfirmation = async (tipoPersonal: TipoPersonal) => {
    setSelectedTipoPersonalToDelete(tipoPersonal);
    setOpenConfirmation(true);
  }

  const handleDelete = async () => {
    try {
      if (selectedTipoPersonalToDelete) {
        if (selectedTipoPersonalToDelete) {
          const result = await deleteTipoPersonal(selectedTipoPersonalToDelete.id);

          if (result) {
            const tiposPersonal = await getTiposPersonal();
            setData(tiposPersonal)
          }

          setOpenConfirmation(false)
          setSelectedTipoPersonalToDelete(null)

          toast.success("Tipo de personal eliminado", {
            description: "El tipo de personal fue eliminado correctamente",
          });
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.title || "Error al eliminar el tipo de personal";

      setOpenConfirmation(false)
      setSelectedTipoPersonalToDelete(null)

      toast.error("Hubo un problema", {
        description: message,
      });
    }
  }

  const handleOpenUpdate = async (tipoPersonal: TipoPersonal) => {
      try {

        let data = await getTipoPersonalById(tipoPersonal.id)

        if(data) {
          setSelectedTipoPersonalToUpdate(data);
          setOpenUpdate(true)
        }

      }catch(error: any) {
        const message = error.response?.data?.title || "Error al obtener datos del tipo de personal";
        toast.error("Hubo un problema", {
          description: message,
        });
      }
  }

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);

      if(selectedTipoPersonalToUpdate == null) {
        toast.error("Hubo un problema", {
          description: "No se pudo obtener el tipo de personal",
        });

        return
      }

      let tipoPersonal: TipoPersonalUpdate = {
        id: selectedTipoPersonalToUpdate.id,
        nombre: formData.get("nombre") as string,
        sueldoMinimo: Number(formData.get("sueldoMinimo")?.toString() || 0),
        sueldoMaximo: Number(formData.get("sueldoMaximo")?.toString() || 0),
      }

      const result = await updateTipoPersonal(tipoPersonal)

      setData(prev => ({
        ...prev,
        items: prev.items.map(tipoPersonal =>
          tipoPersonal.id === result.id ? result : tipoPersonal
        )
      }));

      setOpenUpdate(false)

      toast.success("Tipo de personal actualizado", {
        description: "El tipo de personal fue actualizado correctamente",
      });
    } catch (error: any) {
      const message = error.response?.data?.title || "Error al obtener los registros";

      setOpenUpdate(false)

      toast.error("Hubo un problema", {
        description: message,
      });
    }
  }

  const columns = getTipoPersonalColumns({
    onEdit: handleOpenUpdate,
    onDelete: openDeleteConfirmation
  });

  return (
    <div className="flex flex-col gap-4 min-h-full items-center p-[80px]">
      <section className="flex justify-between w-full">
        <Buscador
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          handleSearch={handleSearch}
        />
        <Button variant="outline" onClick={() => setOpenCreate(true)}>Crear nuevo</Button>
      </section>
      <DataTable columns={columns} data={data.items} />
      <Paginacion
        page={data.page}
        hasNextPage={data.hasNextPage}
        hasPreviousPage={data.hasPreviousPage}
        handlePagination={handlePagination}
      />
      <AlertDialog open={openConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro de eliminar {selectedTipoPersonalToDelete?.nombre}?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará el personal registrado con este tipo. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDeleteConfirmation}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <TipoPersonalDialog isOpen={openCreate} setOpen={setOpenCreate} onSubmit={handleCreate} />
      {selectedTipoPersonalToUpdate && (
        <TipoPersonalDialog isOpen={openUpdate} setOpen={setOpenUpdate} onSubmit={handleUpdate} data={selectedTipoPersonalToUpdate}/>
      )}
    </div>
  )
}

export default TiposPersonal;
