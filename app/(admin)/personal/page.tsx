"use client"
import { getPersonalColumns } from "./columns";
import DataTable from "@/components/data-table";
import Paginacion from "@/components/paginacion";
import Buscador from "@/components/buscador";
import { FormEvent, useEffect, useState } from "react";
import AlumnoDialog from "./components/PersonalDialog";
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
import { createPersonal, deletePersonal, getPersonal, getPersonalById, updatePersonal } from "@/app/api/personal/PersonalApi";
import { getAllTiposPersonal } from "@/app/api/tiposPersonal/TiposPersonalApi";

const initialStateData: PaginatedList<PersonalResponse> = {
  items: [],
  page: 1,
  pageSize: 10,
  totalCount: 0,
  hasNextPage: false,
  hasPreviousPage: false
}

const Personal = () => {


  const [data, setData] = useState<PaginatedList<PersonalResponse>>(initialStateData)
  const [busqueda, setBusqueda] = useState<string>("")
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [selectedPersonalToDelete, setSelectedPersonalToDelete] = useState<PersonalResponse | null>(null);
  const [selectedPersonalToUpdate, setSelectedPersonalToUpdate] = useState<PersonalUpdateData | null>(null);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)

  useEffect(() => {

    (async function () {
      try{
        const personalData = await getPersonal();
        const tiposData = await getAllTiposPersonal();


        if (personalData && tiposData) {
          setData(personalData)
          setSelectedPersonalToUpdate(prev => ({
            ...prev,
            tiposPersonal: tiposData
          }))
        }
      }catch(err:any){

      }
      

      
    })();
  }
    , [])

  const handleSearch = async () => {
    try {
      const result = await getPersonal(busqueda);
      setData(result)
      
    } catch (error: any) {
      const message = error.response?.data?.title || "Error al crear el personal";

      toast.error("Hubo un problema", {
        description: message,
      });
    }

  }

  const handlePagination = async (page: number) => {
    try {
      const result = await getPersonal(busqueda, page);
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

      let personal: PersonalCreate = {
        nombre: formData.get("nombre") as string,
        apellidoPaterno: formData.get("apellidoPaterno") as string,
        apellidoMaterno: formData.get("apellidoMaterno") as string,
        correo: formData.get("correo") as string,
        fechaNacimiento: formData.get("fechaNacimiento") as string,
        estatus: formData.get("estatus") === "true",
        sueldo: Number(formData.get("sueldo")?.toString() || 0),
        tipoPersonalId: Number(formData.get("tipoPersonal")?.toString() || 0),
      }

      const result = await createPersonal(personal)

      if (result) {
        const personalResult = await getPersonal();
        setData(personalResult)
      }

      setOpenCreate(false)

      toast.success("Personal creado", {
        description: "El personal fue creado correctamente",
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
    setSelectedPersonalToDelete(null);
  }

  const openDeleteConfirmation = async (personal: PersonalResponse) => {
    setSelectedPersonalToDelete(personal);
    setOpenConfirmation(true);
  }

  const handleDelete = async () => {
    try {
      if (selectedPersonalToDelete) {
        if (selectedPersonalToDelete) {
          const result = await deletePersonal(selectedPersonalToDelete.id);

          if (result) {
            const personalResult = await getPersonal();
            setData(personalResult)
          }

          setOpenConfirmation(false)
          setSelectedPersonalToDelete(null)

          toast.success("Personal eliminado", {
            description: "El personal fue eliminado correctamente",
          });
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.title || "Error al eliminar el personal";

      setOpenConfirmation(false)
      setSelectedPersonalToDelete(null)

      toast.error("Hubo un problema", {
        description: message,
      });
    }
  }

  const handleOpenUpdate = async (personal: PersonalResponse) => {
      try {

        let personalResult: Personal = await getPersonalById(personal.id)

        if(personalResult) {
          setSelectedPersonalToUpdate(prev => ({
            ...prev,
            personal: personalResult
          }));
          setOpenUpdate(true)
        }

      }catch(error: any) {
        const message = error.response?.data?.title || "Error al obtener datos del personal";
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

      if(selectedPersonalToUpdate?.personal == null) {
        toast.error("Hubo un problema", {
          description: "No se pudo obtener el personal",
        });

        return
      }

      let personal: PersonalUpdate = {
        id: selectedPersonalToUpdate.personal.id,
        nombre: formData.get("nombre") as string,
        apellidoPaterno: formData.get("apellidoPaterno") as string,
        apellidoMaterno: formData.get("apellidoMaterno") as string,
        correo: formData.get("correo") as string,
        fechaNacimiento: formData.get("fechaNacimiento") as string,
        estatus: formData.get("estatus") === "true",
        sueldo: Number(formData.get("sueldo")?.toString() || 0),
        tipoPersonalId: Number(formData.get("tipoPersonal")?.toString() || 0),
      }

      const result = await updatePersonal(personal)

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

  const columns = getPersonalColumns({
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
            <AlertDialogTitle>Estas seguro de eliminar {selectedPersonalToDelete?.numeroControl}?</AlertDialogTitle>
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
      {selectedPersonalToUpdate?.tiposPersonal &&
        <AlumnoDialog isOpen={openCreate} setOpen={setOpenCreate} onSubmit={handleCreate} data={selectedPersonalToUpdate}/>
      }
      {selectedPersonalToUpdate?.personal && selectedPersonalToUpdate?.tiposPersonal && (
        <AlumnoDialog isOpen={openUpdate} setOpen={setOpenUpdate} onSubmit={handleUpdate} data={selectedPersonalToUpdate}/>
      )}
    </div>
  )
}

export default Personal;
