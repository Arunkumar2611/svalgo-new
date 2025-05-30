import { Button, Pagination, PaginationItem, Stack } from '@mui/material';
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';


export function CustomGridPagination({ count, pageSizeOption, }: any) {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    if (count === undefined || count <= 10) {
        return null;
    }

    const PrevButton = () => <Button>Previous</Button>
    const NextButton = () => <Button>Next</Button>

    return (
        <Stack className="custom-pagination" direction={'row'} justifyContent={'end'} flex={1} px={2}>
            <Pagination sx={{ border: 'none ' }}
                color="primary"
                variant="outlined"
                shape="rounded"
                showFirstButton
                showLastButton
                siblingCount={1}
                page={page + 1}
                count={count ? Math.ceil(count / pageSizeOption) : pageCount}
                renderItem={(props2) => <PaginationItem slots={{ previous: PrevButton, next: NextButton }} {...props2} disableRipple />}
                onChange={(event: React.ChangeEvent<unknown>, value: number) =>
                    apiRef.current && apiRef.current.setPage(value - 1)
                }
            />
        </Stack>
    );
}