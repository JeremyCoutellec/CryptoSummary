export const priorityList = [
    0, // 0 - Très haute
    1, // 1 - Haute
    2, // 2 - Moyenne
    3, // 3 - Faible
    4, // 4 - Très faible
];

export const priorityTopicList = [
    0, // 0 - Très haute
    1, // 1 - Haute
    2, // 2 - Moyenne
    3, // 3 - Faible
    4, // 4 - Très faible
];

export const priorityAlertList = [
    0, // À statuer Fréquence de déclenchement d’une même alerte : 1 semaine
    1, // Très haute : Fréquence de déclenchement d’une même alerte : 1 min
    2, // Haute : Fréquence de déclenchement d’une même alerte : 10min
    3, // Moyenne : Fréquence de déclenchement d’une même alerte : 1h
    4, // Faible : Fréquence de déclenchement d’une même alerte : 4h
    5, // Très faible : Fréquence de déclenchement d’une même alerte : 8h
];

export const getColorByPriorityAlert = (value, theme) => {
    switch (parseInt(value)) {
        case 0:
            return theme?.palette?.secondary?.main;
        case 1:
            return theme?.palette?.error?.main;
        case 2:
            return theme?.palette?.warning?.main;
        case 3:
            return theme?.palette?.primary?.main;
        case 4:
            return theme?.palette?.primary?.light;
        case 5:
            return theme?.palette?.secondary?.dark;
        default:
            return null;
    }
};
