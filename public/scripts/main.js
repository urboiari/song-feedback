let commentBtn = document.querySelector('#comment-btn');

commentBtn.addEventListener('click', postComment);

function postComment() {
  let comment = document.querySelector('#comment-text').value;
  let data = {comment}
  let commentObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };

  fetch('/comments', commentObj);
}
