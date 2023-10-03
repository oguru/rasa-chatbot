type botApiType = {
    message: string;
    user: string;
}

const getBotRes = async ({message, user}: botApiType) => {
    try {
        const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Charset": "utf-8"
          },
          credentials: "same-origin",
          body: JSON.stringify({
            sender: user,
            message: message
          })
        });

        if (response.ok) {
          return await response.json();
        } 
        
        return Promise.reject(response);
    } catch (error) {
        return error;
    }
};

export default getBotRes;