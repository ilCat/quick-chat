import './styles.css'
import React, { useEffect, useState } from "react";
import { Dropdown, Input, Space} from "antd";
import ChatMessage, { ChatMessageProps } from "../../components/messages/GenericMessage";
import { FilePdfOutlined, SearchOutlined } from '@ant-design/icons';
import { IButtonProps, ButtonPanel } from '../../components/button-panel/ButtonPanel';
import { SendMessage, FetchDocs, Idocs, FetchMemories } from '../../services/Utils';
import { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { FetchCacheList } from '../../services/Utils';

const { TextArea } = Input;
// const user ='Nessuno' 



const ChatWindow = () => {
  const nav = useNavigate()
  const { setItem, removeItem, getItem } = useLocalStorage()
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [input, setInput] = useState("");
  const [items, setItems] = useState<MenuProps['items']>([{label: '', key:'999999999'}])
  const user = localStorage.getItem('user')
  console.log('user',user)
  useEffect(()=>{
    if(user === null ){
      nav('/')
    }
    //Just in case to give another use
    // FetchDocs().then(res => {
    //   const collection = res.map((i, id) => {
    //     return {label: (
    //                     <a onClick={()=>handleReference(i)} href={i.url}  target="_blank" >
    //                       {i.title}
    //                     </a>
    //                   ),
    //             key: id.toString()}}
    //   )
    //   console.log(collection)
    //   setItems(collection)
    // })
    FetchCacheList().then(res => {
      const collection = Object.keys(res).map((i, id) => {
        return {label: (
                        <a onClick={()=>{
                          console.log(i)
                        setInput(i)}}>
                          {i}
                        </a>
                      ),
                key: id.toString()}}
      )
      console.log(collection)
      setItems(collection)
    })

  },[])

  useEffect(() =>{   
    if(user === null || !user){
    FetchMemories(user).then(res=> {
    if (res.response.length >0){
      const hist = res.response.map(data =>{return {"sender": data.owner, 
        "message": data.message }})
        console.log(hist)
      setMessages(hist)
    }
  })}
},[])

  const handleReference =(i:Idocs)=>{  
    const msg = "Have in account for the theme "+i.title+"  the next link <"+ i.url +">" 
    setMessages(prev => [...prev,  { 
      sender: "human", 
      message: msg },
      { sender: "system", message: "🤖 " , loading: true}]
    )
      SendMessage({user: user, message: msg }).then( resp =>{ 
        setMessages(prev => [ ...prev.filter(x => x.loading !== true) , 
          {sender: resp.response.owner ,message: resp.response.message }
        ])}
      )
  }

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev,  { sender: "human", message: input },
      { sender: "system", message: "🤖 " , loading: true}])
    setInput("")

    SendMessage({user: user, message: input }).then( resp => {
      setMessages(prev => [ ...prev.filter(x => x.loading !== true),
        {sender: resp.response.owner ,message: resp.response.message }]
      )
    })
  }

  const buttons: IButtonProps[] = [{
    title: "Send",
    onClick: handleSend,
    className: "send-button"
  },

  {
    title: "Click to Upload",
    onClick:()=>{console.log('import')},
    className: "send-button",
    icon: <FilePdfOutlined />,
    isUpload:true
  }]


  return (<>
    {user !== null ?
    <div className="chat-component"
    >
      <div className="chat-message">
        {messages.map((msg, index) => (
          <ChatMessage key={index} {...msg} />
        ))}
      </div>

      <div className="chat-console">
      <div className="chat-prompt"> 
      <Dropdown menu={{ items,     selectable: true,
      defaultSelectedKeys: ['3']}}
      trigger={['click'] }>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Referencies
            <SearchOutlined />
          </Space>
        </a>
      </Dropdown>
      
        <TextArea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        </div>
        <ButtonPanel buttons={buttons}/>
        
      </div>
    </div>:
  <div>Error </div>}
  </>
  );
};

export default ChatWindow;
