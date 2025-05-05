import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogTitle, } from "@/components/ui/dialog";
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
  data?: PersonalUpdateData,
}

const PersonalDialog = ({ isOpen, setOpen, onSubmit, data }: DialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] [&_[data-dialog-close]]:hidden" aria-describedby={undefined}>
        <DialogHeader>
          {data?.personal ? (
            <DialogTitle>Actualizar {data.personal?.numeroControl}</DialogTitle>
          ) : (
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
                defaultValue={data?.personal?.nombre}
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
                defaultValue={data?.personal?.apellidoPaterno}
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
                defaultValue={data?.personal?.apellidoMaterno}
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
                defaultValue={data?.personal?.correo}
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
                defaultValue={data?.personal ? new Date(data.personal.fechaNacimiento).toISOString().split("T")[0] : ""}
                type="date"
                className="col-span-3"
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="sueldo" className="text-left">
                Sueldo
              </Label>
              <Input
                id="sueldo"
                name="sueldo"
                defaultValue={data?.personal?.sueldo}
                type="number"
                className="col-span-3"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Estatus</label>
              <Select name="estatus" defaultValue={data?.personal?.estatus ? "true" : "false"} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Activo</SelectItem>
                  <SelectItem value="false">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Tipo de personal</label>
              {data?.tiposPersonal && (
                <Select name="tipoPersonal" defaultValue={data?.personal?.tipoPersonalId ? data.personal.tipoPersonalId.toString() : undefined} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.tiposPersonal.map((tipo) => {
                      return (
                        <SelectItem value={tipo.id.toString()} key={"tipo-"+tipo.id}>{tipo.nombre}</SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </form>
        <DialogFooter>
          {data?.personal ? (
            <Button type="submit" form="form-dialog">Guardar</Button>
          ) : (
            <Button type="submit" form="form-dialog">Crear</Button>
          )}

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}
export default PersonalDialog;