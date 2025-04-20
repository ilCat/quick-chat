import './styles.css'
import { Button } from "antd";


export interface IButtonProps {
    title: string
    icon?: any
    disabled?: boolean
    onClick: () => void
    hidden?: boolean
    className?: string
}
interface IButtonPanelProps{
    buttons : IButtonProps[]
}

export const ButtonPanel = (props: IButtonPanelProps) => {
  return (
    <div className='button-panel'>	
    {props.buttons.map( item => <Button className={item.className} type="primary" onClick={item.onClick} hidden={item.hidden} disabled={item.disabled} >
        {item.icon ? item.icon : null}
        <span>{item.title as string}</span>
    </Button>)}
    </div>
  )
}


