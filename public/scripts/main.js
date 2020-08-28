// ADD FUNCTIONALITY TO COMMENT BUTTON
let commentBtn = document.querySelector('#comment-btn');
commentBtn.addEventListener('click', postComment);

// COMMENT BUTTON FUNCTION
async function postComment() {
  // TAKE COMMENT AND TURN IT INTO A POST OBJECT
  let comment = document.querySelector('#comment-text').value;
  let commentObj = makePost({comment});

  // SEND COMMENT TO THE DB AND DISSAPPEAR THE COMMENT ELEMENTS
  let response = await fetch('/comments', commentObj)
  const json = await response.json();
  console.log(json);
  dissappearElement('#comment-head', 2);
  dissappearElement('#comment-text', 2);
  dissappearElement('#text-line', 2);
  dissappearElement('#comment-btn', 2);

  // RECIEVE ALL THE COMMENTS FROM THE DATABASE
  let allComments = await fetch('/comments');
  let jsonComments = await allComments.json();
  console.log(jsonComments);
}

// PROMISE FUNCTION FOR USE IN DISSAPPEAR ELEMENT
function dissappear(elementId, seconds) {
  return new Promise((resolve, reject) => {
    document.querySelector(elementId).style.transition = `opacity ${seconds}s`;
    document.querySelector(elementId).style.opacity = '0';
    setTimeout(() => resolve('complete'), seconds * 1000);
  })
}

async function dissappearElement(elementId, seconds) {
    let element = document.querySelector(elementId);
    await dissappear(elementId, seconds);
    element.parentNode.removeChild(element);
}

// FUNCTION FOR CREATING A POST OBJECT
function makePost(data) {
  return commentObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
}

// VIDEO AND SONG PLAYING
let video = document.querySelector('#video');
let audio = document.querySelector('#song');
let commentWall = document.querySelector('.comment-wall');

commentWall.addEventListener('click', function() {
  if (audio.paused) {
    video.play();
    audio.play();
  } else {
    video.pause();
    audio.pause();
  }

})
