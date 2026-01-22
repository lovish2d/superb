import { Box, Grid } from '@mui/material';
import type { Stand } from '@/types/stand.types';
import StandCard from './StandCard';

type StandsGridProps = {
    stands: Stand[];
    selectedIds: string[];
    onSelectionChange: (selectedIds: string[]) => void;
};

const StandsGrid = ({ stands, selectedIds, onSelectionChange }: StandsGridProps) => {

    const handleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
        } else {
            onSelectionChange([...selectedIds, id]);
        }
    };

    return (
        <Box sx={{ p: 3, width: '100%', boxSizing: 'border-box' }}>
            <Grid container spacing={3}>
                {stands.map((stand) => (
                    <Grid item xs={12} sm={6} lg={4} xl={4} key={stand.id}>
                        <StandCard
                            stand={stand}
                            selected={selectedIds.includes(stand.id)}
                            onSelect={() => handleSelect(stand.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default StandsGrid;
