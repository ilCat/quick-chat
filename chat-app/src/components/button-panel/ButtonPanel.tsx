import './styles.css'
import { Button, Upload, notification} from "antd";
import { UploadProps } from 'antd';

interface INotification {
  type :'success' | 'info' | 'warning' | 'error'
  message: string
}
export interface IButtonProps {
    title: string
    icon?: any
    disabled?: boolean
    onClick: () => void
    hidden?: boolean
    className?: string
    isUpload?: boolean 
}
interface IButtonPanelProps{
    buttons : IButtonProps[]
}

export const ButtonPanel = (props: IButtonPanelProps) => {

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (notification: INotification) => {
    api[notification.type]({
      message: notification.message,
    });
  };
  
  const Uprops: UploadProps = {
    name: 'file',
    action: 'http://localhost:8000/upload',
    showUploadList:false,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      console.log('info ->',info)
      if (info.file.status === 'done') {
        
        openNotification({type: 'success', message:`${info.file.name} file uploaded successfully`});
      } else if (info.file.status === 'error') {
        openNotification({type: 'error', message:`${info.file.name} file upload failed.`});
      }
    },
  }

  return (
    <>
    {contextHolder}
    <div className='button-panel'>	
    {props.buttons.map( item =>   
    item.isUpload ? 
                  <Upload {...Uprops}>
                    <Button className={item.className} type="primary" onClick={item.onClick} hidden={item.hidden} disabled={item.disabled} >
                        {item.icon ? item.icon : null}
                        <span>{item.title as string}</span>
                    </Button>
                  </Upload> 
                  :
                  <Button className={item.className} type="primary" onClick={item.onClick} hidden={item.hidden} disabled={item.disabled} >
                      {item.icon ? item.icon : null}
                      <span>{item.title as string}</span>
                  </Button>
  )}
    </div>
    </>
    
  )
}


