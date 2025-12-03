export const fromIsoDate = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });
    return formattedDate;
}