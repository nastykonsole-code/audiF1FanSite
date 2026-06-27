import { useEffect, useState } from "react";
import { getSession } from "../services/clockF1";

export default function NextEventClock() {
    const [session, setSession] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [races, setRaces] = useState([]);

    // 1. fetch data once
    useEffect(() => {
        async function load() {
            const data = await getSession(); 

            const raceList = [
                { ...data.FirstPractice, type: "FP1" },
                { ...(data.SecondPractice || data.SprintQualifying), type: "FP2/SQ" },
                { ...(data.ThirdPractice || data.Sprint), type: "FP3/Sprint" },
                { ...data.Qualifying, type: "Qualifying" },
                { date: data.date, time: data.time, type: "Race" }
            ];

            setSession(data);
            setRaces(raceList);
        }

        load();
    }, []);

    // 2. countdown
    useEffect(() => {
        if (!races.length) return;

        const interval = setInterval(() => {
            const now = Date.now();

            const next = races.find(r =>
                new Date(`${r.date}T${r.time}`).getTime() > now
            );

            if (!next) return;

            setTimeLeft(
                new Date(`${next.date}T${next.time}`).getTime() - now
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [races]);

    if (!session) return <p>Loading...</p>;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    const nextRace = races.find(r =>
        new Date(`${r.date}T${r.time}`).getTime() > Date.now()
    );

    return (
       <div
            id="timeSec"
            style={{
                width: "100vw",
                height: "25vh",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                overflow: "hidden"
            }}
        >
            {/* Background image */}
            <img
                src={`/raceCities/${session?.Circuit?.Location?.locality}.jpg`}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(80%)"
                }}
            />

            {/* Optional dark overlay (better control than brightness) */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.35)"
                }}
            />

            {/* Content */}
            <div
                id="countDownSec"
                style={{
                    position: "relative",
                    width: "50vw",
                    height: "12.5vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2
                }}
            >
                <h2>
                    R{String(session?.round).padStart(2, "0")} | {session?.raceName}
                </h2>

                <h3>
                    Next session: {nextRace?.type}
                </h3>

                <div
                    id="clockSec"
                    style={{
                        width: "230px",
                        height: "5vh",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <div>{days} <span style={{color: "rgb(209, 209, 209)"}}>days</span></div>
                    <div>{String(hours).padStart(2, "0")} <span  style={{color: "rgb(209, 209, 209)"}}>hr</span></div>
                    <div>{String(minutes).padStart(2, "0")} <span  style={{color: "rgb(209, 209, 209)"}}>mins</span></div>
                    <div>{String(seconds).padStart(2, "0")} <span  style={{color: "rgb(209, 209, 209)"}}>secs</span></div>
                </div>
            </div>
        </div>
    );
}