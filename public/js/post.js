const updateButtonHandler = async (event) => {
    event.preventDefault();
  
    const title = $(event.target).closest('form').find('#post-title').val();
    const content = $(event.target).closest('form').find('#post-content').val();
    console.log(title, content)
    const id = event.target.getAttribute('data-id');
  
    if (title && content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to update post');
        }
    }
  
  };
  
  
  document
    .querySelector('.edit-post-form')
    .addEventListener('submit', updateButtonHandler);
  
  