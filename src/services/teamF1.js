
export async function getTeam() {
    const res = await fetch(
        `https://api.jolpi.ca/ergast/f1/2026/constructors/`
    );

    const teams = await res.json();
    const standings = teams.MRData.ConstructorTable.Constructors;

    const audiTeam = standings.filter(
        tm => tm.constructorId === "audi"
    );
    
    return audiTeam;
    
}