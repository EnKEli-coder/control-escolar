import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogTitle,} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Dispatch, FormEvent, SetStateAction } from "react";

type DialogProps = {
  isOpen: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>,
  data?: TipoPersonal,
}

const TipoPersonalDialog = ({isOpen, setOpen, onSubmit, data} : DialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>Crear nuevo</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px] [&_[data-dialog-close]]:hidden" aria-describedby={undefined}>
        <DialogHeader>
          {data? (
            <DialogTitle>Actualizar {data.nombre}</DialogTitle>
          ): (
            <DialogTitle>Crear nuevo</DialogTitle>
          )}
          
        </DialogHeader>
        <form onSubmit={onSubmit} id="form-dialog">
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label 
                htmlFor="prefijo" 
                className="text-left">
                Prefijo
              </Label>
              <Input 
                id="prefijo" 
                defaultValue={data?.prefijo} 
                readOnly={data ? true : false}
                name="prefijo" 
                className="col-span-3" 
                required
              />
            </div>
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
              <Label htmlFor="sueldoMinimo" className="text-left">
                Sueldo mínimo
              </Label>
              <Input 
                id="sueldoMinimo" 
                defaultValue={data?.sueldoMinimo} 
                type="number"
                name="sueldoMinimo" 
                className="col-span-3" 
                required 
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="sueldoMaximo" className="text-left">
                Sueldo máximo
              </Label>
              <Input 
                id="sueldoMaximo" 
                defaultValue={data?.sueldoMaximo} 
                type="number"
                name="sueldoMaximo" 
                className="col-span-3" 
                required
              />
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
export default TipoPersonalDialog;