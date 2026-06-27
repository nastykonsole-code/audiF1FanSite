export async function getSession() {
    const res = await fetch(
        `https://api.jolpi.ca/ergast/f1/2026/races`
    );

    const sessions = await res.json();
    const races = sessions.MRData.RaceTable.Races;

    const now = Date.now();

    return races.find(rc =>
        new Date(`${rc.date}T${rc.time}`).getTime() > now
    );
}