import { useEffect, useState } from "react";
import { getDriver } from "../services/driversF1";
import { getTeam } from "../services/teamF1";


export default function DriversTeam() {
    const [drivers, setDrivers] = useState(null);
    const [team, setTeam] = useState(null);

    useEffect(() => {
            async function load() {
                const response = await getDriver();
                setDrivers(response);
            }
            load();
        }, []
    )

    useEffect(() => {
            async function load() {
                const response = await getTeam();
                setTeam(response);
            }
            load();
        }, []
    )

}
