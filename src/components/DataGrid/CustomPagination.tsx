import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';


export function CustomPagination({ count, pageSizeOption, }: any) {
        const apiRef = useGridApiContext();
        const page = useGridSelector(apiRef, gridPageSelector);
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);


        if (count === undefined || count <= 10 ) {
                return null;
        }
        return (
                <Stack className="custom-pagination" direction={'row'} justifyContent={'end'} flex={1} px={2}>
                      
                <Pagination sx={{border:'none '}}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                        showFirstButton 
                        showLastButton 
                        siblingCount={1}
                        page={page + 1}
                        count={count ? Math.ceil(count / pageSizeOption) : pageCount}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        renderItem={(props2) => <PaginationItem slots={{ previous: KeyboardArrowLeftIcon, next: KeyboardArrowRightIcon ,last:KeyboardDoubleArrowRightIcon ,first:KeyboardDoubleArrowLeftIcon }} {...props2} disableRipple />}
                        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
                                apiRef.current && apiRef.current.setPage(value - 1)
                        }
                />
                </Stack>
        );
}