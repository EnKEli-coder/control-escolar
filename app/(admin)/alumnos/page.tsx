"use client"
import { getAlumnoColumns } from "./columns";
import DataTable from "@/components/data-table";
import Paginacion from "@/components/paginacion";
import Buscador from "@/components/buscador";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { createAlumno, deleteAlumno, getAlumnoById, getAlumnos, updateAlumno } from "@/app/api/alumnos/AlumnosApi";
import AlumnoDialog from "./components/AlumnoDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialStateData: PaginatedList<AlumnoResponse> = {
  items: [],
  page: 1,
  pageSize: 10,
  totalCount: 0,
  hasNextPage: false,
  hasPreviousPage: false
}

const Alumnos = () => {


  const [data, setData] = useState<PaginatedList<AlumnoResponse>>(initialStateData)
  const [busqueda, setBusqueda] = useState<string>("")
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [selectedAlumnoToDelete, setSelectedAlumnoToDelete] = useState<AlumnoResponse | null>(null);
  const [selectedAlumnoToUpdate, setSelectedAlumnoToUpdate] = useState<Alumno | null>(null);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)

  useEffect(() => {

    (async function () {
      const result = await getAlumnos();
      if (result) {
        setData(result)
      }
    })();
  }
    , [])

  const handleSearch = async () => {
    try {
      const result = await getAlumnos(busqueda);
      setData(result)

    } catch (error: any) {
      const message = error.response?.data?.title || "Error al crear el alumno";

      toast.error("Hubo un problema", {
        description: message,
      });
    }

  }

  const handlePagination = async (page: number) => {
    try {
      const result = await getAlumnos(busqueda, page);
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

      let alumno: AlumnoCreate = {
        nombre: formData.get("nombre") as string,
        apellidoPaterno: formData.get("apellidoPaterno") as string,
        apellidoMaterno: formData.get("apellidoMaterno") as string,
        correo: formData.get("correo") as string,
        fechaNacimiento: formData.get("fechaNacimiento") as string,
        estatus: formData.get("estatus") === "true",
      }

      const result = await createAlumno(alumno)

      if (result) {
        const alumnos = await getAlumnos();
        setData(alumnos)
      }

      setOpenCreate(false)

      toast.success("Alumno creado", {
        description: "El alumno fue creado correctamente",
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
    setSelectedAlumnoToDelete(null);
  }

  const openDeleteConfirmation = async (alumno: AlumnoResponse) => {
    setSelectedAlumnoToDelete(alumno);
    setOpenConfirmation(true);
  }

  const handleDelete = async () => {
    try {
      if (selectedAlumnoToDelete) {
        if (selectedAlumnoToDelete) {
          const result = await deleteAlumno(selectedAlumnoToDelete.id);

          if (result) {
            const alumnos = await getAlumnos();
            setData(alumnos)
          }

          setOpenConfirmation(false)
          setSelectedAlumnoToDelete(null)

          toast.success("Alumno eliminado", {
            description: "El alumno fue eliminado correctamente",
          });
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.title || "Error al eliminar el alumno";

      setOpenConfirmation(false)
      setSelectedAlumnoToDelete(null)

      toast.error("Hubo un problema", {
        description: message,
      });
    }
  }

  const handleOpenUpdate = async (alumno: AlumnoResponse) => {
      try {

        let data = await getAlumnoById(alumno.id)

        if(data) {
          setSelectedAlumnoToUpdate(data);
          setOpenUpdate(true)
        }

      }catch(error: any) {
        const message = error.response?.data?.title || "Error al obtener datos del alumno";
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

      if(selectedAlumnoToUpdate == null) {
        toast.error("Hubo un problema", {
          description: "No se pudo obtener el alumno",
        });

        return
      }

      let alumno: AlumnoUpdate = {
        id: selectedAlumnoToUpdate.id,
        nombre: formData.get("nombre") as string,
        apellidoPaterno: formData.get("apellidoPaterno") as string,
        apellidoMaterno: formData.get("apellidoMaterno") as string,
        correo: formData.get("correo") as string,
        fechaNacimiento: formData.get("fechaNacimiento") as string,
        estatus: formData.get("estatus") === "true",
      }

      const result = await updateAlumno(alumno)

      setData(prev => ({
        ...prev,
        items: prev.items.map(alumno =>
          alumno.id === result.id ? result : alumno
        )
      }));

      setOpenUpdate(false)

      toast.success("Alumno actualizado", {
        description: "El alumno fue actualizado correctamente",
      });
    } catch (error: any) {
      const message = error.response?.data?.title || "Error al obtener los registros";

      setOpenUpdate(false)

      toast.error("Hubo un problema", {
        description: message,
      });
    }
  }

  const columns = getAlumnoColumns({
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
            <AlertDialogTitle>Estas seguro de eliminar {selectedAlumnoToDelete?.numeroControl}?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDeleteConfirmation}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlumnoDialog isOpen={openCreate} setOpen={setOpenCreate} onSubmit={handleCreate} />
      {selectedAlumnoToUpdate && (
        <AlumnoDialog isOpen={openUpdate} setOpen={setOpenUpdate} onSubmit={handleUpdate} data={selectedAlumnoToUpdate}/>
      )}
    </div>
  )
}

export default Alumnos;
