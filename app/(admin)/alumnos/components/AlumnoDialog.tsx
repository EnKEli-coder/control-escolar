import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@radix-ui/react-label";
import { Dispatch, FormEvent, SetStateAction } from "react";

type DialogProps = {
  isOpen: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>,
  data?: Alumno,
}

const AlumnoDialog = ({isOpen, setOpen, onSubmit, data} : DialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>Crear nuevo</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px] [&_[data-dialog-close]]:hidden" aria-describedby={undefined}>
        <DialogHeader>
          {data? (
            <DialogTitle>Actualizar {data.numeroControl}</DialogTitle>
          ): (
            <DialogTitle>Crear nuevo</DialogTitle>
          )}
          
        </DialogHeader>
        <form onSubmit={onSubmit} id="form-dialog">
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label 
                htmlFor="nombre" 
                className="text-left">
                Nombre
              </Label>
              <Input 
                id="nombre" 
                defaultValue={data?.nombre} 
                name="nombre" 
                className="col-span-3" 
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="apellidoPaterno" className="text-left">
                Apellido paterno
              </Label>
              <Input 
                id="apellidoPaterno" 
                defaultValue={data?.apellidoPaterno} 
                name="apellidoPaterno" 
                className="col-span-3" 
                required 
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="apellidoMaterno" className="text-left">
                Apellido Materno
              </Label>
              <Input 
                id="apellidoMaterno" 
                defaultValue={data?.apellidoMaterno} 
                name="apellidoMaterno" 
                className="col-span-3" 
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="correo" className="text-left">
                Correo
              </Label>
              <Input 
                id="correo" 
                name="correo" 
                defaultValue={data?.correo} 
                type="email" 
                className="col-span-3" 
                required 
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="fechaNacimiento" className="text-left">
                Fecha de nacimiento
              </Label>
              <Input 
                id="fechaNacimiento" 
                name="fechaNacimiento" 
                defaultValue={data ? new Date(data?.fechaNacimiento).toISOString().split("T")[0] : ""} 
                type="date" 
                className="col-span-3" 
                required 
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Estatus</label>
              <Select name="estatus" defaultValue={data?.estatus ? "true" : "false"} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Activo</SelectItem>
                  <SelectItem value="false">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        <DialogFooter>
          {data? (
            <Button type="submit" form="form-dialog">Guardar</Button>
          ) : (
            <Button type="submit" form="form-dialog">Crear</Button>
          )}
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}
export default AlumnoDialog;