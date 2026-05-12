import React, { useEffect, useState } from "react";

export default function App() {
  const PICK_TIME = 30;

  const order = ["A", "B", "B", "A", "A", "B"];

  const [currentPick, setCurrentPick] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PICK_TIME);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const [heroName, setHeroName] = useState("");

  const currentTeam = order[currentPick] || "Vége";

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          nextPick();
          return PICK_TIME;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, currentPick]);

  const nextPick = () => {
    setCurrentPick((prev) => {
      if (prev >= order.length - 1) {
        setRunning(false);
        return prev;
      }

      return prev + 1;
    });

    setTimeLeft(PICK_TIME);
  };

  const confirmPick = () => {
    if (!heroName.trim()) return;

    setHistory((prev) => [
      ...prev,
      {
        team: currentTeam,
        hero: heroName,
        pick: currentPick + 1,
      },
    ]);

    setHeroName("");
    nextPick();
  };

  const resetDraft = () => {
    setCurrentPick(0);
    setTimeLeft(PICK_TIME);
    setRunning(false);
    setHistory([]);
    setHeroName("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#18181b",
        color: "white",
        padding: 30,
        fontFamily: "Arial",
      }}
    >
      <h1>Dota Házibajnokság Draft Tool</h1>

      <h2>Pick sorrend: ABBAAB</h2>

      <div
        style={{
          background: "#27272a",
          padding: 20,
          borderRadius: 16,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <h3>Aktuális Pick</h3>

        <div style={{ fontSize: 64, fontWeight: "bold" }}>{currentTeam}</div>

        <div style={{ fontSize: 48 }}>{timeLeft}s</div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setRunning(true)}>Start</button>

        <button onClick={() => setRunning(false)}>Pause</button>

        <button onClick={resetDraft}>Reset</button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
          placeholder="Pl.: Pudge"
        />

        <button onClick={confirmPick} style={{ marginLeft: 10 }}>
          Pick megerősítése
        </button>
      </div>

      <h2>Pick History</h2>

      {history.map((entry, idx) => (
        <div
          key={idx}
          style={{
            background: "#27272a",
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          {entry.pick}. pick — Team {entry.team} — {entry.hero}
        </div>
      ))}

      <h2>Következő pick sorrend</h2>

      <div style={{ display: "flex", gap: 10 }}>
        {order.map((team, idx) => (
          <div
            key={idx}
            style={{
              padding: 10,
              borderRadius: 10,
              background: idx === currentPick ? "#22c55e" : "#3f3f46",
            }}
          >
            {team}
          </div>
        ))}
      </div>
    </div>
  );
}
