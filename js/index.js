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
    previewContent.innerHTML = tinyMCE.get('story-content').getContent()

    const title = document.getElementById('story-title');
    const previewTitle = document.getElementById('preview-title');
    previewTitle.innerHTML = title.value;
  };

});
