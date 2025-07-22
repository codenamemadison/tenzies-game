
export default function Die({id, value, isHeld, holdDie}) {

    return (
        <button 
            className="die" 
            style={{backgroundColor: isHeld ? "#59E391" : null}}
            onClick={holdDie}
        >{value}</button>
    )
}