import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PaginacionProps = { 
  page: number, 
  hasNextPage: boolean, 
  hasPreviousPage: boolean, 
  handlePagination: (page: number) => Promise<void>
}

const Paginacion = ({page, hasNextPage, hasPreviousPage, handlePagination}: PaginacionProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious inert={!hasPreviousPage} onClick={() => handlePagination(page - 1)}/>
        </PaginationItem>
        { hasPreviousPage && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePagination(page - 1)}>{page - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive={true} >{page}</PaginationLink>
        </PaginationItem>
        { hasNextPage && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePagination(page + 1)}>{page + 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext inert={!hasNextPage} onClick={() => handlePagination(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Paginacion;