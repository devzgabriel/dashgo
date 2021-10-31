import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { PaginationItem } from './PaginationItem'

type PaginationProps = {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onChange: (page: number) => void
}

const SIBLINGS_COUNT = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + SIBLINGS_COUNT, lastPage)
        )
      : []

  return (
    <Stack
      direction={['column', 'row']}
      spacing='6'
      mt='8'
      justify='space-between'
      align='center'
    >
      <Box>
        <strong> 0 </strong> - <strong> 10 </strong> de <strong> 100 </strong>
      </Box>
      <Stack direction='row' spacing='2'>
        {currentPage > 1 + SIBLINGS_COUNT && (
          <>
            <PaginationItem onClick={onChange} number={1} />
            {currentPage > 2 + SIBLINGS_COUNT && (
              <Text color='gray.300' width='8' textAlign='center'>
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem onClick={onChange} key={page} number={page} />
          ))}

        <PaginationItem onClick={onChange} number={currentPage} isCurrent />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem onClick={onChange} key={page} number={page} />
          ))}

        {currentPage + SIBLINGS_COUNT < lastPage && (
          <>
            {currentPage + SIBLINGS_COUNT + 1 < lastPage && (
              <Text color='gray.300' width='8' textAlign='center'>
                ...
              </Text>
            )}
            <PaginationItem onClick={onChange} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  )
}
