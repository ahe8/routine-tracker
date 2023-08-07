export default function HabitBox({id, checked, toggle, disabled}) {
    return (
        <span 
            className={disabled ? "disabled" : (checked ? "on" : "off")} 
            onClick={() => disabled ? null : toggle(id)}>
        </span>
    )
}