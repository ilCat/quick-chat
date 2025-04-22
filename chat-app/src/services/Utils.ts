export interface INotification {
  type :'success' | 'info' | 'warning' | 'error'
  message: string
}

interface StatusResponce<T> {
  statusCode?:  number
  response: T
}

export interface IHistroryChat {
  owner: "human" | "system" 
  message: string 
}
function SendMessage({user, message, document=false}:{user?:string | null, message:string, document?: boolean	}): Promise<StatusResponce<IHistroryChat>>{
    return fetch(`http://localhost:8000/message`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            user: user as string,
            message: message as string,
            document: document as boolean
        })
      }).then(response => {
        return response.json()
      })
}
export {SendMessage}


export interface Idocs {
  title: string
  url: string
}
function FetchDocs(): Promise<Idocs[]>{
  return fetch(`http://localhost:8000/Ref`).then(response => {
      return response.json()
    })
}
export {FetchDocs}


function FetchMemories(user_id: string): Promise<StatusResponce<IHistroryChat[]>>{
  return fetch(`http://localhost:8000/memories/${user_id}`).then(response => {
      return response.json()
    })
}
export {FetchMemories}