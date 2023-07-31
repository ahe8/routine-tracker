export default function HabitBox({id, checked, toggle}) {
    return (
        <span 
            className={checked ? "on" : "off"} 
            onClick={() => toggle(id)}>
        </span>
    )
}