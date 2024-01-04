
import die0 from '../images/die0.png';
import Die1 from '../images/die1.png';
import Die2 from '../images/die2.png';
import Die3 from '../images/die3.png';
import Die4 from '../images/die4.png';
import Die5 from '../images/die5.png';
import Die6 from '../images/die6.png';
import './LockableDie.css';

const Dice = [die0, Die1, Die2, Die3, Die4, Die5, Die6];

interface LockableDieProps {
    value: number
    locked: boolean
    rolling: boolean
    onToggleLock: () => void
}

function LockableDie({value, locked, rolling, onToggleLock} : LockableDieProps) {
    return (
        <div className="tile-ancestor is-vertical">
            <div className="tile pr-2 pl-2">
                <figure className="image is-96x96">
                    <img src={Dice[value]} className={rolling ? 'roll-animation' : ''} alt={`Die value ${value}`} /><br/>
                </figure>
            </div>
            <div className="tile p-2">
                <button
                    className={"button is-small is-rounded is-fullwidth " + (locked ? "is-danger" : "is-success")}
                    onClick={() => {onToggleLock()}}
                    disabled={(value === 0)}>
                    {locked ? "Unlock" : "Lock"}
                </button>
            </div>
        </div>
    );
}

export default LockableDie
