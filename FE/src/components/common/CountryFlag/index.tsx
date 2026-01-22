import { Box, alpha } from '@mui/material';
import { brandColors } from '@/theme';

type CountryFlagProps = {
    countryCode: string;
};

const CountryFlag = ({ countryCode }: CountryFlagProps) => {
    const code = countryCode.toUpperCase();

    const getBackground = (c: string) => {
        switch (c) {
            case 'DE':
                return 'linear-gradient(to bottom, #000000 33%, #DD0000 33%, #DD0000 66%, #FFCE00 66%)';
            case 'AE':
                // UAE: Red vertical bar (left), Green (top), White (middle), Black (bottom) horizontal
                return 'linear-gradient(to right, #FF0000 25%, transparent 25%), linear-gradient(to bottom, #00732F 33%, #FFFFFF 33%, #FFFFFF 66%, #000000 66%)';
            case 'QA':
                // Qatar: Maroon with white serrated band on hoist side. Simplified as maroon with white left side for CSS only
                return 'linear-gradient(to right, #FFFFFF 25%, #8A1538 25%)';
            case 'US':
                // Simplified US: Stripes (Red/White) + Blue Canton.
                return 'linear-gradient(to bottom, #B22234 0%, #B22234 10%, #FFFFFF 10%, #FFFFFF 20%, #B22234 20%, #B22234 30%, #FFFFFF 30%, #FFFFFF 40%, #B22234 40%, #B22234 50%, #FFFFFF 50%, #FFFFFF 60%, #B22234 60%, #B22234 70%, #FFFFFF 70%, #FFFFFF 80%, #B22234 80%, #B22234 90%, #FFFFFF 90%, #FFFFFF 100%), linear-gradient(to right, #3C3B6E 40%, transparent 40%)';
            // Better simplified US for small scale: Blue box top left, stripes elsewhere.
            // Actually, for a 20x15 icon, detailed stripes/stars are hard.
            // Let's use a solid approach if complex gradients are too much.
            // Reverting to the simpler style used in StandsOverview if applicable, but expanding.
            case 'UK':
                return 'linear-gradient(90deg, #00247d 0%, #00247d 100%)'; // Placeholder for complex Union Jack
            default:
                return brandColors.neutral[200];
        }
    };

    // Specific overrides for complex flags to ensure they look okay at small size
    if (code === 'AE') {
        return (
            <Box sx={{ position: 'relative', width: 20, height: 15, borderRadius: '2px', boxShadow: `0 0 1px ${alpha(brandColors.neutral[900], 0.2)}`, overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '25%', backgroundColor: '#FF0000' }} />
                <Box sx={{ position: 'absolute', right: 0, top: 0, height: '33.33%', width: '75%', backgroundColor: '#00732F' }} />
                <Box sx={{ position: 'absolute', right: 0, top: '33.33%', height: '33.33%', width: '75%', backgroundColor: '#FFFFFF' }} />
                <Box sx={{ position: 'absolute', right: 0, bottom: 0, height: '33.33%', width: '75%', backgroundColor: '#000000' }} />
            </Box>
        )
    }

    if (code === 'US') {
        return (
            <Box sx={{ position: 'relative', width: 20, height: 15, borderRadius: '2px', boxShadow: `0 0 1px ${alpha(brandColors.neutral[900], 0.2)}`, overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                {/* Stripes */}
                {[...Array(7)].map((_, i) => (
                    <Box key={i} sx={{ position: 'absolute', left: 0, right: 0, top: `${i * 14.28}%`, height: '7.14%', backgroundColor: '#B22234' }} />
                ))}
                {/* Canton */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '50%', backgroundColor: '#3C3B6E' }} />
            </Box>
        )
    }

    if (code === 'QA') {
        return (
            <Box sx={{ width: 20, height: 15, borderRadius: '2px', boxShadow: `0 0 1px ${alpha(brandColors.neutral[900], 0.2)}`, background: 'linear-gradient(to right, #FFFFFF 25%, #8A1538 25%)' }} />
        )
    }

    return (
        <Box
            sx={{
                width: 20,
                height: 15,
                borderRadius: '2px',
                background: getBackground(code),
                boxShadow: `0 0 1px ${alpha(brandColors.neutral[900], 0.2)}`,
                flexShrink: 0,
            }}
        />
    );
};

export default CountryFlag;
