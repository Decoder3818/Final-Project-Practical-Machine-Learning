var ajaxPromisify = (apiKey, Url, includeMetadata, includeValues, topK, vector) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: Url,
      type: "POST",
      data: JSON.stringify({
      "includeMetadata": includeMetadata,
      "includeValues": includeValues,
      "topK": topK,
      "vector" : vector
  }),
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey
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

const Url = "https://tax-news-0832749.svc.gcp-starter.pinecone.io";
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

    async post (apiKey,endpoint, includeMetadata, includeValues, topK, vector) {
      const { response } = await ajaxPromisify(apiKey, `${Url}${endpoint}`, includeMetadata, includeValues, topK, vector)
      return response.matches[0].metadata.text
    }
  }

  customElements.define('custom-widget-vector', MainWebComponent)
})()
