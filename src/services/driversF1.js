
export async function getDriver() {
    const res = await fetch(
        `https://api.jolpi.ca/ergast/f1/2026/driverstandings/`
    );

    const drivers = await res.json();
    const standings = drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    const audiDrivers = standings.filter(
        dr => dr.Constructors[0].constructorId === "audi"
    )
    
    return audiDrivers;
    
}