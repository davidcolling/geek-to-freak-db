const dbgPost = (message) => {
    fetch('/dbg', {
        method: 'post',
        body: JSON.stringify({message: message}),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export default dbgPost;

