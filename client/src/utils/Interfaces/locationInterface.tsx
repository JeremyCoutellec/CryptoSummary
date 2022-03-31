import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

export const locationList = [
    1, // 1 - Bureau
    2, // 2 - Maison
    3, // 3 - Déplacement
];

export const locationAlertList = [
    0, // 0 - Toutes
    1, // 1 - Bureau
    2, // 2 - Maison
    3, // 3 - Déplacement
];

export const getLocationIconByType = (type) => {
    switch (parseInt(type)) {
        case 0:
        default:
            return TravelExploreIcon;
        case 1:
            return WorkIcon;
        case 2:
            return HomeIcon;
        case 3:
            return DirectionsCarIcon;
    }
};

export const getColorLocation = (value, theme) => {
    switch (parseInt(value)) {
        case 0:
        default:
            return theme.palette.secondary.main;
        case 1:
            return theme.palette.success.main;
        case 2:
            return theme.palette.primary.light;
        case 3:
            return theme.palette.error.light;
    }
};
