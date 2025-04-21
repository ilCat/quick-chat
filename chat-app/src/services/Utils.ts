
function SendMessage({user, message, document=false}:{user:string, message:string, document?: boolean	}): Promise<object>{
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