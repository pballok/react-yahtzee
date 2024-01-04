import {ReactElement, useState} from "react";
import LockableDie from "./LockableDie";

function Dice() {
    const [locked, setLocked] = useState([false, false, false, false, false]);
    const [rolling, setRolling] = useState([false, false, false, false, false]);
    const [rollingInProgress, setRollingInProgress] = useState(false);
    const [values, setValues] = useState([0, 0, 0, 0, 0]);

    const toggleLocked = (dieIndex: number) => {
        const newLocked = locked.map((locked, i) => {
            return i === dieIndex ? !locked : locked;
        });
        setLocked(newLocked);
    }

    const rollTheDice = () => {
        const newValues = rolling.map((rolling, i) => {
            return rolling ? Math.floor(Math.random() * 6) + 1 : values[i];
        })
        setValues(newValues);
    }

    const rollIteration = (count: number) => {
        if (count > 0) {
            setRollingInProgress(true);
            rollTheDice();
            const nextIteration = () => { rollIteration(count - 1); }
            setTimeout(nextIteration, 200);
        } else {
            const stopRolling = rolling.findIndex(Boolean);
            const newRolling = rolling.map(((rolling, i) => i === stopRolling ? false : rolling));
            setRollingInProgress(false);
            setRolling(newRolling);
        }
    }

    const startRolling = () => {
        const newRolling = locked.map(locked => {
            return !locked;
        })
        setRolling(newRolling);
    }

    const rollCount = rolling.filter(Boolean).length;
    if (rollCount > 0 && !rollingInProgress) {
        rollIteration(5);
    }

    const dice: ReactElement[] = [];
    for (let i = 0; i < 5; i++) {
        dice.push(
            <div className="column is-narrow">
                <LockableDie value={values[i]} locked={locked[i]} rolling={rolling[i]} onToggleLock={() => {
                    toggleLocked(i);
                }}/>
            </div>
        )
    }

    return (
        <section className="columns is-centered is-vcentered is-multiline">
            {dice}
            <div className="column is-narrow">
                <button
                    className="button is-rounded is-success"
                    onClick={startRolling}>
                    Roll 'em!
                </button>
            </div>
        </section>
    );
}

export default Dice;
