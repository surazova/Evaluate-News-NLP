function submitURL(event) {
  // if the event does not get explicitly handled, its default action should not be taken as it normally would be.
  event.preventDefault();

  let formText = document.getElementById("url").value;

  if (Client.checkForURL(formText)) {
    console.log("URL Submitted");

    postData("http://localhost:8081/api", { url: formText }).then(function (
      res
    ) {
      document.getElementById(
        "agreement"
      ).innerHTML = `Agreement: ${res.agreement}`;
      document.getElementById(
        "confidence"
      ).innerHTML = `Confidence: ${res.confidence}`;
      document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
      document.getElementById("polarity").innerHTML =
        "Polarity: " + checkForPolarity(res.score_tag);
      document.getElementById(
        "subjectivity"
      ).innerHTML = `Subjectivity: ${res.subjectivity}`;
    });
  } else {
    alert("URL Not Valid.");
  }
}

const checkForPolarity = (score) => {
  let display;
  switch (score) {
    case "P+":
      display = "Strong-Positive";
      break;
    case "P":
      display = "Positive";
      break;
    case "NEW":
      display = "Neutral";
      break;
    case "N":
      display = "Negative";
      break;
    case "N+":
      display = "Strong-Negative";
      break;
    case "NONE":
      display = "No-Sentiment";
  }
};

const postData = async (url = "", data = {}) => {
  console.log("Reaching:", data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log("Data received:", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

export { submitURL };
export { checkForPolarity };
