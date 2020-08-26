let commentBtn = document.querySelector('#comment-btn');

commentBtn.addEventListener('click', postComment);

async function postComment() {
  let comment = document.querySelector('#comment-text').value;
  let data = {comment}
  let commentObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };

  let response = await fetch('/comments', commentObj)
  const json = await response.json();
  console.log(json);
  dissappearElement('#comment-text');
  dissappearElement('#comment-btn');

  let allComments = await fetch('/comments');
  let jsonComments = await allComments.json();
  console.log(jsonComments);
}

async function dissappearElement(elementId) {
    let element = document.querySelector(elementId);
    await dissappear(elementId, 2);
    element.parentNode.removeChild(element);
}

function dissappear(elementId, seconds) {
  return new Promise((resolve, reject) => {
    document.querySelector(elementId).style.opacity = '0';
    setTimeout(() => resolve('complete'), seconds * 1000);
  })
}
