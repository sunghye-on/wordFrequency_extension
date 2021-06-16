const makeResult = (input) => {
  chrome.tabs.executeScript(
    {
      code: 'document.querySelector("body").innerText',
    },
    function (data) {
      let bodyText = data[0];
      let bodyNum = bodyText.split(" ").length;
      let myNum = bodyText.match(
        new RegExp("\\b(" + input + ")\\b", "gi")
      ).length;

      let per = (myNum / bodyNum) * 100;
      per = per.toFixed(1);
      document.querySelector("#result").innerText =
        myNum + "/" + bodyNum + "(" + per + "%)";
    }
  );
};

chrome.storage.sync.get((data) => {
  document.querySelector("#user").value = data.userWords;
  makeResult(data.userWords);
});

document.querySelector("#user").addEventListener("change", () => {
  let user = document.querySelector("#user").value;

  chrome.storage.sync.set({
    userWords: user,
  });

  makeResult(user);
});
