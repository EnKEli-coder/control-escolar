import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

type BuscadorProps = {
    busqueda: string,
    setBusqueda: (valor:string) => void,
    handleSearch: () => void
}

const Buscador = ({ busqueda, setBusqueda, handleSearch }: BuscadorProps) => {
    return (
        <div className="flex gap-2 self-start">
            <Input 
                placeholder="Buscar por Numero de control"
                className="w-fit"
                onChange={(e) => setBusqueda(e.target.value)}
                value={busqueda}
            />
            <Button size="icon" onClick={() => handleSearch()}>
                <Search/>
            </Button>
        </div>
    )
}

export default Buscador;