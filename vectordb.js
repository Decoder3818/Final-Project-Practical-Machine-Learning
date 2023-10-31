var ajaxPromisify = (apiKey, url, includeMetaData, includeValues, topK, vector) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "POST",
      data: JSON.stringify({
      "includeMetadata": includeMetaData,
      "includeValues": includeValues,
      "topK": topK,
      "vector" : vector
  }),
      headers: {
        "Content-Type": "application/json",
        Api-Key: apiKey,
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

const url = "https://tax-news-0832749.svc.gcp-starter.pinecone.io";
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

    async post (apiKey,endpoint, query) {
      const { response } = await ajaxPromisify(apiKey, `${url}${endpoint}`, includeMetadata, includeValues, topK, vector)
      return response.matches[0].metadata.text
    }
  }

  customElements.define('custom-widget', MainWebComponent)
})()
