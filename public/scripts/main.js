// ADD FUNCTIONALITY TO COMMENT BUTTON
let commentBtn = document.querySelector('#comment-btn');
commentBtn.addEventListener('click', postComment);

// COMMENT BUTTON FUNCTION
async function postComment() {
  // TAKE COMMENT AND TURN IT INTO A POST OBJECT
  let comment = document.querySelector('#comment-text').value;
  let data = {comment}
  let commentObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };

  // SEND COMMENT TO THE DB AND DISSAPPEAR THE COMMENT ELEMENTS
  let response = await fetch('/comments', commentObj)
  const json = await response.json();
  console.log(json);
  dissappearElement('#comment-text');
  dissappearElement('#comment-btn');

  // RECIEVE ALL THE COMMENTS FROM THE DATABASE
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
    document.querySelector(elementId).style.transition = `opacity ${seconds}s`;
    document.querySelector(elementId).style.opacity = '0';
    setTimeout(() => resolve('complete'), seconds * 1000);
  })
}
