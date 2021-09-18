const commentHandler = async (event) => {
    event.preventDefault();
  
    const post_id = document.querySelector('input[name="post-id"]').value;
  
    const comment = document.querySelector('#post-comment').value.trim();
  
    if (comment) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add comment');
        }
    }
  };
  
  
  
  document
    .querySelector('#addComment')
    .addEventListener('submit', commentHandler);