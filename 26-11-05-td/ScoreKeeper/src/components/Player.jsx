import { useState } from "react"

export function Player({ playerName }) {
    const [points, setPoints] = useState(0)
    return (
        <li>
            {playerName}: {points}
            <button onClick={() => setPoints(points+=1)}>+1</button>
            {points >= 5 ? 'Winner!' : ''}
        </li>
    )
}