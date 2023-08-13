export default function HabitBox({id, checked, toggle, disabled}) {
    return (
        <button 
            className={`habitButton ${disabled ? "disabled" : (checked ? "on" : "off")}`} 
            onClick={() => disabled ? null : toggle(id)}>
        </button>
    )
}