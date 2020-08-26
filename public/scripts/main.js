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

  dissappearElement('#comment-text');
  dissappearElement('#comment-btn');
}

async function dissappearElement(elementId) {
    let element = document.querySelector(elementId);
    await dissappear(elementId, 3);
    element.parentNode.removeChild(element);
}

function dissappear(elementId, seconds) {
  return new Promise((resolve, reject) => {
    document.querySelector(elementId).style.transform = `opacity ${seconds}s`;
    document.querySelector(elementId).style.opacity = '0';
    setTimeout(() => resolve('complete'), seconds * 1000);
  })
}
