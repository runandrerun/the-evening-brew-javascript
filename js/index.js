document.addEventListener("DOMContentLoaded", () => {
  console.log("Hi");

  // used for real time preview
  const STORYFORM = document.getElementById('story-form');

  const PREVIEW = document.getElementById('preview-story');

  const buildPreview = () => {
    const titlePreview = document.getElementById('story-title').value;
    PREVIEW.innerHTML = `
    <hr/>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr>
        <td class="section body-copy">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td class="tag-outer">
                <table align="left" cellpadding="0" cellspacing="0" border="0" style="display: inline-block; border-collapse: collapse;">
                  <tr>
                    <td class="tag-inner" style="color: #ffffff;">STORY TAG</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <h1><a href="<%= @story.url %>" target="_blank" style="color:#000000!important;text-decoration:none;border:none!important;"><font color="#000000"><div id="preview-title">Your Title</div></font></a></h1>
          <div id="preview-content">Your Story</div>
          <p class="p_btn-social">
            <a href="https://www.facebook.com" target="_blank"><img src="https://img.createsend1.com/ei/j/30/B40/C56/csimport/facebook_icon.png" style="display: inline;max-width:20px" width="20" alt=""></a>&nbsp;&nbsp;
            <a href="https://www.twitter.com" target="_blank"><img src="https://img.createsend1.com/ei/j/30/B40/C56/csimport/twitter_icon.png" style="display: inline;max-width:20px" width="20" alt=""></a>&nbsp;&nbsp;
            <a href="https://www.linkedin.com" target="_blank"><img src="https://img.createsend1.com/ei/j/30/B40/C56/csimport/linkedin_icon.png" style="display: inline;max-width:20px" width="20" alt=""></a>&nbsp;&nbsp;
            <a href="mailto:?subject=Check%20out%20this%20story%20from%20Morning%20Brew!&amp;body=www.morningbrew.com%0A%0AWant%20more%20great%20content%3F%20Subscribe%20to%20Morning%20Brew%27s%20daily%20newsletter%20for%20all%20the%20latest%20news%20from%20Wall%20Street%20to%20Silicon%20Valley%20%40%20www.morningbrew.com." target="_blank"><img src="https://img.createsend1.com/ei/j/30/B40/C56/csimport/mail_icon.png" style="display: inline;max-width:20px" width="20" alt=""></a>
          </p>
        </td>
      </tr>
    </table>
    <hr/>
    `
  };

  buildPreview();

  const previewButton = document.getElementById('preview-btn');
  previewButton.onclick = (e) => {
    // create preview
    e.preventDefault();
    const body = document.getElementById('story-content');
    const previewContent = document.getElementById('preview-content');
    // previewContent.innerHTML = body.value;
    previewContent.innerHTML = tinyMCE.get('story-content').getContent();

    const title = document.getElementById('story-title');
    const previewTitle = document.getElementById('preview-title');
    previewTitle.innerHTML = title.value;
  };

  const submitButton = document.getElementById('submit-story');

  submitButton.onclick = (e) => {
    e.preventDefault();
    const storyContent = tinyMCE.get('story-content').getContent();
    const storyTitle = document.getElementById('story-title').value;

    const postData = {
      title: storyTitle,
      body: storyContent,
    }
    fetch('http://localhost:3000/posts', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
    .then(res => res.json())
    .then(story => {
      document.getElementById('story-title').value = '';
      tinyMCE.activeEditor.setContent('');

      document.getElementById('story-index').innerHTML = '';
      buildStories();
    });
  };

  const buildStories = () => {

      const storyIndices = document.getElementById('story-index');
      const storiesUrl = 'http://localhost:3000/posts';

      return fetch(storiesUrl)
        .then(res => res.json())
        .then(stories => {
          if (stories) {
            const storiesList = document.createElement('ul');
            const listName = document.createElement('h4');
            listName.innerText = "Stories" + " (click to preview and update)";
            const hr = document.createElement('hr');
            document.getElementById('story-index').append(hr, listName, storiesList);
            stories.forEach(story => {
              const storyItem = document.createElement('li');
              storyItem.id = "story-" + story['title'];
              storyItem.innerText = story['title'];
              storyItem.onclick = (e) => {
                e.preventDefault();
                const storyData = {
                  id: story['id'],
                  title: story['title'],
                  body: story['body'],
                };
                renderStory(storyData);
              };

              storiesList.append(storyItem);
            })
          } else {
            return 'No Stories!';
          };
        });
  };

  const renderStory = (story) => {

    console.log(story);
    const storyTitle = story['title'];
    let activeEditor = tinyMCE.get('story-content');
    let content = story['body'];
    if(activeEditor!==null){
      document.getElementById('story-title').value = storyTitle;
      activeEditor.setContent(content);

      document.getElementById('preview-title').innerHTML = storyTitle;
      document.getElementById('preview-content').innerHTML = content;
      document.getElementById('preview-title').dataset.id = story['id'];
      document.getElementById('new-story-btn').innerHTML = '';
      const newStoryButton = document.createElement('btn');
      newStoryButton.className = 'btn btn-primary';
      newStoryButton.innerText = 'New Story';
      document.getElementById('new-story-btn').append(newStoryButton);

      newStoryButton.onclick = (e) => {
        e.preventDefault();
        document.getElementById('new-story-btn').innerHTML = '';
        document.getElementById('preview-title').innerHTML = '';
        document.getElementById('preview-content').innerHTML = '';

        let activeEditor = tinyMCE.get('story-content');
        let content = '';
        if(activeEditor !== null){
          document.getElementById('story-title').value = '';
          activeEditor.setContent(content);
          document.getElementById('preview-btn').innerText = 'Preview';
          document.getElementById('preview-btn').onclick = (e) => {
            e.preventDefault();

            const body = document.getElementById('story-content');
            const previewContent = document.getElementById('preview-content');
            // previewContent.innerHTML = body.value;
            previewContent.innerHTML = tinyMCE.get('story-content').getContent()

            const title = document.getElementById('story-title');
            const previewTitle = document.getElementById('preview-title');
            previewTitle.innerHTML = title.value;
            previewTitle.dataset.id = story['id'];
          }
        }
      };

      const previewButton = document.getElementById('preview-btn');
      previewButton.innerText = 'Update';
      previewButton.onclick = (e) => {
        e.preventDefault();
        const storyId = parseInt(document.getElementById('preview-title').dataset.id);
        const storyTitle = document.getElementById('story-title').value;
        const storyBody = tinyMCE.get('story-content').getContent();
        const storyData = {
          id: storyId,
          title: storyTitle,
          body: storyBody,
        };
        updateStory(storyData);

        document.getElementById('story-index').innerHTML = '';
        // buildStories();
      }

    };
  };

  const updateStory = (storyData) => {
    // console.log('Update', storyData);
    const patchData = {
      title: document.getElementById('story-title').value,
      body: tinyMCE.get('story-content').getContent(),
    };
    const url = `http://localhost:3000/posts/${storyData['id']}`
    fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchData),
    })
    .then(res => res.json())
    .then(res => {
      buildStories();
    }, () => builderStories());
  };

  buildStories();

});
