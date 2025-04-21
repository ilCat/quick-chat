import './styles.css'
import { Button ,message, Upload} from "antd";
import { UploadProps } from 'antd';


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
  
  const Uprops: UploadProps = {
    name: 'file',
    action: 'http://localhost:8000/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      console.log(info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }

  return (
    <div className='button-panel'>	
    {props.buttons.map( item =>   item.isUpload ? 
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
  )
}


