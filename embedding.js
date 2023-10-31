var ajaxEmbedding = (apiKey1, url1, query) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url1,
      type: "POST",
      data: JSON.stringify({
    "input": query,
    "model": "text-embedding-ada-002"
  }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      crossDomain: true,
      success: function (response, status, xhr) {
        resolve({ response, status, xhr });
      },
      error: function (xhr, status, error) {
        const err = new Error('xhr error');
        err.status = xhr.status;
        reject(err);
      },
    });
  });
};

const url1 = "https://api.openai.com/v1/";
(function () {
  const template = document.createElement('template')
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `
  class MainWebComponent extends HTMLElement {
    // ------------------
    // Scripting methods
    // ------------------

    async post (apiKey1,endpoint1, query) {
      const { response } = await ajaxEmbedding(apiKey1, `${url1}${endpoint1}`, query)
      return response.data[0].embedding
    }
  }

  customElements.define('custom-widget-embedding', MainWebComponent)
})()
