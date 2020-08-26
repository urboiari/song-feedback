let commentBtn = document.querySelector('#comment-btn');

commentBtn.addEventListener('click', postComment);

function postComment() {
  let comment = document.querySelector('#comment-text').value;
  console.log(comment);
}
