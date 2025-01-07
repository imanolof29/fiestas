export const timeSince = (date: Date): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return ""
    }

    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    const intervals = [
        { label: 'año', seconds: 31536000 },
        { label: 'mes', seconds: 2592000 },
        { label: 'día', seconds: 86400 },
        { label: 'hora', seconds: 3600 },
        { label: 'minuto', seconds: 60 },
        { label: 'segundo', seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `hace ${count} ${interval.label}${count > 1 ? 's' : ''}`;
        }
    }

    return 'Justo ahora';
};